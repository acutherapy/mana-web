import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';

export const runtime = 'nodejs';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'en';
    const title = searchParams.get('title') || 'Some journeys begin\nwith a single unexpected encounter.';
    const ratio = searchParams.get('ratio') || '1.91:1';
    
    const isSquare = ratio === '1:1';

    // Read the clean background image from public directory
    const imagePath = path.join(process.cwd(), 'public', 'images', 'og-bg-clean.png');
    let base64Image = '';
    try {
      const imageBuffer = fs.readFileSync(imagePath);
      // Since og-bg-clean.png contains JPEG data, we use image/jpeg MIME prefix for correct iOS/Satori decoding
      base64Image = `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
    } catch (err) {
      console.error('Error reading OG background image:', err);
    }

    // Split title by newline for premium balanced multi-line typography
    const lines = title.split('\n');

    // Localized content mapping
    const subtitles: Record<string, string> = {
      en: 'PRIVATE WELLNESS EXPERIENCE',
      zh: '专属身心疗愈体验',
      ja: 'プライベートウェルネス体験',
      ko: '프라이빗 웰니스 체험',
      es: 'EXPERIENCIA DE BIENESTAR PRIVADA'
    };

    const badges: Record<string, string> = {
      en: 'HAWAII • CALM • CLARITY • RENEWAL',
      zh: '夏威夷 • 宁静 • 清晰 • 重启',
      ja: 'ハワイ • 静寂 • 明晰 • 再生',
      ko: '하와이 • 평온 • 명료 • 재생',
      es: 'HAWÁI • CALMA • CLARIDAD • RENOVACIÓN'
    };

    const subtitleText = subtitles[lang] || subtitles.en;
    const badgeText = badges[lang] || badges.en;

    // Renders either WeChat 1:1 square layout or standard landscape layout
    return new ImageResponse(
      isSquare ? (
        <div
          style={{
            width: '600px',
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundImage: base64Image ? `url(${base64Image})` : 'linear-gradient(to bottom, #1a1510, #3d2f25)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '45px',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {/* Overlay to give text perfect contrast against sunset background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.20)',
              display: 'flex',
            }}
          />

          {/* Centered panel containing the design components */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              zIndex: 10,
            }}
          >
            {/* Localized Title Quote */}
            <div
              style={{
                fontSize: lang === 'en' ? '22px' : '26px',
                fontFamily: 'Playfair Display, Georgia, serif',
                fontStyle: lang === 'en' ? 'italic' : 'normal',
                color: '#FDFDFD',
                lineHeight: '1.4',
                marginBottom: '22px',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                wordBreak: 'break-all',
                wordWrap: 'break-word',
              }}
            >
              {lines.map((line, idx) => (
                <span key={idx} style={{ display: 'block' }}>{line}</span>
              ))}
            </div>

            {/* Separator line with leaf emblem */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '80%',
                marginBottom: '16px',
              }}
            >
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ margin: '0 12px' }}>
                <path
                  d="M12 2C12 2 15 8 18 10C15 11 13 9 12 12C11 9 9 11 6 10C9 8 12 2 12 2Z"
                  fill="#C5A059"
                />
                <path
                  d="M12 12C12 12 14 16 16 17C14 18 13 17 12 19C11 17 10 18 8 17C10 16 12 12 12 12Z"
                  fill="#C5A059"
                />
              </svg>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
            </div>

            {/* Brand Title */}
            <div
              style={{
                fontSize: '34px',
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#E5D5B8',
                letterSpacing: '5px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                margin: '0 0 4px 0',
                textAlign: 'center',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              MANA RESET
            </div>

            {/* Localized Subtitle */}
            <div
              style={{
                fontSize: '11px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#C5A059',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {subtitleText}
            </div>

            {/* Localized Badge Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(209, 180, 140, 0.95)',
                borderRadius: '30px',
                padding: '8px 18px',
                border: '1px solid rgba(197, 160, 89, 0.8)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <span
                style={{
                  fontSize: '11px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#2A2015',
                  letterSpacing: '1px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {badgeText}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: '1200px',
            height: '630px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundImage: base64Image ? `url(${base64Image})` : 'linear-gradient(to right, #1a1510, #3d2f25)',
            backgroundSize: '1200px 630px',
            backgroundPosition: 'center',
            padding: '60px 80px',
            position: 'relative',
          }}
        >
          {/* Overlay to give text perfect contrast against sunset background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              display: 'flex',
            }}
          />

          {/* Left panel containing the design components */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '540px',
              zIndex: 10,
            }}
          >
            {/* Localized Title Quote */}
            <div
              style={{
                fontSize: lang === 'en' ? '36px' : '40px',
                fontFamily: 'Playfair Display, Georgia, serif',
                fontStyle: lang === 'en' ? 'italic' : 'normal',
                color: '#FDFDFD',
                lineHeight: '1.4',
                marginBottom: '28px',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                width: '100%',
                wordBreak: 'break-all',
                wordWrap: 'break-word',
              }}
            >
              {lines.map((line, idx) => (
                <span key={idx} style={{ display: 'block' }}>{line}</span>
              ))}
            </div>

            {/* Separator line with leaf emblem */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
              }}
            >
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ margin: '0 15px' }}>
                <path
                  d="M12 2C12 2 15 8 18 10C15 11 13 9 12 12C11 9 9 11 6 10C9 8 12 2 12 2Z"
                  fill="#C5A059"
                />
                <path
                  d="M12 12C12 12 14 16 16 17C14 18 13 17 12 19C11 17 10 18 8 17C10 16 12 12 12 12Z"
                  fill="#C5A059"
                />
              </svg>
              <div style={{ height: '1px', flex: 1, backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
            </div>

            {/* Brand Title */}
            <div
              style={{
                fontSize: '44px',
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#E5D5B8',
                letterSpacing: '6px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                margin: '0 0 4px 0',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              MANA RESET
            </div>

            {/* Localized Subtitle */}
            <div
              style={{
                fontSize: '14px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#C5A059',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                marginBottom: '32px',
                fontWeight: 'bold',
                textShadow: '0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {subtitleText}
            </div>

            {/* Localized Badge Pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(209, 180, 140, 0.9)',
                borderRadius: '30px',
                padding: '10px 24px',
                border: '1px solid rgba(197, 160, 89, 0.8)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <span
                style={{
                  fontSize: '13px',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  color: '#2A2015',
                  letterSpacing: '1.5px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                }}
              >
                {badgeText}
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: isSquare ? 600 : 1200,
        height: isSquare ? 600 : 630,
      }
    );
  } catch (error: any) {
    console.error('OG image generation failed:', error);
    return new Response(`Failed to generate image: ${error.message}`, {
      status: 500,
    });
  }
}
