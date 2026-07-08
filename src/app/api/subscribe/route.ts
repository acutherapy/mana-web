import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, element, deficient, lang = "en", talismanImage, dob, tob, q1, q2, q3, q4 } = await req.json();

    if (!email || !element) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const host = req.headers.get("host") || "www.manareset.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const BASE_URL = `${protocol}://${host}`;

    const userElement = (element || "Fire") as "Wood" | "Fire" | "Earth" | "Metal" | "Water";
    const deficientElement = (deficient || "Water") as "Wood" | "Fire" | "Earth" | "Metal" | "Water";

    // 1. Load dictionary file dynamically based on language
    let dict: any = null;
    try {
      const dictPath = path.join(process.cwd(), "src/i18n/dictionaries", `${lang}.json`);
      const dictContent = fs.readFileSync(dictPath, "utf-8");
      dict = JSON.parse(dictContent);
    } catch (dictErr) {
      console.warn("Failed to load dictionary for lang:", lang, dictErr);
    }

    // Fallback dictionary loader
    if (!dict || !dict.email) {
      try {
        const fallbackPath = path.join(process.cwd(), "src/i18n/dictionaries/en.json");
        const dictContent = fs.readFileSync(fallbackPath, "utf-8");
        dict = JSON.parse(dictContent);
      } catch (e) {
        dict = { email: {}, test: { teasers: {}, deficient_teasers: {} } };
      }
    }

    const emailDict = dict.email || {};
    const testDict = dict.test || {};
    const teasers = testDict.teasers || {};
    const deficientTeasers = testDict.deficient_teasers || {};

    const subject = emailDict.subject || "✨ Your Personalized Energy Talisman & Diagnostic - Mana Reset";
    const bookingUrl = `${BASE_URL}/${lang}/booking`;
    
    // Construct dynamic live deep-link URL back to the results page
    const liveReportUrl = dob && tob
      ? `${BASE_URL}/${lang}?dob=${dob}&tob=${tob}&q1=${q1}&q2=${q2}&q3=${q3}&q4=${q4}#test`
      : `${BASE_URL}/${lang}/experience`;
      
    const liveReportButtonText = testDict.download_wallpaper || "View My Live Talisman & Report";

    // Resolve recommendation names & links based on element
    const recommendations = {
      Wood: { anchor: "awakening", en: "The Awakening (120 Minutes)", zh: "觉醒 (The Awakening - 120分钟)" },
      Fire: { anchor: "balance", en: "The Balance (90 Minutes) or The Unwind (60 Minutes)", zh: "平衡 (The Balance) 或 放松 (The Unwind)" },
      Earth: { anchor: "balance", en: "The Balance (90 Minutes)", zh: "平衡 (The Balance - 90分钟)" },
      Metal: { anchor: "unwind", en: "The Unwind (60 Minutes)", zh: "放松 (The Unwind - 60分钟)" },
      Water: { anchor: "awakening", en: "The Awakening (120 Minutes)", zh: "觉醒 (The Awakening - 120分钟)" }
    };
    
    const rec = recommendations[userElement] || recommendations.Fire;
    const recommendationName = lang === "zh" ? rec.zh : rec.en;
    
    // Read descriptions from main dict packages if available
    let recDesc = "";
    if (dict.packages) {
      if (rec.anchor === "awakening" && dict.packages.awakening) recDesc = dict.packages.awakening.short_desc || "";
      if (rec.anchor === "balance" && dict.packages.balance) recDesc = dict.packages.balance.short_desc || "";
      if (rec.anchor === "unwind" && dict.packages.unwind) recDesc = dict.packages.unwind.short_desc || "";
    }

    // Process attachment if provided
    const attachments = [];
    if (talismanImage && talismanImage.includes("base64,")) {
      const base64Data = talismanImage.split("base64,")[1];
      attachments.push({
        filename: `mana-talisman-${userElement.toLowerCase()}.png`,
        content: Buffer.from(base64Data, "base64"),
        contentType: "image/png"
      });
    }

    // Email HTML Template (Fully Dynamic)
    const htmlContent = `
      <div style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #FDFBF7; color: #0A1C2A; max-width: 600px; margin: 0 auto; padding: 40px 24px; border: 1px solid #EAE5D9; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; letter-spacing: 0.15em; font-weight: normal; margin: 0; color: #0A1C2A; text-transform: uppercase;">MANA RESET</h1>
          <p style="font-size: 11px; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase; margin-top: 8px; margin-bottom: 0;">\${emailDict.location_city || "Honolulu, Hawaii"}</p>
        </div>

        <!-- Body -->
        <div style="font-size: 16px; line-height: 1.8; color: #2C3E50;">
          <p>\${emailDict.dear || "Dear"} \${name || emailDict.default_name || "Traveler"},</p>
          
          <p>
            \${emailDict.thank_you || "Thank you for aligning with Mana energy flow."}
          </p>

          <p style="background-color: #F5EFEB; border-left: 3px solid #C5A880; padding: 16px 20px; font-style: italic; margin: 24px 0; border-radius: 0 8px 8px 0;">
            <strong>\${emailDict.diagnostic_title || "Your Diagnostic:"}</strong><br/><br/>
            <strong>\${testDict.dominant_title || "Dominant"}:</strong> \${teasers[userElement] || ""}<br/><br/>
            <strong>\${testDict.deficient_title || "Deficient"}:</strong> \${deficientTeasers[deficientElement] || ""}
          </p>

          <p>
            \${emailDict.attachment_info}
          </p>

          <!-- Live Talisman Deep-Link Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="\${liveReportUrl}" target="_blank" style="background-color: #0A1C2A; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-size: 14px; font-family: sans-serif; font-weight: bold; letter-spacing: 0.05em; border-radius: 4px; display: inline-block;">
              \${liveReportButtonText}
            </a>
          </div>

          <p style="margin-top: 40px; border-top: 1px solid #EAE5D9; padding-top: 24px;">
            <strong>\${emailDict.recommendation_title || "Our Recommendation:"}</strong><br/>
            \${emailDict.recommendation_pre || "We recommend booking"} <strong>\${recommendationName}</strong>. \${recDesc}
          </p>

          <p>
            \${emailDict.scarcity_info}
          </p>

          <!-- Booking Link -->
          <div style="text-align: center; margin: 24px 0 40px 0;">
            <a href="\${bookingUrl}#\${rec.anchor}" style="background-color: transparent; border: 1px solid #0A1C2A; color: #0A1C2A; text-decoration: none; padding: 12px 24px; font-size: 13px; font-family: sans-serif; font-weight: bold; letter-spacing: 0.05em; border-radius: 4px; display: inline-block;">
              \${emailDict.button_booking || "Reserve My Session"}
            </a>
          </div>

          <!-- Signature -->
          <p style="margin-bottom: 0; font-style: italic; color: #7F8C8D; margin-top: 40px;">
            \${emailDict.signature}
          </p>
        </div>
      </div>
    `;

    // Trigger Email via Resend
    const res = await resend.emails.send({
      from: "Mana Reset Partners <partners@manareset.com>",
      to: [email],
      subject: subject,
      html: htmlContent,
      attachments: attachments
    });

    if (res.error) {
      console.error("Resend error:", res.error);
      return NextResponse.json({ error: res.error.message }, { status: 400 });
    }

    const emailId = res.data?.id || "unknown";

    // Notify admin
    try {
      await resend.emails.send({
        from: "Mana Reset Partners <partners@manareset.com>",
        to: [process.env.ADMIN_EMAIL || "leyzax@gmail.com"],
        subject: `📧 New Quiz Subscriber: ${name || "Unknown"} (${element})`,
        html: `
          <p>We captured a new lead through the Five Elements Quiz!</p>
          <ul>
            <li><strong>Name:</strong> ${name || "N/A"}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Imbalance Element:</strong> ${element}</li>
            <li><strong>Deficient Element:</strong> ${deficient}</li>
            <li><strong>Language:</strong> ${lang}</li>
          </ul>
        `
      });
    } catch (e) {
      console.error("Admin notification failed:", e);
    }

    return NextResponse.json({ success: true, message: "Subscription success", id: emailId });
  } catch (err: any) {
    console.error("Subscription endpoint error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
