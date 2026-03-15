'use client'

import { useState, useEffect } from 'react'
import { PRIMARY_PHONE, PRIMARY_TEL } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'Υπηρεσίες', href: '#services' },
  { label: 'Περιοχές', href: '#coverage' },
  { label: 'Σχετικά', href: '#why-us' },
  { label: 'Επικοινωνία', href: '#contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className="sticky top-0 z-50 bg-navy-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          <a href="#" className="flex flex-col leading-tight">
            <span className="text-gold-400 font-black text-lg tracking-wide uppercase">
              ΑΙΓΑΙΟΜΕΤΑΦΟΡΙΚΗ
            </span>
            <span className="text-slate-400 text-[10px] tracking-[3px] uppercase">
              Αφοί Κατσούρη Ε.Π.Ε.
            </span>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-gold-400 text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact-form"
              className="bg-gold-400 text-navy-900 px-5 py-2.5 rounded text-sm font-extrabold hover:bg-yellow-400 transition-colors"
            >
              📞 Ζητήστε Προσφορά
            </a>
          </div>

          <button
            className="lg:hidden text-slate-300 p-2 rounded"
            onClick={() => setOpen(true)}
            aria-label="Άνοιγμα μενού"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 bg-navy-900 transform transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <span className="text-gold-400 font-black tracking-wide uppercase">ΑΙΓΑΙΟΜΕΤΑΦΟΡΙΚΗ</span>
          <button onClick={() => setOpen(false)} className="text-slate-400 p-1" aria-label="Κλείσιμο μενού">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col px-6 py-6 gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-slate-200 text-lg font-semibold py-3 border-b border-white/5 hover:text-gold-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact-form"
            onClick={() => setOpen(false)}
            className="mt-6 bg-gold-400 text-navy-900 py-4 rounded text-center font-extrabold text-base"
          >
            📞 Ζητήστε Προσφορά
          </a>
          <a
            href={`tel:${PRIMARY_TEL}`}
            className="mt-3 border border-white/20 text-slate-300 py-4 rounded text-center font-semibold text-base"
          >
            📞 {PRIMARY_PHONE}
          </a>
        </nav>
      </div>
    </>
  )
}
