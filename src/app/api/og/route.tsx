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
    const width = isSquare ? 600 : 1200;
    const height = isSquare ? 600 : 630;

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
      (
        <div
          style={{
            width: `${width}px`,
            height: `${height}px`,
            display: 'flex',
            position: 'relative',
            backgroundColor: '#1a1510',
            overflow: 'hidden',
          }}
        >
          {/* 1. Background Image using standard HTML tag to prevent Satori backgroundImage size scaling bugs */}
          {base64Image && (
            <img
              src={base64Image}
              alt="Background"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${width}px`,
                height: `${height}px`,
                objectFit: 'cover',
              }}
            />
          )}

          {/* 2. Absolute overlay for perfect text contrast */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.20)',
            }}
          />

          {/* 3. Main content container aligned dynamically */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: isSquare ? 'center' : 'flex-start',
              width: `${width}px`,
              height: `${height}px`,
              padding: isSquare ? '45px' : '60px 80px',
              position: 'absolute',
              top: 0,
              left: 0,
              zIndex: 10,
            }}
          >
            {/* Localized Title Quote */}
            <div
              style={{
                fontSize: isSquare ? (lang === 'en' ? '22px' : '26px') : (lang === 'en' ? '36px' : '40px'),
                fontFamily: 'Playfair Display, Georgia, serif',
                fontStyle: lang === 'en' ? 'italic' : 'normal',
                color: '#FDFDFD',
                lineHeight: '1.4',
                marginBottom: isSquare ? '22px' : '28px',
                textAlign: isSquare ? 'center' : 'left',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: isSquare ? 'center' : 'flex-start',
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
                justifyContent: isSquare ? 'center' : 'flex-start',
                width: isSquare ? '80%' : '100%',
                marginBottom: isSquare ? '16px' : '20px',
              }}
            >
              {isSquare ? (
                <>
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
                </>
              ) : (
                <>
                  <div style={{ height: '1px', width: '80px', backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
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
                  <div style={{ height: '1px', width: '180px', backgroundColor: 'rgba(197, 160, 89, 0.4)' }} />
                </>
              )}
            </div>

            {/* Brand Title */}
            <div
              style={{
                fontSize: isSquare ? '34px' : '44px',
                fontFamily: 'Playfair Display, Georgia, serif',
                color: '#E5D5B8',
                letterSpacing: isSquare ? '5px' : '6px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                margin: '0 0 4px 0',
                textAlign: isSquare ? 'center' : 'left',
                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              }}
            >
              MANA RESET
            </div>

            {/* Localized Subtitle */}
            <div
              style={{
                fontSize: isSquare ? '11px' : '14px',
                fontFamily: 'Inter, system-ui, sans-serif',
                color: '#C5A059',
                letterSpacing: isSquare ? '2px' : '3px',
                textTransform: 'uppercase',
                marginBottom: isSquare ? '24px' : '32px',
                fontWeight: 'bold',
                textAlign: isSquare ? 'center' : 'left',
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
                padding: isSquare ? '8px 18px' : '10px 24px',
                border: '1px solid rgba(197, 160, 89, 0.8)',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            >
              <span
                style={{
                  fontSize: isSquare ? '11px' : '13px',
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
      ),
      {
        width,
        height,
      }
    );
  } catch (error: any) {
    console.error('OG image generation failed:', error);
    return new Response(`Failed to generate image: ${error.message}`, {
      status: 500,
    });
  }
}
