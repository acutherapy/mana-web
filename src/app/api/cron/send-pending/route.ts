import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
  try {
    // 1. Secure the endpoint using Vercel authorization cron header
    const authHeader = req.headers.get("authorization");
    if (
      process.env.NODE_ENV === "production" &&
      authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return NextResponse.json({ error: "Supabase not configured" }, { status: 500 });
    }

    // 2. Fetch pending emails from Supabase queue where send_at <= now
    const cleanSupabaseUrl = process.env.SUPABASE_URL.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
    const nowStr = new Date().toISOString();
    const queryUrl = `${cleanSupabaseUrl}/rest/v1/email_queue?status=eq.pending&send_at=lte.${nowStr}`;
    
    const queueRes = await fetch(queryUrl, {
      method: "GET",
      headers: {
        "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
      }
    });

    if (!queueRes.ok) {
      throw new Error(`Failed to fetch email queue: ${queueRes.statusText}`);
    }

    const pendingEmails = await queueRes.json();
    console.log(`Found ${pendingEmails.length} pending emails to process.`);

    const results = [];

    // 3. Process and send each email
    for (const item of pendingEmails) {
      const { id, email, name, element, deficient, lang, email_type } = item;
      
      try {
        const isZh = lang === "zh";
        
        // Load language dictionary dynamically
        let dict: any = null;
        try {
          const dictPath = path.join(process.cwd(), "src/i18n/dictionaries", `${lang}.json`);
          const dictContent = fs.readFileSync(dictPath, "utf-8");
          dict = JSON.parse(dictContent);
        } catch (e) {
          console.warn("Failed to load dictionary in cron for lang:", lang);
        }

        if (!dict || !dict.email) {
          try {
            const fallbackPath = path.join(process.cwd(), "src/i18n/dictionaries/en.json");
            const dictContent = fs.readFileSync(fallbackPath, "utf-8");
            dict = JSON.parse(dictContent);
          } catch (e) {
            dict = { email: {}, test: { elements: {} } };
          }
        }

        const emailDict = dict.email || {};
        const testDict = dict.test || {};
        const elementsDict = testDict.elements || {};
        
        const elementLabel = elementsDict[element] || element;

        // Resolve recommended package booking variables
        const recommendations = {
          Wood: { anchor: "awakening", en: "The Awakening (120 Minutes)", zh: "觉醒 (The Awakening - 120分钟)" },
          Fire: { anchor: "balance", en: "The Balance (90 Minutes) or The Unwind (60 Minutes)", zh: "平衡 (The Balance) 或 放松 (The Unwind)" },
          Earth: { anchor: "balance", en: "The Balance (90 Minutes)", zh: "平衡 (The Balance - 90分钟)" },
          Metal: { anchor: "unwind", en: "The Unwind (60 Minutes)", zh: "放松 (The Unwind - 60分钟)" },
          Water: { anchor: "awakening", en: "The Awakening (120 Minutes)", zh: "觉醒 (The Awakening - 120分钟)" }
        };
        
        const rec = recommendations[element as keyof typeof recommendations] || recommendations.Fire;
        const recommendationName = lang === "zh" ? rec.zh : rec.en;
        
        let recDesc = "";
        if (dict.packages) {
          if (rec.anchor === "awakening" && dict.packages.awakening) recDesc = dict.packages.awakening.short_desc || "";
          if (rec.anchor === "balance" && dict.packages.balance) recDesc = dict.packages.balance.short_desc || "";
          if (rec.anchor === "unwind" && dict.packages.unwind) recDesc = dict.packages.unwind.short_desc || "";
        }

        const host = req.headers.get("host") || "www.manareset.com";
        const protocol = host.includes("localhost") ? "http" : "https";
        const BASE_URL = `${protocol}://${host}`;
        const bookingUrl = `${BASE_URL}/${lang}/booking`;

        let subject = "";
        let emailHtml = "";

        if (email_type === 2) {
          // --- EMAIL 2: Safety & Trust ---
          const email2Dict = emailDict.email2 || {};
          subject = email2Dict.subject ? email2Dict.subject.replace("{element}", elementLabel).replace("{name}", name || "") : "A safe container in Waikiki 🌊";
          
          const rawBody1 = email2Dict.body_part1 || "";
          const body1 = rawBody1.replace("{element}", elementLabel).replace("{name}", name || "");

          emailHtml = `
            <div style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #FDFBF7; color: #0A1C2A; max-width: 600px; margin: 0 auto; padding: 40px 24px; border: 1px solid #EAE5D9; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 24px; letter-spacing: 0.15em; font-weight: normal; margin: 0; color: #0A1C2A; text-transform: uppercase;">MANA RESET</h1>
                <p style="font-size: 11px; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase; margin-top: 8px; margin-bottom: 0;">${emailDict.location_city || "Honolulu, Hawaii"}</p>
              </div>
              <div style="font-size: 16px; line-height: 1.8; color: #2C3E50;">
                <p>${emailDict.dear || "Dear"} ${name || emailDict.default_name || "Traveler"},</p>
                
                <p>${body1}</p>
                
                <p style="margin: 32px 0;">
                  ${email2Dict.body_part2}
                </p>

                <p style="background-color: #F5EFEB; border-left: 3px solid #C5A880; padding: 20px; font-style: italic; margin: 32px 0; border-radius: 0 8px 8px 0;">
                  ${email2Dict.body_part3}
                </p>

                <!-- Booking Link -->
                <div style="text-align: center; margin: 40px 0 24px 0;">
                  <a href="${bookingUrl}" style="background-color: #0A1C2A; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-size: 14px; font-family: sans-serif; font-weight: bold; letter-spacing: 0.05em; border-radius: 4px; display: inline-block;">
                    ${emailDict.button_booking || "Reserve My Session"}
                  </a>
                </div>

                <p style="margin-bottom: 0; font-style: italic; color: #7F8C8D; margin-top: 40px;">
                  ${emailDict.signature}
                </p>
              </div>
            </div>
          `;
        } else if (email_type === 3) {
          // --- EMAIL 3: Urgency & Recommended booking ---
          const email3Dict = emailDict.email3 || {};
          subject = email3Dict.subject ? email3Dict.subject.replace("{element}", elementLabel).replace("{name}", name || "") : "An invitation for your Waikiki stay 🌟";
          
          const rawBody1 = email3Dict.body_part1 || "";
          const body1 = rawBody1.replace("{element}", elementLabel).replace("{name}", name || "");

          emailHtml = `
            <div style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #FDFBF7; color: #0A1C2A; max-width: 600px; margin: 0 auto; padding: 40px 24px; border: 1px solid #EAE5D9; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h1 style="font-size: 24px; letter-spacing: 0.15em; font-weight: normal; margin: 0; color: #0A1C2A; text-transform: uppercase;">MANA RESET</h1>
                <p style="font-size: 11px; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase; margin-top: 8px; margin-bottom: 0;">${emailDict.location_city || "Honolulu, Hawaii"}</p>
              </div>
              <div style="font-size: 16px; line-height: 1.8; color: #2C3E50;">
                <p>${emailDict.dear || "Dear"} ${name || emailDict.default_name || "Traveler"},</p>
                
                <p>${body1}</p>

                <p style="background-color: #F5EFEB; border-left: 3px solid #C5A880; padding: 16px 20px; font-style: italic; margin: 24px 0; border-radius: 0 8px 8px 0;">
                  <strong>${recommendationName}</strong><br/>
                  ${recDesc}
                </p>
                
                <p style="margin: 32px 0;">
                  ${email3Dict.body_part2 || ""}
                </p>

                <!-- Booking Link -->
                <div style="text-align: center; margin: 40px 0 24px 0;">
                  <a href="${bookingUrl}#${rec.anchor}" style="background-color: #0A1C2A; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-size: 14px; font-family: sans-serif; font-weight: bold; letter-spacing: 0.05em; border-radius: 4px; display: inline-block;">
                    ${email3Dict.button_booking || "Reserve My Reset Spot"}
                  </a>
                </div>

                <p style="margin-bottom: 0; font-style: italic; color: #7F8C8D; margin-top: 40px;">
                  ${emailDict.signature}
                </p>
              </div>
            </div>
          `;
        }

        // Send Email via Resend
        const sendRes = await resend.emails.send({
          from: "Mana Reset Partners <partners@manareset.com>",
          to: [email],
          subject: subject,
          html: emailHtml
        });

        if (sendRes.error) {
          throw new Error(sendRes.error.message);
        }

        // Update status to 'sent' in Supabase
        await fetch(`${cleanSupabaseUrl}/rest/v1/email_queue?id=eq.${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
            "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
          },
          body: JSON.stringify({
            status: "sent",
            sent_at: new Date().toISOString()
          })
        });

        results.push({ id, status: "success" });
      } catch (err: any) {
        console.error(`Failed to process email queue item ${id}:`, err);
        
        // Update status to 'failed' in Supabase
        try {
          await fetch(`${cleanSupabaseUrl}/rest/v1/email_queue?id=eq.${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "apikey": process.env.SUPABASE_SERVICE_ROLE_KEY,
              "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`
            },
            body: JSON.stringify({
              status: "failed",
              error_message: err.message || "Unknown error"
            })
          });
        } catch (dbErr) {
          console.error("Failed to write failure log in DB:", dbErr);
        }
        
        results.push({ id, status: "failed", error: err.message });
      }
    }

    return NextResponse.json({ success: true, processed: results.length, details: results });
  } catch (err: any) {
    console.error("Cron send-pending endpoint error:", err);
    return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
  }
}
