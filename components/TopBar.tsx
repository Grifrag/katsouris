import { PRIMARY_EMAIL, PRIMARY_PHONE, PRIMARY_TEL } from '@/lib/constants'

export default function TopBar() {
  return (
    <div className="hidden sm:flex bg-gold-400 text-navy-900 text-xs font-semibold py-1.5 px-6 justify-end items-center gap-6">
      <span>📍 Αθήνα | Κάλυμνος | Κως | Ρόδος</span>
      <a href={`tel:${PRIMARY_TEL}`} className="hover:underline">
        📞 {PRIMARY_PHONE}
      </a>
      <a href={`mailto:${PRIMARY_EMAIL}`} className="hover:underline">
        ✉ {PRIMARY_EMAIL}
      </a>
    </div>
  )
}
