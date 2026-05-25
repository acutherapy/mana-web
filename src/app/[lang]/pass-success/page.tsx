'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Loader2 } from 'lucide-react';

export default function PassSuccessPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const handlePassGeneration = async () => {
      try {
        const storedData = localStorage.getItem('pendingDnaPass');
        if (!storedData) {
          throw new Error('No pending pass found.');
        }

        const passData = JSON.parse(storedData);
        
        // Use the current path language
        passData.lang = window.location.pathname.split('/')[1] || 'en';
        
        const res = await fetch('/api/wallet', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(passData),
        });
        
        if (!res.ok) throw new Error('Failed to generate pass');
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'mana-dna.pkpass';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Clear local storage after successful download
        localStorage.removeItem('pendingDnaPass');
        setStatus('success');
      } catch (err) {
        console.error('Error generating pass after payment:', err);
        setStatus('error');
      }
    };

    handlePassGeneration();
  }, []);

  return (
    <>
      <main className="min-h-screen bg-sand flex flex-col items-center justify-center p-6 pt-32">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 text-center animate-in zoom-in-95 duration-500">
          {status === 'loading' && (
            <div className="space-y-6">
              <Loader2 className="w-16 h-16 text-ocean mx-auto animate-spin" />
              <h1 className="text-3xl font-serif text-ocean">Generating Talisman</h1>
              <p className="text-gray-500">Verifying your payment and forging your DNA digital talisman. This will download automatically...</p>
            </div>
          )}
          {status === 'success' && (
            <div className="space-y-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h1 className="text-3xl font-serif text-ocean">Payment Successful</h1>
              <p className="text-gray-500">Your DNA Digital Talisman has been successfully downloaded. Please check your browser downloads and tap the file to add it to your Apple Wallet.</p>
              <Link href="/" className="inline-block mt-6 px-8 py-3 bg-ocean text-white rounded font-medium hover:bg-ocean-light transition">
                Return Home
              </Link>
            </div>
          )}
          {status === 'error' && (
            <div className="space-y-6">
              <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">!</div>
              <h1 className="text-3xl font-serif text-ocean">Oops!</h1>
              <p className="text-gray-500">There was an issue generating your pass, or your session has expired. If you were charged, please contact support.</p>
              <Link href="/" className="inline-block mt-6 px-8 py-3 bg-ocean text-white rounded font-medium hover:bg-ocean-light transition">
                Return Home
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
