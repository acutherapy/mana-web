'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function BookingForm({ dict }: { dict: any }) {
  const searchParams = useSearchParams();
  const [selectedPackage, setSelectedPackage] = useState('balance');
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    notes: ''
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

  return (
    <form onSubmit={handleBookingSubmit} className="bg-sand/20 p-8 rounded-2xl border border-sand space-y-6">
      
      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">{dict.booking?.step1}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.name}</label>
            <input 
              type="text" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
              placeholder={dict.booking?.name_placeholder}
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.email}</label>
            <input 
              type="email" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
              placeholder={dict.booking?.email_placeholder}
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.hotel}</label>
          <input 
            type="text" required 
            className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
            placeholder={dict.booking?.hotel_placeholder}
            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.notes}</label>
          <textarea 
            rows={3} 
            className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
            placeholder={dict.booking?.notes_placeholder}
            value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} 
          ></textarea>
        </div>
      </div>

      {/* Package Selection */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">{dict.booking?.step2}</h3>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">{dict.booking?.choose_pkg}</label>
          <div className="relative">
            <select 
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full p-3 pr-10 rounded bg-white border border-gray-200 outline-none focus:border-ocean appearance-none"
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
      <div className="text-xs text-center text-gray-500 pt-4 space-y-1">
        <p>{dict.booking?.ssl}</p>
        <p><strong>{dict.booking?.policy.split(':')[0]}:</strong> {dict.booking?.policy.split(':')[1] || dict.booking?.policy}</p>
      </div>
    </form>
  );
}
