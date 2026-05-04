'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function BookingForm() {
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
    if (pkg === 'unwind' || pkg === 'balance' || pkg === 'awakening') {
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
        alert('Error: ' + data.error);
        setIsLoading(false);
      }
    } catch (err) {
      alert('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleBookingSubmit} className="bg-sand/20 p-8 rounded-2xl border border-sand space-y-6">
      
      {/* Contact Info */}
      <div className="space-y-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">1. Your Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">Your Name</label>
            <input 
              type="text" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
              placeholder="How should we address you?"
              value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ocean mb-1">Email Address</label>
            <input 
              type="email" required 
              className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
              placeholder="Strictly confidential"
              value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">Honolulu Hotel / Location</label>
          <input 
            type="text" required 
            className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
            placeholder="e.g. The Royal Hawaiian, Room 402"
            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">What are you looking to release?</label>
          <textarea 
            rows={3} 
            className="w-full p-3 rounded bg-white border border-gray-200 outline-none focus:border-ocean" 
            placeholder="Tell us briefly what brings you here..."
            value={formData.notes} onChange={e => setFormData({...formData, notes: e.target.value})} 
          ></textarea>
        </div>
      </div>

      {/* Package Selection */}
      <div className="space-y-4 pt-4">
        <h3 className="text-xl font-serif text-ocean border-b border-ocean/10 pb-2">2. Select Experience</h3>
        <div>
          <label className="block text-sm font-medium text-ocean mb-1">Choose your package</label>
          <div className="relative">
            <select 
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full p-3 pr-10 rounded bg-white border border-gray-200 outline-none focus:border-ocean appearance-none"
            >
              <option value="unwind">The Unwind (60 Min) - $320</option>
              <option value="balance">The Balance (90 Min) - $460</option>
              <option value="awakening">The Awakening (120 Min) - $600</option>
              <option value="custom">The VIP Custom Retreat - Starts at $1500</option>
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
             Redirecting...
          </>
        ) : "Secure Booking & Pay"}
      </button>
      <div className="text-xs text-center text-gray-500 pt-4 space-y-1">
        <p>🔒 SSL Secure Encrypted Payment</p>
        <p><strong>Cancellation Policy:</strong> Cancellations made within 48 hours of the appointment will be charged 50% of the service fee. No-shows will be charged the full amount.</p>
      </div>
    </form>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ocean mb-4">Begin Your Reset.</h1>
          <h2 className="text-xl text-ocean/80">Secure, confidential booking for your in-hotel experience.</h2>
          <p className="text-gray-500 mt-4 text-sm">This is your time. Fill out this brief application so we can tailor the session exactly to what your mind and body are craving.</p>
        </div>

        <Suspense fallback={<div className="text-center p-8 text-ocean">Loading secure form...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </main>
  );
}
