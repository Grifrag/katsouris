import { PRIMARY_PHONE, PRIMARY_TEL } from '@/lib/constants'

export default function MobileCallBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-navy-900 border-t border-white/10 px-4 py-3 flex gap-3">
      <a
        href={`tel:${PRIMARY_TEL}`}
        className="flex-1 bg-gold-400 text-navy-900 py-3.5 rounded-lg font-extrabold text-sm text-center"
      >
        📞 {PRIMARY_PHONE}
      </a>
      <a
        href="#contact-form"
        className="flex-1 border border-white/20 text-slate-200 py-3.5 rounded-lg font-semibold text-sm text-center"
      >
        ✉ Προσφορά
      </a>
    </div>
  )
}
