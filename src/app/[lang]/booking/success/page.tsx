'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="max-w-xl w-full bg-white p-10 rounded-2xl border border-sand shadow-sm text-center space-y-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-ocean/5 rounded-full blur-2xl"></div>

      <div className="w-20 h-20 bg-ocean/5 text-ocean rounded-full flex items-center justify-center mx-auto mb-4 relative z-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      </div>
      
      <h1 className="text-3xl font-serif text-ocean relative z-10">Your Reset is Confirmed.</h1>
      
      <p className="text-gray-600 text-sm leading-relaxed relative z-10">
        Thank you for choosing Mana Reset. We have securely received your payment and booking details. 
        A confirmation email with your calendar invite and pre-arrival guide is flying to your inbox right now.
      </p>
      
      {sessionId && (
        <p className="text-xs text-gray-400 mt-4 relative z-10">Reference: {sessionId.substring(0, 15)}...</p>
      )}

      <div className="pt-6 border-t border-gray-100 flex flex-col space-y-3 relative z-10 mt-8">
        <Link href="/" className="w-full bg-ocean text-white py-4 rounded font-medium hover:bg-ocean-light transition block">
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen bg-sand/10 flex flex-col items-center justify-center py-24 px-6">
      <Suspense fallback={<div className="text-ocean animate-pulse">Loading your confirmation...</div>}>
        <SuccessContent />
      </Suspense>
    </main>
  );
}
