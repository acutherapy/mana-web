export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import os from "os";
import { PKPass } from "passkit-generator";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

let cachedCerts: {
  wwdr: Buffer;
  signerCert: Buffer;
  signerKey: Buffer;
  signerKeyPassphrase: "1111";
} | null = null;

async function getCerts() {
  if (cachedCerts) return cachedCerts;
  const certsDir = path.join(process.cwd(), "certs");
  const [wwdr, signerCert, signerKey] = await Promise.all([
    fs.readFile(path.join(certsDir, "wwdr.pem")),
    fs.readFile(path.join(certsDir, "signerCert.pem")),
    fs.readFile(path.join(certsDir, "signerKey.pem")),
  ]);
  cachedCerts = { wwdr, signerCert, signerKey, signerKeyPassphrase: "1111" };
  return cachedCerts;
}

async function generatePass(req: Request | null) {
  const certs = await getCerts();
  const modelDir = path.join(process.cwd(), "model.pass");
  
  // Create a temporary directory to bypass passkit-generator field quirks
  const tempId = Math.random().toString(36).substring(2, 10);
  const tempDir = path.join(os.tmpdir(), `mana-pass-${tempId}.pass`);
  await fs.mkdir(tempDir, { recursive: true });

  try {
    // Copy all files from modelDir to tempDir
    const files = await fs.readdir(modelDir);
    for (const file of files) {
      await fs.copyFile(path.join(modelDir, file), path.join(tempDir, file));
    }

    const passJsonPath = path.join(tempDir, "pass.json");
    const passJson = JSON.parse(await fs.readFile(passJsonPath, 'utf8'));

    if (req) {
      const body = await req.json();
      passJson.serialNumber = Math.random().toString(36).substring(2, 10);

      if (body.element) {
        passJson.storeCard.secondaryFields[0].value = body.element;
      }
      
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      passJson.storeCard.secondaryFields[2].value = `${yyyy}-${mm}-${dd}`;

      if (passJson.barcodes && passJson.barcodes.length > 0) {
        const lang = body.lang || 'en';
        passJson.barcodes[0].message = `https://www.manareset.com/${lang}#test`;
        if (passJson.barcode) {
          passJson.barcode.message = `https://www.manareset.com/${lang}#test`;
        }
      }

      if (body.thumbnail) {
        const thumbnailBuffer = Buffer.from(body.thumbnail, 'base64');
        await fs.writeFile(path.join(tempDir, 'strip.png'), thumbnailBuffer);
        await fs.writeFile(path.join(tempDir, 'strip@2x.png'), thumbnailBuffer);
        await fs.writeFile(path.join(tempDir, 'strip@3x.png'), thumbnailBuffer);
      }
      
      // Async email notification (fire and forget)
      const serial = passJson.serialNumber.toUpperCase();
      try {
        resend.emails.send({
          from: 'Mana Reset Partners <partners@manareset.com>',
          to: [process.env.ADMIN_EMAIL || 'leyzax@gmail.com'],
          subject: `✨ New Talisman Downloaded: #${serial}`,
          html: `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eaeaea; border-radius: 8px; padding: 24px;">
              <h2 style="color: #1A365D; margin-top: 0;">New Digital Talisman Issued</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px;"><strong>Serial Number:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #2563eb; font-weight: bold;">#${serial}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Element:</strong></td><td style="padding: 10px 0; border-bottom: 1px solid #eee;">${body.element || 'General'}</td></tr>
              </table>
              <div style="margin-top: 24px; font-size: 12px; color: #888;">This is an automated notification from the Mana Reset system.</div>
            </div>
          `
        }).catch(err => console.error("Email notification failed:", err));
      } catch(e) {}
    }

    // Overwrite pass.json in the temp directory
    await fs.writeFile(passJsonPath, JSON.stringify(passJson));

    // Generate the pass using the temp directory
    const pass = await PKPass.from({
      model: tempDir,
      certificates: certs,
    });

    const buffer = pass.getAsBuffer();

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/vnd.apple.pkpass",
        "Content-Disposition": "attachment; filename=mana.pkpass",
      },
    });
  } finally {
    // Clean up temp directory
    await fs.rm(tempDir, { recursive: true, force: true }).catch(() => {});
  }
}

export async function GET() {
  try {
    return await generatePass(null);
  } catch (error: any) {
    console.error("Wallet GET ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    return await generatePass(req);
  } catch (error: any) {
    console.error("Wallet POST ERROR:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}