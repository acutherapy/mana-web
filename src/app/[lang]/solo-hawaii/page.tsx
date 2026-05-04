export const metadata = {
  title: 'Things to Do Alone in Hawaii | The Introvert’s Guide to Oahu',
  description: 'Planning a solo female trip to Hawaii? Discover the most serene, safe, and restorative things to do alone, from hidden beaches to private in-room wellness retreats.',
};

export default function SoloHawaiiPage() {
  return (
    <main className="min-h-screen bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-serif text-ocean">The Ultimate Guide for the Solo Female Traveler in Hawaii.</h1>
        <h2 className="text-xl text-ocean/80">Safe, mindful, and restorative things to do alone in Honolulu.</h2>
        
        <div className="prose prose-lg text-gray-600 prose-headings:font-serif prose-headings:text-ocean">
          <p>Hawaii isn't just for honeymooners. It's a sanctuary for the solo woman. Beyond the crowded luaus, here is how you truly connect with the island and yourself.</p>
          
          <h3 className="text-2xl mt-8 mb-4">1. The Morning Ritual: Mindful Beach Walking</h3>
          <p>Instead of rushing to a crowded surf lesson, wake up at 6 AM. The beaches in Waikiki and Kailua are incredibly serene before the tourists wake up. This is your time for walking meditation.</p>
          
          <h3 className="text-2xl mt-8 mb-4">2. The Cultural Deep Dive: Bishop Museum</h3>
          <p>Solo travel allows you to explore at your own pace. The Bishop Museum offers a quiet, profound look into Hawaiian history and the concept of Mana.</p>

          <h3 className="text-2xl mt-8 mb-4">3. The Ultimate Indulgence: The In-Room Reset</h3>
          <p>After a day of exploring, the most luxurious thing to do alone in Hawaii is to order a private healing session to your room. Services like Mana Reset focus on the unique emotional needs of the solo female traveler.</p>
        </div>
      </div>
    </main>
  );
}
