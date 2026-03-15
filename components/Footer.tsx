import { PRIMARY_EMAIL, PRIMARY_PHONE, PRIMARY_TEL } from '@/lib/constants'

const FOOTER_SERVICES = ['Εντός Αττικής', 'Πανελλαδικές Μεταφορές', 'Βαρέα Φορτία', 'Μετακομίσεις', 'Αποθήκευση']
const FOOTER_COMPANY = ['Σχετικά με εμάς', 'Επικοινωνία']

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-14 pb-6 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-gold-400 font-black text-lg tracking-wide uppercase">ΑΙΓΑΙΟΜΕΤΑΦΟΡΙΚΗ</p>
            <p className="text-slate-600 text-[10px] tracking-[3px] uppercase mb-4">Αφοί Κατσούρη Ε.Π.Ε.</p>
            <p className="text-slate-600 text-sm leading-relaxed">Αξιόπιστες B2B εμπορευματικές μεταφορές σε όλη την Ελλάδα από το 1990.</p>
          </div>
          <div>
            <h5 className="text-gold-400 text-xs font-bold tracking-[2px] uppercase mb-4">Υπηρεσίες</h5>
            {FOOTER_SERVICES.map((s) => (
              <a key={s} href="#services" className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">{s}</a>
            ))}
          </div>
          <div>
            <h5 className="text-gold-400 text-xs font-bold tracking-[2px] uppercase mb-4">Εταιρεία</h5>
            {FOOTER_COMPANY.map((s) => (
              <a key={s} href="#" className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">{s}</a>
            ))}
          </div>
          <div>
            <h5 className="text-gold-400 text-xs font-bold tracking-[2px] uppercase mb-4">Επικοινωνία</h5>
            <a href={`tel:${PRIMARY_TEL}`} className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">📞 {PRIMARY_PHONE}</a>
            <a href={`mailto:${PRIMARY_EMAIL}`} className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">✉ {PRIMARY_EMAIL}</a>
          </div>
        </div>
        <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row justify-between gap-2">
          <p className="text-slate-700 text-xs">© {new Date().getFullYear()} Αιγαιομεταφορική Ε.Π.Ε. — Αφοί Κατσούρη</p>
          <p className="text-slate-700 text-xs">Σχεδιασμός & Ανάπτυξη</p>
        </div>
      </div>
    </footer>
  )
}
