import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const BOOKING_BASE_URL = "https://www.manareset.com";

// Element recommendations mapping
const ELEMENT_RECOMMENDATIONS = {
  Wood: {
    en: {
      name: "The Awakening (120 Minutes)",
      desc: "A deep somatic and energy release designed to unblock stagnant flow and restore movement.",
      anchor: "awakening"
    },
    zh: {
      name: "觉醒 (The Awakening - 120分钟)",
      desc: "深层身体与能量释放，旨在解除停滞的流动，恢复生命力。",
      anchor: "awakening"
    }
  },
  Fire: {
    en: {
      name: "The Balance (90 Minutes) or The Unwind (60 Minutes)",
      desc: "Focused on cooling the nervous system, deep calming breathwork, and emotional grounding.",
      anchor: "balance"
    },
    zh: {
      name: "平衡 (The Balance - 90分钟) 或 放松 (The Unwind - 60分钟)",
      desc: "专注于冷却过度活跃的神经系统、深层镇静呼吸和情绪着陆。",
      anchor: "balance"
    }
  },
  Earth: {
    en: {
      name: "The Balance (90 Minutes)",
      desc: "Nurturing energy alignment to help you set boundaries, let go of worry, and find your own soil.",
      anchor: "balance"
    },
    zh: {
      name: "平衡 (The Balance - 90分钟)",
      desc: "滋养能量调频，帮助您建立界限，放下忧虑，找到属于自己的落脚点。",
      anchor: "balance"
    }
  },
  Metal: {
    en: {
      name: "The Unwind (60 Minutes)",
      desc: "A minimalist, structured grounding session to cut away chaotic noise and restore order.",
      anchor: "unwind"
    },
    zh: {
      name: "放松 (The Unwind - 60分钟)",
      desc: "极简、有结构的着陆会话，剪断混乱的噪音，恢复秩序感。",
      anchor: "unwind"
    }
  },
  Water: {
    en: {
      name: "The Awakening (120 Minutes)",
      desc: "A full mind-body immersion offering absolute safety to rebuild depleted energy reserves.",
      anchor: "awakening"
    },
    zh: {
      name: "觉醒 (The Awakening - 120分钟)",
      desc: "全方位的身心沉浸，提供绝对的安全感，以重建消耗殆尽 of 能量储备。",
      anchor: "awakening"
    }
  }
};

const ELEMENT_ADVICE = {
  Wood: {
    en: "Your dominant energy balance indicates blocked Wood energy. You might feel stagnant, like your growth has ground to a halt, or experiencing frustration and physical tension in your shoulders and neck.",
    zh: "您的能量测算显示您目前木元素受阻。您可能会感到停滞不前，仿佛成长的动力受挫，或者感到莫名的沮丧，肩膀和颈部常有紧绷感。"
  },
  Fire: {
    en: "Your dominant energy balance indicates dry Fire energy. You are likely running on high-friction fuel—your mind is opening 20 browser tabs at once, and even in Honolulu, you struggle to shut down and simply breathe.",
    zh: "您的能量测算显示您目前火元素偏旺且有些干涸。您感觉自己像是在高摩擦力的燃料下运行——脑海里同时打开了20个网页浏览器，即使身在檀香山，您也很难静下来呼吸。"
  },
  Earth: {
    en: "Your dominant energy balance indicates overactive Earth energy. You are constantly over-thinking, carrying everyone else's burdens and worries, leaving no solid soil of your own to land on.",
    zh: "您的能量测算显示您目前土元素过盛。您一直在过度思考、担心和承担身边每一个人的重担，却唯独没有留下一片属于自己的土壤让自己安稳着陆。"
  },
  Metal: {
    en: "Your dominant energy balance indicates rigid Metal energy. Carrying too much chaotic structure and external demands has created a sense of heavy restriction. You are seeking minimalism, order, and space to let go.",
    zh: "您的能量测算显示您目前金元素过于紧绷。携带了太多混乱的规则和外界的要求，让您感到沉重的束缚。您正在寻找极简、秩序以及放手释放的空间。"
  },
  Water: {
    en: "Your dominant energy balance indicates stagnant Water energy. Deep fatigue has set in, and your inner baseline reserves need gentle replenishment to overcome subconscious fear or absolute exhaustion.",
    zh: "您的能量测算显示您目前水元素滞涩。深层的倦怠感已经侵入，您的生命原力深处急需温和的灌溉与补充，以消除潜意识中的恐惧或极度的疲惫。"
  }
};

export async function POST(req: Request) {
  try {
    const { name, email, element, lang = "en", talismanImage } = await req.json();

    if (!email || !element) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const host = req.headers.get("host") || "www.manareset.com";
    const protocol = host.includes("localhost") ? "http" : "https";
    const BASE_URL = `${protocol}://${host}`;

    const isZh = lang === "zh";
    const userElement = (element || "Fire") as "Wood" | "Fire" | "Earth" | "Metal" | "Water";
    
    // Choose translations
    const advice = ELEMENT_ADVICE[userElement]?.[isZh ? "zh" : "en"] || ELEMENT_ADVICE.Fire[isZh ? "zh" : "en"];
    const recommendation = ELEMENT_RECOMMENDATIONS[userElement]?.[isZh ? "zh" : "en"] || ELEMENT_RECOMMENDATIONS.Fire[isZh ? "zh" : "en"];
    
    const subject = isZh 
      ? `✨ 您的专属能量护身符与身心诊断报告 - Mana Reset`
      : `✨ Your Personalized Energy Talisman & Diagnostic - Mana Reset`;

    const bookingUrl = `${BASE_URL}/${lang}/booking`;

    // Process attachment if provided
    const attachments = [];
    if (talismanImage && talismanImage.includes("base64,")) {
      const base64Data = talismanImage.split("base64,")[1];
      attachments.push({
        filename: `mana-talisman-${userElement.toLowerCase()}.png`,
        content: Buffer.from(base64Data, 'base64'),
        contentType: 'image/png'
      });
    }

    // Email HTML Template
    const htmlContent = `
      <div style="font-family: 'Georgia', 'Times New Roman', serif; background-color: #FDFBF7; color: #0A1C2A; max-width: 600px; margin: 0 auto; padding: 40px 24px; border: 1px solid #EAE5D9; border-radius: 12px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px;">
          <h1 style="font-size: 24px; letter-spacing: 0.15em; font-weight: normal; margin: 0; color: #0A1C2A; text-transform: uppercase;">MANA RESET</h1>
          <p style="font-size: 11px; letter-spacing: 0.2em; color: #C5A880; text-transform: uppercase; margin-top: 8px; margin-bottom: 0;">Honolulu, Hawaii</p>
        </div>

        <!-- Body -->
        <div style="font-size: 16px; line-height: 1.8; color: #2C3E50;">
          <p>${isZh ? `亲爱的` : `Dear`} ${name || (isZh ? `旅行者` : `Traveler`)},</p>
          
          <p>
            ${isZh 
              ? `感谢您在踏上夏威夷旅程前，花时间与火奴鲁鲁的 Mana 能量场进行了链接。` 
              : `Thank you for taking a moment to align with Honolulu's Mana energy flow before your journey.`}
          </p>

          <p style="background-color: #F5EFEB; border-left: 3px solid #C5A880; padding: 16px 20px; font-style: italic; margin: 24px 0; border-radius: 0 8px 8px 0;">
            <strong>${isZh ? `您的能量状态分析：` : `Your Diagnostic:`}</strong><br/>
            ${advice}
          </p>

          <p>
            ${isZh
              ? `为了帮您凝聚心神，并在接下来的旅程中调和这种失衡，<strong>我们已将您在网页上实时推算生成的专属“五行能量护身符”图片作为附件随信发送给您</strong>。建议您在邮件附件中直接保存此图片，并将其设置为手机的锁屏壁纸。在夏威夷的每一天，每次点亮屏幕，它都会温柔地提醒您——拉回呼吸，回到当下。`
              : `To help anchor your presence and harmonize this imbalance, <strong>we have attached your personalized "Digital Energy Talisman" image file directly to this email</strong>. We recommend saving the attachment to your phone and setting it as your lock screen wallpaper. Every time you wake your phone, let it serve as a gentle reminder to return to your breath and ground yourself.`}
          </p>

          <!-- Explore More Button -->
          <div style="text-align: center; margin: 32px 0;">
            <a href="${BASE_URL}/${lang}" target="_blank" style="background-color: #0A1C2A; color: #FFFFFF; text-decoration: none; padding: 14px 28px; font-size: 14px; font-family: sans-serif; font-weight: bold; letter-spacing: 0.05em; border-radius: 4px; display: inline-block;">
              ${isZh ? `探索 Mana Reset 首页` : `Explore Mana Reset Homepage`}
            </a>
          </div>

          <p style="margin-top: 40px; border-top: 1px solid #EAE5D9; padding-top: 24px;">
            <strong>${isZh ? `给您的夏威夷身心重启建议：` : `Our Recommendation for Your Stay:`}</strong><br/>
            ${isZh
              ? `结合您的能量图谱，我们强烈建议您在檀香山的酒店套房中，体验 <strong>${recommendation.name}</strong> 疗愈项目。${recommendation.desc}`
              : `Based on your elemental constitution, we highly recommend booking <strong>${recommendation.name}</strong> during your stay in Honolulu. ${recommendation.desc}`}
          </p>

          <p>
            ${isZh
              ? `由于疗愈师需要维护自身能量纯净，我们每周在威基基仅限接待 <strong>5 位</strong> 独自旅行的女性。如果您希望在夏威夷给自己安排一次真正的深度重启，请提前预留位置。`
              : `To preserve the purity of our energetic space, our practitioner only accepts <strong>5 private resets</strong> each week for solo female travelers in Waikiki. If you wish to secure a space for true restoration during your stay, we invite you to reserve your spot early.`}
          </p>

          <!-- Booking Link -->
          <div style="text-align: center; margin: 24px 0 40px 0;">
            <a href="${bookingUrl}#${recommendation.anchor}" style="background-color: transparent; border: 1px solid #0A1C2A; color: #0A1C2A; text-decoration: none; padding: 12px 24px; font-size: 13px; font-family: sans-serif; font-weight: bold; letter-spacing: 0.05em; border-radius: 4px; display: inline-block;">
              ${isZh ? `预订我的私密身心重置` : `Reserve My Reset Session`}
            </a>
          </div>

          <!-- Signature -->
          <p style="margin-bottom: 0; font-style: italic; color: #7F8C8D; margin-top: 40px;">
            ${isZh ? `静候与您在威基基相遇，` : `With presence,`}<br/>
            <strong style="color: #0A1C2A; font-style: normal; font-family: sans-serif; font-size: 14px;">The Mana Reset Team</strong>
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

    // Also notify admin
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
