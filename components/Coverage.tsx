import { OFFICES, COVERAGE_ZONES } from '@/lib/constants'

export default function Coverage() {
  return (
    <section id="coverage" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-gold-400 tracking-[3px] uppercase mb-3">Περιοχές εξυπηρέτησης</p>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4 tracking-tight">Φτάνουμε παντού</h2>
        <p className="text-slate-500 text-base mb-12 max-w-lg leading-relaxed">Πανελλαδικό δίκτυο κάλυψης σε όλες τις μεγάλες περιοχές της χώρας.</p>

        {/* Coverage zones grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {COVERAGE_ZONES.map((zone) => (
            <div key={zone.region} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-gold-400 transition-colors">
              <h4 className="flex items-center gap-2 text-navy-900 font-extrabold text-base mb-2">
                <span>{zone.icon}</span>
                {zone.region}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">{zone.description}</p>
            </div>
          ))}
        </div>

        {/* Main office */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-xs font-bold text-slate-400 tracking-[2px] uppercase mb-4">Κεντρικά Γραφεία</p>
          <div className="inline-flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-6 py-4">
            <span className="text-2xl">{OFFICES[0].icon}</span>
            <div>
              <p className="text-navy-900 font-extrabold">{OFFICES[0].city} — {OFFICES[0].contact}</p>
              <a href={`tel:${OFFICES[0].tel}`} className="text-navy-900 font-semibold text-sm hover:text-gold-400 transition-colors">
                📞 {OFFICES[0].phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
