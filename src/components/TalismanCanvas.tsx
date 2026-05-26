'use client';

import { useRef, useEffect } from 'react';

type Bead = {
  element: string;
  type: 'innate' | 'acquired' | 'subconscious';
  char: string;
};

const getBeadBaseColor = (el: string) => {
  switch(el) {
    case 'Wood': return '#00FF00';
    case 'Fire': return '#FF4500';
    case 'Earth': return '#FFD700';
    case 'Metal': return '#FFFFFF';
    case 'Water': return '#1E90FF';
    default: return '#9ca3af';
  }
};

export default function TalismanCanvas({ mode = 'ring' }: { mode?: 'ring' | 'dna' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate a perfectly balanced generic Talisman for the marketing page
  const beads: Bead[] = [
    { element: 'Wood', type: 'innate', char: '木' },
    { element: 'Fire', type: 'innate', char: '火' },
    { element: 'Earth', type: 'innate', char: '土' },
    { element: 'Metal', type: 'innate', char: '金' },
    { element: 'Water', type: 'innate', char: '水' },
    { element: 'Wood', type: 'acquired', char: '木' },
    { element: 'Fire', type: 'acquired', char: '火' },
    { element: 'Earth', type: 'acquired', char: '土' },
    { element: 'Metal', type: 'acquired', char: '金' },
    { element: 'Water', type: 'acquired', char: '水' },
    { element: 'Metal', type: 'subconscious', char: '金' },
    { element: 'Water', type: 'subconscious', char: '水' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angleOffset = 0;
    
    const beads1 = beads.filter(b => b.type === 'innate');
    const beads2 = beads.filter(b => b.type === 'acquired');
    const totalBeads = beads1.length + beads2.length;

    const drawFrame = () => {
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      
      ctx.clearRect(0, 0, width, height);

      const isDna = mode === 'dna';
      const heightStep = isDna ? 22 : 0;
      const radiusBase = isDna ? 70 : 100;
      const stepAngle = (Math.PI * 2) / totalBeads;
      const tiltX = isDna ? 0.2 : 0;
      const tiltY = isDna ? -0.2 : 0;

      const drawSpiral = (strandBeads: Bead[], phaseOffset: number, isAcquired: boolean) => {
        strandBeads.forEach((bead, i) => {
          const t = i * stepAngle + angleOffset + phaseOffset;
          const spiralHeight = isDna ? (i - strandBeads.length / 2) * heightStep : 0;
          
          const x = centerX + Math.cos(t) * radiusBase + (isDna ? (i - strandBeads.length / 2) * tiltX : 0);
          const y = isDna 
            ? centerY + spiralHeight + (i - strandBeads.length / 2) * tiltY
            : centerY + Math.sin(t) * radiusBase;

          const baseColor = getBeadBaseColor(bead.element);
          const size = isDna ? 8 : 10; 

          ctx.beginPath();
          const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
          grad.addColorStop(0, '#FFFFFF');
          grad.addColorStop(1, baseColor);
          ctx.fillStyle = grad;
          ctx.shadowBlur = 15;
          ctx.shadowColor = baseColor;
          ctx.globalAlpha = 0.8;
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          if (isAcquired) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'rgba(255,255,255,0.6)';
            ctx.arc(x, y, size + 3, 0, Math.PI * 2);
            ctx.stroke();
          }
        });
      };

      drawSpiral(beads1, 0, false);
      drawSpiral(beads2, Math.PI, true);

      // --- Draw Center Yin-Yang (Subconscious Core) ---
      const subBeads = beads.filter(b => b.type === 'subconscious');
      if (subBeads.length >= 2 && !isDna) {
        const yyRadius = 28;
        const color1 = getBeadBaseColor(subBeads[0].element);
        const color2 = getBeadBaseColor(subBeads[1].element);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(-angleOffset); 

        ctx.beginPath();
        ctx.arc(0, 0, yyRadius, Math.PI/2, Math.PI*1.5);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, 0, yyRadius, Math.PI*1.5, Math.PI/2);
        ctx.fillStyle = '#0B1120';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, -yyRadius/2, yyRadius/2, 0, Math.PI*2);
        ctx.fillStyle = '#0B1120';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, yyRadius/2, yyRadius/2, 0, Math.PI*2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(0, -yyRadius/2, 11, 0, Math.PI*2);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = color1;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(0, yyRadius/2, 11, 0, Math.PI*2);
        ctx.fillStyle = color2;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = color2;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(0, 0, yyRadius, 0, Math.PI*2);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.3)';
        ctx.stroke();

        ctx.restore();
      }

      angleOffset += 0.005;
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    drawFrame();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}
