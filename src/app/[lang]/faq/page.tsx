export const metadata = {
  title: 'FAQ | Booking Your Hawaii Burnout Recovery Getaway',
  description: 'Have questions about booking an in-room wellness retreat in Honolulu? Read our FAQ regarding safety, hotel policies, and what to expect during your session.',
};

export default function FaqPage() {
  const faqs = [
    {
      q: "Is it safe?",
      a: "Absolutely. We maintain a highly professional, strictly confidential practice. Your safety and emotional security are the foundation of everything we do."
    },
    {
      q: "Do I need to provide anything?",
      a: "Just a comfortable place to sit or lie down in your room. We handle the rest with the utmost discretion and professionalism."
    },
    {
      q: "Will this violate hotel policies?",
      a: "No. Because we do not bring in large massage tables, use messy oils, or burn incense, our sessions are completely compliant with all hotel guest policies. We operate exactly like a private consultation or concierge service."
    }
  ];

  return (
    <main className="min-h-screen bg-sand py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-ocean mb-4">Frequently Asked Questions.</h1>
          <h2 className="text-xl text-ocean/80">Everything you need to know about your private Hawaii reset trip.</h2>
        </div>
        
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-serif text-ocean mb-2">{faq.q}</h3>
              <p className="text-gray-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
