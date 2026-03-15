import ContactForm from './ContactForm'
import { PRIMARY_TEL, PRIMARY_PHONE } from '@/lib/constants'

const HERO_STATS = [
  { value: '30+', label: 'Χρόνια εμπειρίας' },
  { value: '4', label: 'Γραφεία σε Ελλάδα' },
  { value: '100%', label: 'Έγκαιρες παραδόσεις' },
]

export default function Hero() {
  return (
    <section
      id="contact"
      className="bg-gradient-to-br from-navy-900 to-navy-800 py-16 sm:py-24 px-4 sm:px-6 lg:px-20"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/30 text-gold-400 text-xs font-bold tracking-[2px] uppercase px-4 py-2 rounded-full mb-7">
            ⭐ Από το 1990 — Αξιόπιστη Μεταφορά
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-4">
            Μεταφορές<br />
            που <span className="text-gold-400">φτάνουν</span><br />
            παντού
          </h1>
          <p className="text-lg text-slate-400 mb-3 font-medium">
            Εμπορευματικές μεταφορές B2B σε όλη την Ελλάδα
          </p>
          <p className="text-slate-500 text-sm leading-relaxed mb-10 max-w-lg">
            Πανελλαδικές εμπορευματικές μεταφορές B2B — αναλαμβάνουμε τη μεταφορά
            των εμπορευμάτων σας με ταχύτητα, ασφάλεια και αξιοπιστία.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${PRIMARY_TEL}`}
              className="inline-flex items-center justify-center gap-2 bg-gold-400 text-navy-900 px-7 py-4 rounded-lg font-extrabold text-base shadow-[0_4px_20px_rgba(240,180,41,0.35)] hover:bg-yellow-400 transition-colors"
            >
              📞 {PRIMARY_PHONE}
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-slate-300 px-7 py-4 rounded-lg font-semibold text-base hover:border-white/40 transition-colors"
            >
              ↓ Μάθετε Περισσότερα
            </a>
          </div>
          <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/[0.07]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-black text-gold-400 leading-none">{stat.value}</p>
                <p className="text-slate-500 text-xs uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div id="contact-form" className="bg-white rounded-2xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <p className="text-navy-900 font-extrabold text-xl mb-1">Ζητήστε Προσφορά</p>
          <p className="text-slate-400 text-sm mb-6">Δωρεάν αξιολόγηση σε 24 ώρες</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
