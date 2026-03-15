import { WHY_US_ITEMS, STATS } from '@/lib/constants'

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-navy-900 py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-xs font-bold text-gold-400 tracking-[3px] uppercase mb-3">Η διαφορά μας</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">
            Γιατί να μας επιλέξετε
          </h2>
          <p className="text-slate-500 text-base mb-10 leading-relaxed">
            Τριάντα χρόνια στις εμπορευματικές μεταφορές — τεχνογνωσία που δεν αγοράζεται.
          </p>
          <div className="flex flex-col gap-6">
            {WHY_US_ITEMS.map((item) => (
              <div key={item.title} className="flex gap-4 items-start">
                <div className="w-11 h-11 shrink-0 rounded-lg bg-gold-400/10 border border-gold-400/25 flex items-center justify-center text-lg">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 text-center">
              <div className="text-4xl sm:text-5xl font-black text-gold-400 leading-none mb-2">{stat.value}</div>
              <div className="text-slate-500 text-xs sm:text-sm leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
