'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, Download, Clock, Calendar } from 'lucide-react';
// @ts-ignore
import { Lunar } from 'lunar-javascript';

type ElementType = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water' | null;

type Bead = {
  element: string;
  type: 'innate' | 'acquired' | 'subconscious';
  char: string;
};

const FIVE_ELEMENTS_MAP = {
  '甲': 'Wood', '乙': 'Wood',
  '丙': 'Fire', '丁': 'Fire',
  '戊': 'Earth', '己': 'Earth',
  '庚': 'Metal', '辛': 'Metal',
  '壬': 'Water', '癸': 'Water',
  '子': 'Water', '丑': 'Earth',
  '寅': 'Wood', '卯': 'Wood',
  '辰': 'Earth', '巳': 'Fire',
  '午': 'Fire', '未': 'Earth',
  '申': 'Metal', '酉': 'Metal',
  '戌': 'Earth', '亥': 'Water'
} as const;

const getBeadBaseColor = (el: string) => {
  switch(el) {
    case 'Wood': return '#00FF00'; // Vivid Lime Green
    case 'Fire': return '#FF4500'; // Vivid Orange Red
    case 'Earth': return '#FFD700'; // Vivid Gold
    case 'Metal': return '#FFFFFF'; // Pure White
    case 'Water': return '#1E90FF'; // Vivid Dodger Blue
    default: return '#9ca3af';
  }
};

const BaZiCanvas = ({ beads, mode }: { beads: Bead[], mode: 'ring' | 'dna' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
      const spiralTurns = 1;
      const stepAngle = (Math.PI * spiralTurns * 2) / totalBeads;
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
          const count = beads.filter(x => x.element === bead.element).length;
          const size = isDna ? (6 + count) : (8 + count); // Reduced size to fix crowding

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
          
          // No text in outer beads, keeping them as pure glowing energy orbs
        });
      };

      drawSpiral(beads1, 0, false);
      drawSpiral(beads2, Math.PI, true);

      // --- Draw Center Yin-Yang (Subconscious Core) ---
      const subBeads = beads.filter(b => b.type === 'subconscious');
      if (subBeads.length >= 2 && !isDna) {
        const yyRadius = 28;
        const color1 = getBeadBaseColor(subBeads[0].element);
        const char1 = subBeads[0].char;
        const color2 = getBeadBaseColor(subBeads[1].element);
        const char2 = subBeads[1].char;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(-angleOffset); // Rotate with the ring

        // Half 1 (White / Color 1 background)
        ctx.beginPath();
        ctx.arc(0, 0, yyRadius, Math.PI/2, Math.PI*1.5);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Half 2 (Dark background)
        ctx.beginPath();
        ctx.arc(0, 0, yyRadius, Math.PI*1.5, Math.PI/2);
        ctx.fillStyle = '#0B1120';
        ctx.fill();

        // Top medium circle (Dark)
        ctx.beginPath();
        ctx.arc(0, -yyRadius/2, yyRadius/2, 0, Math.PI*2);
        ctx.fillStyle = '#0B1120';
        ctx.fill();

        // Bottom medium circle (White)
        ctx.beginPath();
        ctx.arc(0, yyRadius/2, yyRadius/2, 0, Math.PI*2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Top fish eye
        ctx.beginPath();
        ctx.arc(0, -yyRadius/2, 11, 0, Math.PI*2);
        ctx.fillStyle = color1;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = color1;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Bottom fish eye
        ctx.beginPath();
        ctx.arc(0, yyRadius/2, 11, 0, Math.PI*2);
        ctx.fillStyle = color2;
        ctx.fill();
        ctx.shadowBlur = 8;
        ctx.shadowColor = color2;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Outer premium border
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
  }, [beads, mode]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

export default function FiveElementsTest({ dict }: { dict: any }) {
  // 0: start, 1: bazi input, 2: bazi loading, 3: bazi display, 4: q1, 5: q2, 6: final loading, 7: result
  const [step, setStep] = useState(0); 
  const [scores, setScores] = useState({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
  const [dominantElement, setDominantElement] = useState<ElementType>(null);
  const [baziData, setBaziData] = useState({ date: '1990-01-01', time: '12:00' });
  const [baziResult, setBaziResult] = useState<{
    birth: { year: string, month: string, day: string, time: string }, 
    birthElements: string[], 
    current: { year: string, month: string, day: string, time: string }, 
    currentElements: string[]
  } | null>(null);
  const [beads, setBeads] = useState<Bead[]>([]);
  const [visualMode, setVisualMode] = useState<'ring' | 'dna'>('ring');

  const handleBaziSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
    setTimeout(() => {
      // Calculate Birth Bazi
      const dateParts = baziData.date.split('-');
      
      let timeStr = baziData.time;
      let isGeneric = false;
      if (timeStr === 'unknown' || timeStr === 'morning' || timeStr === 'afternoon' || timeStr === 'evening') {
        isGeneric = true;
        if (timeStr === 'unknown') timeStr = '12:00';
        if (timeStr === 'morning') timeStr = '09:00';
        if (timeStr === 'afternoon') timeStr = '15:00';
        if (timeStr === 'evening') timeStr = '20:00';
      }

      const timeParts = timeStr.split(':');
      const birthDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]), parseInt(timeParts[0]), parseInt(timeParts[1]));
      
      const lunar = Lunar.fromDate(birthDate);
      const bY = lunar.getYearInGanZhi();
      const bM = lunar.getMonthInGanZhi();
      const bD = lunar.getDayInGanZhi();
      
      let bT = '未知';
      if (!isGeneric) {
        bT = lunar.getTimeInGanZhi() || '未知';
      } else {
        if (baziData.time === 'morning') bT = '上午';
        if (baziData.time === 'afternoon') bT = '下午';
        if (baziData.time === 'evening') bT = '晚上';
        if (baziData.time === 'unknown') bT = '未知';
      }
      
      const bYElement = FIVE_ELEMENTS_MAP[bY[0] as keyof typeof FIVE_ELEMENTS_MAP] || 'Wood';
      const bDElement = FIVE_ELEMENTS_MAP[bD[0] as keyof typeof FIVE_ELEMENTS_MAP] || 'Fire';
      
      // Calculate Current Bazi
      const now = new Date();
      const currentLunar = Lunar.fromDate(now);
      const cY = currentLunar.getYearInGanZhi();
      const cM = currentLunar.getMonthInGanZhi();
      const cD = currentLunar.getDayInGanZhi();
      const cT = currentLunar.getTimeInGanZhi() || '未知';
      
      const cYElement = FIVE_ELEMENTS_MAP[cY[0] as keyof typeof FIVE_ELEMENTS_MAP] || 'Earth';
      const cDElement = FIVE_ELEMENTS_MAP[cD[0] as keyof typeof FIVE_ELEMENTS_MAP] || 'Water';
      
      const innateChars = (bY + bM + bD + (bT === '未知' ? '' : bT)).split('');
      const innateBeads: Bead[] = innateChars.map(char => ({
        element: FIVE_ELEMENTS_MAP[char as keyof typeof FIVE_ELEMENTS_MAP] || 'Wood',
        type: 'innate',
        char
      }));
      
      const acquiredChars = (cY + cM + cD + (cT === '未知' ? '' : cT)).split('');
      const acquiredBeads: Bead[] = acquiredChars.map((char: string) => ({
        element: (FIVE_ELEMENTS_MAP[char as keyof typeof FIVE_ELEMENTS_MAP] || 'Water') as any,
        type: 'acquired' as const,
        char
      }));

      setBeads([...innateBeads, ...acquiredBeads]);

      setBaziResult({
        birth: { year: bY, month: bM, day: bD, time: bT },
        birthElements: [bYElement, bDElement],
        current: { year: cY, month: cM, day: cD, time: cT },
        currentElements: [cYElement, cDElement]
      });

      // Preset the scores based on bazi elements to influence the final outcome
      setScores(prev => ({
        ...prev,
        [bYElement]: prev[bYElement as keyof typeof prev] + 1,
        [bDElement]: prev[bDElement as keyof typeof prev] + 1,
        [cYElement]: prev[cYElement as keyof typeof prev] + 0.5,
        [cDElement]: prev[cDElement as keyof typeof prev] + 0.5,
      }));

      setStep(3);
    }, 2500);
  };

  const handleAnswer = (element: string) => {
    setBeads(prev => {
      const newBeads = [...prev, { element: element as any, type: 'subconscious' as const, char: step === 4 ? '念' : '心' }];
      
      if (step === 5) {
        setStep(6);
        setTimeout(() => {
          // Calculate true dominant based on scores (Bazi weights + Question weights)
          const finalScores = { ...scores };
          newBeads.filter(b => b.type === 'subconscious').forEach(b => {
             if (finalScores[b.element as keyof typeof finalScores] !== undefined) {
               finalScores[b.element as keyof typeof finalScores] += 1.5; // Questions have high weight
             }
          });
          
          let max = -1;
          let dominant: ElementType = 'Wood';
          for (const [key, value] of Object.entries(finalScores)) {
            if (value > max) {
              max = value;
              dominant = key as ElementType;
            }
          }
          setDominantElement(dominant);
          setStep(7);
        }, 3000);
      } else {
        setStep(step + 1);
      }
      return newBeads;
    });
  };

  const getElementColor = (el: ElementType) => {
    switch(el) {
      case 'Wood': return 'bg-green-100 text-green-800 border-green-300';
      case 'Fire': return 'bg-red-100 text-red-800 border-red-300';
      case 'Earth': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Metal': return 'bg-slate-100 text-slate-800 border-slate-300';
      case 'Water': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getGoldenQuote = (el: ElementType) => {
    if (!el || !dict?.test?.quotes) return "The energy of the universe is reshuffling for you.";
    return dict.test.quotes[el] || dict.test.quotes.default;
  };

  const formatPillar = (pillar: string) => {
    if (!pillar || pillar === 'N/A' || pillar === '未知') return pillar;
    if (pillar.length !== 2) return pillar;
    const e1 = FIVE_ELEMENTS_MAP[pillar[0] as keyof typeof FIVE_ELEMENTS_MAP];
    const e2 = FIVE_ELEMENTS_MAP[pillar[1] as keyof typeof FIVE_ELEMENTS_MAP];
    if (!e1 || !e2) return pillar;
    const dictElements = dict?.test?.elements;
    if (dictElements) {
      // Return localized elements separated by a space
      return `${dictElements[e1]} ${dictElements[e2]}`;
    }
    return `${e1} ${e2}`;
  };

  const getBeadColor = (el: string) => {
    switch(el) {
      case 'Wood': return 'bg-emerald-600 border-2 border-emerald-800 text-white';
      case 'Fire': return 'bg-rose-600 border-2 border-rose-800 text-white';
      case 'Earth': return 'bg-amber-100 border-2 border-amber-300 text-amber-800';
      case 'Metal': return 'bg-slate-100 border-2 border-slate-300 text-slate-800';
      case 'Water': return 'bg-slate-800 border-2 border-slate-900 text-white';
      default: return 'bg-gray-400 border-gray-500 text-white';
    }
  };

  const questions = [
    {
      q: dict.test.q1,
      options: [
        { text: dict.test.q1_opt1, element: 'Wood' },
        { text: dict.test.q1_opt2, element: 'Fire' },
        { text: dict.test.q1_opt3, element: 'Earth' },
        { text: dict.test.q1_opt4, element: 'Metal' },
        { text: dict.test.q1_opt5, element: 'Water' },
        { text: dict.test.q1_opt6 || "None of the above", element: 'Neutral' },
      ]
    },
    {
      q: dict.test.q2,
      options: [
        { text: dict.test.q2_opt1, element: 'Wood' },
        { text: dict.test.q2_opt2, element: 'Fire' },
        { text: dict.test.q2_opt3, element: 'Earth' },
        { text: dict.test.q2_opt4, element: 'Metal' },
        { text: dict.test.q2_opt5, element: 'Water' },
        { text: dict.test.q2_opt6 || "None of the above", element: 'Neutral' },
      ]
    }
  ];

  return (
    <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-8 shadow-xl mt-12 relative overflow-hidden min-h-[400px]">
      {/* Decorative bg element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-ocean/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-sand/40 rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative z-10">
        
        {/* Step 0: Start */}
        {step === 0 && (
          <div className="text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-sand flex items-center justify-center rounded-full mx-auto text-ocean mb-6">
              <Sparkles size={28} />
            </div>
            <h2 className="text-3xl font-serif text-ocean">{dict.test.title}</h2>
            <p className="text-gray-600 font-sans max-w-md mx-auto">{dict.test.subtitle}</p>
            <button 
              onClick={() => setStep(1)}
              className="mt-8 bg-ocean text-white px-8 py-3 rounded hover:bg-ocean-light transition font-medium inline-flex items-center gap-2 shadow-md"
            >
              {dict.test.start} <ArrowRight size={18} />
            </button>
          </div>
        )}

        {/* Step 1: Bazi Input */}
        {step === 1 && (
          <form onSubmit={handleBaziSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-serif text-ocean mb-2">{dict.test.bazi_title || "Birth Chart Alignment"}</h3>
               <p className="text-sm text-gray-500">{dict.test.bazi_desc || "To accurately calculate your elemental constitution, please provide your birth date and time."}</p>
            </div>
            <div className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-ocean mb-2"><Calendar size={16}/> {dict.test.dob_label || "Date of Birth"}</label>
                <input 
                  type="date" 
                  required 
                  className="w-full p-3 rounded-lg border border-gray-200 outline-none focus:border-ocean bg-white/80 backdrop-blur-sm"
                  value={baziData.date}
                  onChange={e => setBaziData({...baziData, date: e.target.value})}
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-ocean mb-2"><Clock size={16}/> {dict.test.time_label || "Time of Birth"}</label>
                <div className="relative">
                  <select 
                    required 
                    className="w-full p-3 pr-10 rounded-lg border border-gray-200 outline-none focus:border-ocean bg-white/80 backdrop-blur-sm appearance-none"
                    value={baziData.time}
                    onChange={e => setBaziData({...baziData, time: e.target.value})}
                  >
                    <option value="" disabled hidden>{dict.test.time_select || "Select Time"}</option>
                    <option value="unknown">{dict.test.time_unknown || "Unknown / N/A"}</option>
                    <option value="morning">{dict.test.time_morning || "Morning"}</option>
                    <option value="afternoon">{dict.test.time_afternoon || "Afternoon"}</option>
                    <option value="evening">{dict.test.time_evening || "Evening"}</option>
                    <optgroup label={dict.test.time_specific_group || "Specific Hour"}>
                      <option value="00:00">子 23:00-00:59</option>
                      <option value="02:00">丑 01:00-02:59</option>
                      <option value="04:00">寅 03:00-04:59</option>
                      <option value="06:00">卯 05:00-06:59</option>
                      <option value="08:00">辰 07:00-08:59</option>
                      <option value="10:00">巳 09:00-10:59</option>
                      <option value="12:00">午 11:00-12:59</option>
                      <option value="14:00">未 13:00-14:59</option>
                      <option value="16:00">申 15:00-16:59</option>
                      <option value="18:00">酉 17:00-18:59</option>
                      <option value="20:00">戌 19:00-20:59</option>
                      <option value="22:00">亥 21:00-22:59</option>
                    </optgroup>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ocean">▼</div>
                </div>
              </div>
            </div>
            <div className="text-center pt-4">
              <button type="submit" className="bg-ocean text-white px-8 py-3 rounded hover:bg-ocean-light transition font-medium inline-flex items-center gap-2 shadow-md">
                {dict.test.calc_btn || "Calculate My Elements"} <ArrowRight size={18} />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Bazi Loading */}
        {step === 2 && (
          <div className="text-center py-16 space-y-6 animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 text-ocean mx-auto animate-spin" />
            <h3 className="text-xl font-serif text-ocean animate-pulse">{dict.test.calc_bazi_loading || "Aligning your birth data with current Honolulu elements..."}</h3>
          </div>
        )}

        {/* Step 3: Bazi Display */}
        {step === 3 && baziResult && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-6">
               <h3 className="text-2xl font-serif text-ocean mb-2">{dict?.test?.bazi_result_title || "Astrological Alignment"}</h3>
               <p className="text-sm text-gray-500 px-4">{dict?.test?.bazi_result_desc || "We have calculated the Yin-Yang balance of your birth and the current energetic state of Honolulu."}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl border border-gray-100 text-center shadow-sm">
                <p className="text-xs text-ocean/60 uppercase tracking-widest font-bold mb-2">{dict?.test?.birth_chart_title}</p>
                <div className="text-3xl mb-3 text-ocean">☯︎</div>
                <div className="flex justify-center gap-2 text-base text-gray-800 font-serif mb-2">
                  <span>{formatPillar(baziResult.birth.year)}</span>
                  <span className="text-gray-300">·</span>
                  <span>{formatPillar(baziResult.birth.month)}</span>
                  <span className="text-gray-300">·</span>
                  <span>{formatPillar(baziResult.birth.day)}</span>
                  <span className="text-gray-300">·</span>
                  <span>{formatPillar(baziResult.birth.time)}</span>
                </div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{baziResult.birthElements.map((e: string) => dict?.test?.elements?.[e] || e).join(' / ')} {dict?.test?.dominant}</p>
              </div>
              <div className="bg-ocean p-6 rounded-xl border border-ocean-light text-center shadow-lg text-white">
                <p className="text-xs text-sand/80 uppercase tracking-widest font-bold mb-2">{dict?.test?.current_chart_title}</p>
                <div className="text-3xl mb-3 text-sand">☲</div>
                <div className="flex justify-center gap-2 text-base text-white/90 font-serif mb-2">
                  <span>{formatPillar(baziResult.current.year)}</span>
                  <span className="text-white/30">·</span>
                  <span>{formatPillar(baziResult.current.month)}</span>
                  <span className="text-white/30">·</span>
                  <span>{formatPillar(baziResult.current.day)}</span>
                  <span className="text-white/30">·</span>
                  <span>{formatPillar(baziResult.current.time)}</span>
                </div>
                <p className="text-xs text-sand/60 font-medium uppercase tracking-wider">{baziResult.currentElements.map((e: string) => dict?.test?.elements?.[e] || e).join(' / ')} {dict?.test?.dominant}</p>
              </div>
            </div>

            <div className="text-center pt-4">
              <button 
                onClick={() => setStep(4)}
                className="bg-sand text-ocean px-8 py-3 rounded hover:bg-white transition font-medium inline-flex items-center gap-2 shadow-sm border border-ocean/10"
              >
                {dict?.test?.continue_btn} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4 & 5: Questions */}
        {(step === 4 || step === 5) && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between text-sm text-ocean/60 font-medium mb-4">
              <span>{dict?.test?.question_step?.replace('{x}', (step - 3).toString()) || `Question ${step - 3} of 2`}</span>
              <div className="flex gap-1">
                <div className={`w-8 h-1.5 rounded-full ${step >= 4 ? 'bg-ocean' : 'bg-gray-200'}`} />
                <div className={`w-8 h-1.5 rounded-full ${step >= 5 ? 'bg-ocean' : 'bg-gray-200'}`} />
              </div>
            </div>
            
            <h3 className="text-2xl font-serif text-ocean leading-tight">
              {questions[step - 4].q}
            </h3>
            
            <div className="space-y-3">
              {questions[step - 4].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.element)}
                  className="w-full text-left p-4 rounded-xl border border-gray-200 hover:border-ocean hover:bg-ocean/5 transition-all duration-200 font-sans text-gray-700"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 6: Final Loading */}
        {step === 6 && (
          <div className="text-center py-16 space-y-6 animate-in fade-in duration-500">
            <Loader2 className="w-12 h-12 text-ocean mx-auto animate-spin" />
            <h3 className="text-xl font-serif text-ocean animate-pulse">{dict?.test?.analyzing || "Computing final resonance..."}</h3>
            <p className="text-sm text-gray-500">{dict?.test?.analyzing_desc}</p>
          </div>
        )}

        {/* Step 7: Result */}
        {step === 7 && (
          <div className="text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-widest text-ocean/60 font-semibold">{dict.test.result_title}</p>
              <h2 className={`text-4xl font-serif inline-block px-6 py-2 rounded-2xl border-2 ${getElementColor(dominantElement)}`}>
                {dict?.test?.elements?.[dominantElement as keyof typeof dict.test.elements] || dominantElement}
              </h2>
              <div className="max-w-md mx-auto mt-6 px-6 py-4 bg-white/50 backdrop-blur-sm rounded-xl border border-ocean/10 shadow-sm relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-2xl text-ocean/20 font-serif">❝</div>
                <p className="text-ocean/90 font-serif text-lg leading-relaxed italic relative z-10">
                  {getGoldenQuote(dominantElement)}
                </p>
              </div>
            </div>
            
            <div className="bg-[#0B1120] p-6 rounded-2xl border border-gray-800 shadow-2xl relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-700 pointer-events-none" />
              
              {/* Controls */}
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <button 
                  onClick={() => setVisualMode('ring')}
                  className={`px-3 py-1 text-xs rounded-full border transition ${visualMode === 'ring' ? 'bg-white/20 text-white border-white/40' : 'text-white/40 border-white/10 hover:text-white/80'}`}
                >{dict?.test?.ring_mode}</button>
                <button 
                  onClick={() => setVisualMode('dna')}
                  className={`px-3 py-1 text-xs rounded-full border transition ${visualMode === 'dna' ? 'bg-white/20 text-white border-white/40' : 'text-white/40 border-white/10 hover:text-white/80'}`}
                >{dict?.test?.dna_mode}</button>
              </div>

              {/* Dynamic 18-Bead Bracelet Canvas */}
              <div className="py-12 overflow-hidden flex flex-col justify-center items-center relative min-h-[360px] w-full">
                
                <BaZiCanvas beads={beads} mode={visualMode} />

              </div>
              
              </div>
            
            <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 relative z-10 w-full px-4">
              <div className="bg-white rounded-xl p-5 text-center flex flex-col shadow-lg border border-gray-100">
                <h3 className="text-lg font-serif text-ocean mb-1">{dict.test.classic_edition || "Classic Edition"}</h3>
                <div className="text-xs text-gray-500 mb-3">{dict.test.classic_desc || "Free sequential design"}</div>
                <button 
                  onClick={async (e) => {
                    const btn = e.currentTarget;
                    const originalText = btn.innerText;
                    btn.innerText = dict.test.generating || "Generating...";
                    btn.disabled = true;
                    btn.style.opacity = '0.7';
                    try {
                      const canvas = document.querySelector('canvas');
                      let thumbnail = null;
                      if (canvas) {
                        const tempCanvas = document.createElement('canvas');
                        tempCanvas.width = 1146; tempCanvas.height = 300;
                        const tCtx = tempCanvas.getContext('2d');
                        if (tCtx) {
                          tCtx.fillStyle = '#0B1120';
                          tCtx.fillRect(0, 0, 1146, 300);
                          const scale = 300 / canvas.height;
                          const drawWidth = canvas.width * scale;
                          tCtx.drawImage(canvas, (1146 - drawWidth) / 2, 0, drawWidth, 300);
                          thumbnail = tempCanvas.toDataURL('image/jpeg', 0.9).split(',')[1];
                        }
                      }
                      const res = await fetch('/api/wallet', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ element: dominantElement, thumbnail: thumbnail, lang: window.location.pathname.split('/')[1] || 'en' }),
                      });
                      if (!res.ok) throw new Error('Failed');
                      const blob = await res.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.style.display = 'none';
                      a.href = url;
                      a.download = 'mana.pkpass';
                      document.body.appendChild(a);
                      a.click();
                      window.URL.revokeObjectURL(url);
                    } catch (err) {
                      alert("Failed to download wallet pass.");
                    } finally {
                      btn.innerText = originalText;
                      btn.disabled = false;
                      btn.style.opacity = '1';
                    }
                  }}
                  className="mt-auto w-full bg-ocean text-white py-2.5 rounded-lg font-medium hover:bg-ocean-light transition text-sm disabled:opacity-50"
                >
                  {dict.test.get_free_pass || "Get Free Pass"}
                </button>
              </div>

              <div className="bg-white rounded-xl p-5 text-center flex flex-col shadow-xl border-2 border-ocean transform md:-translate-y-1 relative">
                <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-400 to-amber-600 text-white text-[10px] px-2 py-0.5 font-bold rounded-bl-lg">PREMIUM</div>
                <h3 className="text-lg font-serif text-ocean mb-1">{dict.test.dna_edition || "DNA Edition"}</h3>
                <div className="text-xs text-gray-500 mb-1">{dict.test.dna_desc || "Deep energy intertwining"}</div>
                <div className="text-lg font-bold text-ocean mb-3">$29.99</div>
                <button 
                  onClick={async (e) => {
                    const btn = e.currentTarget;
                    btn.innerText = dict.test.redirecting || "Redirecting...";
                    btn.disabled = true;
                    btn.style.opacity = '0.7';
                    try {
                      const res = await fetch('/api/checkout-pass', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ lang: window.location.pathname.split('/')[1] || 'en' }),
                      });
                      const data = await res.json();
                      if (data.url) {
                        window.location.href = data.url;
                      }
                    } catch(e) {}
                  }}
                  className="mt-auto w-full bg-gradient-to-r from-ocean to-blue-900 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition text-sm disabled:opacity-50"
                >
                  {dict.test.purchase_dna || "Purchase DNA Edition"}
                </button>
              </div>
            </div>

            <button onClick={() => {
              setScores({ Wood: 0, Fire: 0, Earth: 0, Metal: 0, Water: 0 });
              setBaziData({ date: '1990-01-01', time: '12:00' });
              setStep(0);
            }} className="text-sm text-ocean hover:underline underline-offset-4">
              {dict?.test?.retake}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
