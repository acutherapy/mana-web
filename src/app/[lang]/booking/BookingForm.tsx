'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

const HOTEL_OPTIONS = [
  { label: 'Waikiki Area ($0 Travel Fee)', options: [
    { value: 'Halekulani Hotel|0', label: 'Halekulani Hotel' },
    { value: 'The Ritz-Carlton Residences, Waikiki Beach|0', label: 'The Ritz-Carlton Residences, Waikiki Beach' },
    { value: 'Ka La\'i Waikiki Beach, LXR Hotels & Resorts|0', label: 'Ka La\'i Waikiki Beach, LXR Hotels & Resorts' },
    { value: 'Halepuna Waikiki by Halekulani|0', label: 'Halepuna Waikiki by Halekulani' },
    { value: 'The Royal Hawaiian, a Luxury Collection Resort|0', label: 'The Royal Hawaiian, a Luxury Collection Resort' },
    { value: 'Outrigger Waikiki Beach Resort|0', label: 'Outrigger Waikiki Beach Resort' },
    { value: 'Moana Surfrider, A Westin Resort & Spa|0', label: 'Moana Surfrider, A Westin Resort & Spa' },
    { value: 'Sheraton Waikiki Beach Resort|0', label: 'Sheraton Waikiki Beach Resort' },
    { value: 'Prince Waikiki|0', label: 'Prince Waikiki' },
    { value: 'OUTRIGGER Reef Waikiki Beach Resort|0', label: 'OUTRIGGER Reef Waikiki Beach Resort' },
    { value: 'Hyatt Regency Waikiki Beach Resort & Spa|0', label: 'Hyatt Regency Waikiki Beach Resort & Spa' },
    { value: '\'Alohilani Resort Waikiki Beach|0', label: '\'Alohilani Resort Waikiki Beach' },
    { value: 'Hilton Hawaiian Village Waikiki Beach Resort|0', label: 'Hilton Hawaiian Village Waikiki Beach Resort' },
    { value: 'Embassy Suites by Hilton Waikiki Beach Walk|0', label: 'Embassy Suites by Hilton Waikiki Beach Walk' },
    { value: 'Waikiki Beach Marriott Resort & Spa|0', label: 'Waikiki Beach Marriott Resort & Spa' },
    { value: 'Other_Waikiki|0', label: 'Other Hotel/Residence in Waikiki' },
  ]},
  { label: 'Kahala Area (+$50 Travel Fee)', options: [
    { value: 'The Kahala Hotel & Resort|50', label: 'The Kahala Hotel & Resort' },
    { value: 'Other_Kahala|50', label: 'Other Hotel/Residence in Kahala' },
  ]},
  { label: 'Ko Olina Area (+$120 Travel Fee)', options: [
    { value: 'Four Seasons Resort Oahu|120', label: 'Four Seasons Resort Oahu at Ko Olina' },
    { value: 'Aulani, a Disney Resort|120', label: 'Aulani, a Disney Resort & Spa' },
    { value: 'Other_KoOlina|120', label: 'Other Hotel/Residence in Ko Olina' },
  ]},
  { label: 'North Shore (+$180 Travel Fee)', options: [
    { value: 'The Ritz-Carlton Oahu|180', label: 'The Ritz-Carlton O\'ahu' },
    { value: 'Other_NorthShore|180', label: 'Other Hotel/Residence in North Shore' },
  ]},
  { label: 'Kailua Area (+$150 Travel Fee)', options: [
    { value: 'Other_Kailua|150', label: 'Private Residence in Kailua / Lanikai' },
  ]},
  { label: 'Other Locations', options: [
    { value: 'Other_Unlisted|0', label: 'Other Unlisted Area (Travel fee invoiced separately)' },
  ]}
];

export default function BookingForm({ dict, lang }: { dict: any; lang: string }) {
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState('balance');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    customLocation: '',
    roomNumber: '',
    notes: '',
    date: '',
    timeSlot: 'morning'
  });

  useEffect(() => {
    const pkg = searchParams.get('package');
    if (pkg === 'unwind' || pkg === 'balance' || pkg === 'awakening' || pkg === 'custom') {
      setSelectedPackage(pkg);
    }
  }, [searchParams]);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          package: selectedPackage,
          lang,
          ...formData
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe secure checkout
      } else {
        alert(dict.booking?.error || 'Error: ' + data.error);
        setIsLoading(false);
      }
    } catch (err) {
      alert(dict.booking?.error || 'An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const getTravelFeeNotice = () => {
    const feeStr = (formData.location || '').split('|')[1];
    const travelFee = parseInt(feeStr || '0', 10);
    if (travelFee > 0) {
      switch (lang) {
        case 'zh':
          return `此服务地点需额外支付 $${travelFee} 的交通费用，该费用将计入您的总价中。`;
        case 'ja':
          return `この場所には $${travelFee} の出張費が適用され、合計金額に加算されます。`;
        case 'ko':
          return `이 위치에는 $${travelFee}의 출장비가 적용되며 총액에 합산됩니다.`;
        case 'es':
          return `Se aplica un cargo de transporte de $${travelFee} a esta ubicación, el cual se sumará a su total.`;
        default:
          return `A $${travelFee} travel fee applies to this location and will be added to your total.`;
      }
    }
    return null;
  };

  const getCustomLocationLabel = () => {
    switch (lang) {
      case 'zh': return '请输入酒店或详细地址名称';
      case 'ja': return 'ホテル名またはご住所を入力してください';
      case 'ko': return '호텔명 또는 주소를 입력해주세요';
      case 'es': return 'Ingrese el nombre del hotel o la dirección';
      default: return 'Enter Hotel or Address Name';
    }
  };

  const getCustomLocationPlaceholder = () => {
    switch (lang) {
      case 'zh': return '例如：威基基某爱彼迎 / 特定的酒店名称';
      case 'ja': return '例：ワイキキのAirbnb / 特定のホテル名';
      case 'ko': return '예: 와이키키 에어비앤비 / 특정 호텔명';
      case 'es': return 'Ej: Airbnb en Waikiki / Nombre de hotel específico';
      default: return 'e.g. Airbnb in Waikiki / Specific Hotel Name';
    }
  };

  const getRoomNumberLabel = () => {
    switch (lang) {
      case 'zh': return '房间号 / 单元号 (选填)';
      case 'ja': return '部屋番号 / ユニット番号 (任意)';
      case 'ko': return '객실 번호 / 호수 (선택)';
      case 'es': return 'Número de habitación o unidad (Opcional)';
      default: return 'Room / Unit Number (Optional)';
    }
  };

  const travelFeeNotice = getTravelFeeNotice();

  return (
    <form onSubmit={handleBookingSubmit} className="bg-sand/20 p-8 rounded-2xl border border-sand space-y-6">
      
      {/* Step 1: Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">{dict.booking?.step1}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.name}</label>
            <input 
              type="text" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean text-black" 
              placeholder={dict.booking?.name_placeholder}
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.email}</label>
            <input 
              type="email" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean text-black" 
              placeholder={dict.booking?.email_placeholder}
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.hotel}</label>
            <div className="relative">
              <select 
                required
                className="w-full p-3 pr-10 rounded bg-white border border-gray-200 outline-none focus:border-ocean appearance-none text-black"
                value={formData.location} 
                onChange={e => setFormData({...formData, location: e.target.value})}
              >
                <option value="" disabled>
                  {lang === 'zh' ? '选择您的服务地点...' : 
                   lang === 'ja' ? 'サービス提供場所を選択してください...' :
                   lang === 'ko' ? '서비스 위치를 선택해주세요...' :
                   lang === 'es' ? 'Seleccione su ubicación...' : 'Select your location...'}
                </option>
                {HOTEL_OPTIONS.map((group, idx) => (
                  <optgroup key={idx} label={group.label} className="text-gray-500 font-semibold">
                    {group.options.map(opt => (
                      <option key={opt.value} value={opt.value} className="text-black">{opt.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ocean">
                ▼
              </div>
            </div>
          </div>

          {formData.location.startsWith('Other_') && (
            <div>
              <label className="block text-sm font-medium text-ocean mb-1">{getCustomLocationLabel()}</label>
              <input 
                type="text" required 
                className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean text-black" 
                placeholder={getCustomLocationPlaceholder()}
                value={formData.customLocation} onChange={e => setFormData({...formData, customLocation: e.target.value})} 
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{getRoomNumberLabel()}</label>
            <input 
              type="text" 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean text-black" 
              placeholder="e.g. Room 402"
              value={formData.roomNumber} onChange={e => setFormData({...formData, roomNumber: e.target.value})} 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.notes}</label>
          <textarea 
            rows={3} 
            className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean text-black" 
            placeholder={dict.booking?.notes_placeholder}
            value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} 
          ></textarea>
        </div>
      </div>

      {/* Step 2: Package Selection */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">{dict.booking?.step2}</h3>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.choose_pkg}</label>
          <div className="relative">
            <select 
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full p-3 pr-10 rounded bg-white border border-gray-200 outline-none focus:border-ocean appearance-none text-black"
            >
              <option value="unwind">{dict.packages?.unwind_title} ({dict.packages?.unwind_time}) - $320</option>
              <option value="balance">{dict.packages?.balance_title} ({dict.packages?.balance_time}) - $460</option>
              <option value="awakening">{dict.packages?.awakening_title} ({dict.packages?.awakening_time}) - $600</option>
              <option value="custom">{dict.packages?.custom_title} - {dict.packages?.custom_price}</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ocean">
              ▼
            </div>
          </div>
        </div>
      </div>

      {/* Step 3: Date & Time Selection */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">{dict.booking?.step3}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.date}</label>
            <input 
              type="date" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean text-black" 
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.time}</label>
            <div className="relative">
              <select 
                value={formData.timeSlot}
                onChange={(e) => setFormData({...formData, timeSlot: e.target.value})}
                className="w-full p-3 pr-10 rounded bg-white border border-gray-200 outline-none focus:border-ocean appearance-none text-black"
              >
                <option value="morning">{dict.booking?.time_morning}</option>
                <option value="afternoon">{dict.booking?.time_afternoon}</option>
                <option value="evening">{dict.booking?.time_evening}</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-ocean">
                ▼
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Travel Fee Notice */}
      {travelFeeNotice && (
        <div className="text-sm text-ocean bg-ocean/5 p-3 rounded border border-ocean/20 mt-4">
          <strong>Note:</strong> {travelFeeNotice}
        </div>
      )}

      {/* Submit Button */}
      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full bg-ocean text-white py-4 rounded font-medium hover:bg-ocean-light transition mt-6 shadow-md flex justify-center items-center gap-2 disabled:opacity-70"
      >
        {isLoading ? (
          <>
             <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
             {dict.booking?.redirecting}
          </>
        ) : dict.booking?.submit}
      </button>
      
      {/* Encrypted Payments & Cancellation Policies */}
      <div className="text-xs text-center text-gray-500 pt-4 space-y-1">
        <p>{dict.booking?.ssl}</p>
        <p><strong>{dict.booking?.policy.split(/[:：]/)[0]}:</strong> {dict.booking?.policy.split(/[:：]/)[1] || dict.booking?.policy}</p>
      </div>
    </form>
  );
}
