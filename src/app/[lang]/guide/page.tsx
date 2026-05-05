import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Your Guide | Mana Reset — Private Wellness for Solo Female Travelers in Hawaii',
  description:
    'The practitioner behind Mana Reset: certified in somatic experiencing, Five Elements theory, emotional regulation, and energy clearing. Anonymous by design. Present by choice.',
};

const credentials = [
  {
    title: 'Somatic Experiencing',
    description:
      'A body-first approach to processing stored stress and trauma. Rather than talking through what happened, somatic work helps the nervous system complete what it started — releasing what the body is still holding.',
  },
  {
    title: 'Five Elements Theory',
    description:
      'A diagnostic framework from Traditional Chinese Medicine that maps emotional and physical patterns to five elemental archetypes. Used to identify what is depleted and orient each session toward real restoration.',
  },
  {
    title: 'Emotional Regulation',
    description:
      'Training in the nervous system dynamics of stress, overwhelm, and shutdown. Not therapy — a practical understanding of how the body moves between states, and how to guide it gently toward settled.',
  },
  {
    title: 'Energy Clearing & Acupressure',
    description:
      'Light intentional touch informed by meridian theory. Specific points, specific intentions, full consent. The physical component of a session that many clients find most surprisingly powerful.',
  },
];

export default function GuidePage() {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 bg-ocean text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-sm font-medium tracking-[0.2em] text-sand/70 uppercase">
            The Practitioner
          </span>
          <h1 className="text-5xl lg:text-6xl font-serif text-sand leading-tight">
            Present With You.<br />Not In Front of You.
          </h1>
          <p className="text-sand/30 text-2xl">✦</p>
          <p className="text-lg lg:text-xl text-white/75 leading-relaxed max-w-2xl mx-auto italic font-serif">
            &ldquo;Present with you, not in front of you.&rdquo;
          </p>
        </div>
      </section>

      {/* Bio */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              The Person
            </span>
            <h2 className="text-4xl font-serif text-ocean">Who She Is</h2>
          </div>
          <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
            <p>
              She has spent years in the room with people who are exhausted in ways sleep does not
              touch. Women in transition. Women who have held it together so long they have forgotten
              what it feels like not to. Women who came to Hawaii for rest and found themselves lying
              awake at midnight wondering why they still feel like themselves from before — not from
              here, not from now.
            </p>
            <p>
              Her training spans somatic experiencing, Five Elements theory, emotional regulation, and
              energy clearing. But her real qualification is presence — the capacity to arrive without
              agenda, to sit with what is actually happening, and to work with the body rather than
              around it.
            </p>
            <p>
              She is not a therapist. She is not a coach. She is a practitioner — which means her job
              is to be with you in the room, not to interpret you from a distance.
            </p>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-24 px-6 bg-sand/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-sm font-medium tracking-[0.2em] text-ocean/50 uppercase">
              Training
            </span>
            <h2 className="text-4xl font-serif text-ocean">Certifications & Approach</h2>
            <p className="text-ocean/70 text-lg max-w-xl mx-auto">
              The skills she brings to every session — and what each one actually means in practice.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {credentials.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 shadow-sm border border-sand/60">
                <h3 className="text-xl font-serif text-ocean mb-3">{c.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* On Anonymity */}
      <section className="py-24 px-6 bg-ocean text-white">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3 mb-12">
            <span className="text-sm font-medium tracking-[0.2em] text-sand/70 uppercase">
              A Note
            </span>
            <h2 className="text-4xl font-serif text-sand">On Anonymity</h2>
          </div>
          <div className="space-y-6 text-white/80 text-lg leading-relaxed">
            <p>
              She does not share her name publicly. This is intentional — and it matters.
            </p>
            <p>
              When a practitioner leads with credentials and a personal brand, the session becomes
              about her. When she arrives without a name, without a face that&apos;s been studied
              online beforehand, the session stays where it belongs: with you.
            </p>
            <p>
              Many clients have said this was the thing they did not expect to appreciate. The absence
              of biography created space. The session was not about meeting someone. It was about
              arriving somewhere.
            </p>
            <p>
              Her anonymity is a form of presence. It keeps the attention where it should be.
            </p>
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/en/booking"
              className="inline-block bg-sand text-ocean px-10 py-4 rounded font-medium hover:bg-white transition shadow-sm"
            >
              Book Your Session
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
