import { OFFICES } from '@/lib/constants'

export default function Coverage() {
  return (
    <section id="coverage" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-gold-400 tracking-[3px] uppercase mb-3">Περιοχές εξυπηρέτησης</p>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4 tracking-tight">Φτάνουμε παντού</h2>
        <p className="text-slate-500 text-base mb-12 max-w-lg leading-relaxed">Δίκτυο παρουσίας σε στρατηγικά σημεία της Ελλάδας.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFICES.map((office) => (
            <div key={office.city} className="bg-white border border-slate-200 rounded-xl p-6 hover:border-gold-400 transition-colors">
              <h4 className="flex items-center gap-2 text-navy-900 font-extrabold text-base mb-3">
                <span>{office.icon}</span>
                {office.city}
              </h4>
              <p className="text-slate-500 text-sm mb-1">{office.contact}</p>
              <a href={`tel:${office.tel}`} className="text-navy-900 font-semibold text-sm hover:text-gold-400 transition-colors">
                📞 {office.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
