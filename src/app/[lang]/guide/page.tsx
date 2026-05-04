export const metadata = {
  title: 'Your Private Healing Guide in Hawaii | Mana Reset',
  description: 'Learn about the philosophy behind Mana Reset. A dedicated practitioner providing safe, private, and transformative experiences for solo female travelers in Hawaii.',
};

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-24 px-6 max-w-4xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif text-ocean">Meet Your Reset Guide.</h1>
          <h2 className="text-xl text-ocean/80 font-medium">Creating a safe space for women to exhale, release, and find inner balance.</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>I understand the unique exhaustion that comes from carrying the world on your shoulders. My practice is built on absolute discretion, profound empathy, and the healing power of presence.</p>
            <p>With years of experience in somatic experiencing, energy clearing (Mana), and emotional regulation, I don't just treat your symptoms—I help you shift your baseline.</p>
          </div>
        </div>
        <div className="flex-1">
          <div className="w-full aspect-[4/5] bg-sand rounded-2xl border border-sand-dark flex items-center justify-center">
            <span className="text-ocean/40 font-serif italic text-sm">[Silhouette of Practitioner]</span>
          </div>
        </div>
      </section>
    </main>
  );
}
