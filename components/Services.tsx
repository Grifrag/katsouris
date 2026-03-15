import { SERVICES } from '@/lib/constants'

export default function Services() {
  return (
    <section id="services" className="bg-white py-20 px-4 sm:px-6 lg:px-20">
      <p className="text-xs font-bold text-gold-400 tracking-[3px] uppercase mb-3">Τι κάνουμε</p>
      <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-3 tracking-tight">
        Υπηρεσίες Μεταφοράς
      </h2>
      <p className="text-slate-500 text-base mb-12 max-w-lg leading-relaxed">
        Καλύπτουμε κάθε ανάγκη εμπορευματικής μεταφοράς, από παλέτες ώς βαρέα φορτία και μετακομίσεις.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="relative border border-slate-200 rounded-xl p-8 pl-10 overflow-hidden hover:border-gold-400 transition-colors"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-gold-400 rounded-l-xl" />
            <span className="text-4xl mb-4 block">{service.icon}</span>
            <h3 className="text-lg font-extrabold text-navy-900 mb-2">{service.title}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
