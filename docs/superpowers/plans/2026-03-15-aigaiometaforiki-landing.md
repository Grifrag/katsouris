# Αιγαιομεταφορική Landing Page Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a B2B freight company marketing landing page that converts visitors into leads via phone call or contact form submission.

**Architecture:** Next.js App Router with static generation. All sections are React Server Components except `Nav` (mobile drawer state) and `ContactForm` (form state + server action). Email sent via Resend API from a server action. Mobile-first responsive design with a sticky bottom call bar on mobile.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Resend API, TypeScript, Jest + React Testing Library

---

## File Map

| File | Responsibility |
|---|---|
| `app/layout.tsx` | Root layout: Inter font, global metadata, body wrapper |
| `app/page.tsx` | Assembles all section components in order |
| `app/actions/contact.ts` | Server action: validates form data, calls sendEmail |
| `app/globals.css` | Tailwind directives only |
| `components/TopBar.tsx` | Gold top bar with locations/phone/email |
| `components/Nav.tsx` | Sticky navbar + mobile hamburger drawer (client) |
| `components/Hero.tsx` | 2-col hero: headline/stats left, form right |
| `components/ContactForm.tsx` | Controlled form with success/error state (client) |
| `components/Services.tsx` | 3×2 grid of service cards |
| `components/WhyUs.tsx` | Dark section: advantages list + stats grid |
| `components/Coverage.tsx` | 4-col office cards |
| `components/Footer.tsx` | 4-col footer + copyright |
| `components/MobileCallBar.tsx` | Sticky bottom call CTA (mobile only) |
| `lib/sendEmail.ts` | Resend API wrapper — sends contact form email |
| `lib/constants.ts` | Shared data: services, offices, why-us items |

---

## Chunk 1: Project Setup & Foundation

### Task 1: Scaffold Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `.env.local`, `.gitignore`

- [ ] **Step 1: Create Next.js app**

```bash
cd /Users/grigoris/code/katsouris
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes
```

- [ ] **Step 2: Install Resend**

```bash
npm install resend
```

- [ ] **Step 3: Set up `.env.local`**

```bash
cat > .env.local << 'EOF'
RESEND_API_KEY=re_placeholder_replace_me
CONTACT_EMAIL=info@aigaiometaforiki.gr
EOF
```

- [ ] **Step 4: Verify dev server starts**

```bash
npm run dev
```
Expected: `✓ Ready in Xms` — open http://localhost:3000, see default Next.js page.
Note: `RESEND_API_KEY` is a placeholder — form submissions will return an error until a real key is added. This is expected and handled gracefully by the error state.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js + Tailwind + Resend"
```

---

### Task 2: Configure fonts, colors, and global layout

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Update `tailwind.config.ts` with brand colors**

```ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#060e1a',
          900: '#0a1628',
          800: '#0d2040',
        },
        gold: {
          400: '#f0b429',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
```

- [ ] **Step 2: Update `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 3: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'greek'],
  weight: ['400', '600', '800', '900'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Αιγαιομεταφορική Ε.Π.Ε. — Αφοί Κατσούρη | Εμπορευματικές Μεταφορές',
  description: 'B2B εμπορευματικές μεταφορές σε όλη την Ελλάδα. Αττική, πανελλαδικά, νησιά Αιγαίου. Επικοινωνήστε για προσφορά.',
  openGraph: {
    title: 'Αιγαιομεταφορική — Αφοί Κατσούρη',
    description: 'Εμπορευματικές μεταφορές B2B σε Αττική, Ελλάδα και νησιά Αιγαίου.',
    locale: 'el_GR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify build passes**

```bash
npm run build
```
Expected: `✓ Compiled successfully`

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tailwind.config.ts
git commit -m "feat: configure Inter font, brand colors, metadata"
```

---

### Task 3: Create shared constants

**Files:**
- Create: `lib/constants.ts`

- [ ] **Step 1: Write `lib/constants.ts`**

```ts
export const SERVICES = [
  {
    icon: '🏙️',
    title: 'Εντός Αττικής',
    description: 'Καθημερινά δρομολόγια εντός του λεκανοπεδίου για επιχειρήσεις με συχνές ανάγκες διανομής.',
  },
  {
    icon: '🗺️',
    title: 'Πανελλαδικές Μεταφορές',
    description: 'Δίκτυο κάλυψης σε ολόκληρη την Ελλάδα. Εγγυημένες προθεσμίες παράδοσης.',
  },
  {
    icon: '⚓',
    title: 'Νησιά Αιγαίου',
    description: 'Εξειδικευμένη εμπειρία σε μεταφορές προς Κάλυμνο, Κω, Ρόδο και γειτονικά νησιά.',
  },
  {
    icon: '🏗️',
    title: 'Βαρέα & Μεγάλα Φορτία',
    description: 'Εξοπλισμός, μηχανήματα, παλέτες. Εξειδικευμένα οχήματα για φορτία μεγάλων διαστάσεων.',
  },
  {
    icon: '🏠',
    title: 'Μετακομίσεις',
    description: 'Επαγγελματικές μετακομίσεις γραφείων και επιχειρήσεων με ασφάλεια και οργάνωση.',
  },
  {
    icon: '📦',
    title: 'Αποθήκευση',
    description: 'Βραχυπρόθεσμη και μακροπρόθεσμη αποθήκευση εμπορευμάτων σε οργανωμένες αποθήκες.',
  },
]

export const WHY_US_ITEMS = [
  {
    icon: '⏱',
    title: 'Έγκαιρη Παράδοση',
    description: 'Δεσμευόμαστε για τις προθεσμίες. Η καθυστέρηση δεν είναι επιλογή.',
  },
  {
    icon: '🏋️',
    title: 'Μεγάλα & Βαρέα Φορτία',
    description: 'Εξειδικευόμαστε σε B2B μεταφορές μεγάλου όγκου — όχι δεματάκια, αληθινά φορτία.',
  },
  {
    icon: '🛡️',
    title: 'Ασφάλεια Φορτίου',
    description: 'Πλήρης ασφαλιστική κάλυψη για κάθε αποστολή.',
  },
  {
    icon: '🤝',
    title: 'Προσωπική Εξυπηρέτηση',
    description: 'Ένας άνθρωπος υπεύθυνος για κάθε πελάτη. Όχι τηλεφωνικά κέντρα.',
  },
]

export const STATS = [
  { value: '30+', label: 'Χρόνια στον κλάδο' },
  { value: '500+', label: 'Ενεργοί πελάτες' },
  { value: '4', label: 'Γραφεία παρουσίας' },
  { value: '98%', label: 'Ικανοποίηση πελατών' },
]

export const OFFICES = [
  { city: 'Αθήνα', icon: '🏛️', contact: 'Ι. Κατσούρης & Υιοί', phone: '210 347 9178', tel: '2103479178' },
  { city: 'Κάλυμνος', icon: '⚓', contact: 'Ν. Μελιάνος', phone: '22430 23222', tel: '2243023222' },
  { city: 'Κως', icon: '🌊', contact: 'Σ. Παπαποστόλου', phone: '22420 27780', tel: '2242027780' },
  { city: 'Ρόδος', icon: '🌅', contact: 'Χ. Ποσάτζης', phone: '22410 63224', tel: '2241063224' },
]

export const CARGO_TYPES = [
  'Παλέτες',
  'Χύδην εμπόρευμα',
  'Ψυγεία / Τρόφιμα',
  'Μηχανήματα / Εξοπλισμός',
  'Μετακόμιση',
  'Άλλο',
]

export const PRIMARY_PHONE = '210 347 9178'
export const PRIMARY_TEL = '2103479178'
export const PRIMARY_EMAIL = 'info@aigaiometaforiki.gr'
```

- [ ] **Step 2: Commit**

```bash
git add lib/constants.ts
git commit -m "feat: add shared constants (services, offices, stats)"
```

---

## Chunk 2: Static UI Components

### Task 4: TopBar component

**Files:**
- Create: `components/TopBar.tsx`

- [ ] **Step 1: Write `components/TopBar.tsx`**

```tsx
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
```

- [ ] **Step 2: Add to `app/page.tsx` temporarily to verify render**

```tsx
import TopBar from '@/components/TopBar'

export default function Home() {
  return <main><TopBar /></main>
}
```

- [ ] **Step 3: Check in browser**

```bash
npm run dev
```
Expected: gold bar visible on desktop, hidden when viewport < 640px (resize to verify).

- [ ] **Step 4: Commit**

```bash
git add components/TopBar.tsx app/page.tsx
git commit -m "feat: add TopBar component"
```

---

### Task 5: Nav component (with mobile drawer)

**Files:**
- Create: `components/Nav.tsx`

- [ ] **Step 1: Write `components/Nav.tsx`**

```tsx
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

  // Close drawer on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setOpen(false) }
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <nav className="sticky top-0 z-50 bg-navy-900 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-tight">
            <span className="text-gold-400 font-black text-lg tracking-wide uppercase">
              ΑΙΓΑΙΟΜΕΤΑΦΟΡΙΚΗ
            </span>
            <span className="text-slate-400 text-[10px] tracking-[3px] uppercase">
              Αφοί Κατσούρη Ε.Π.Ε.
            </span>
          </a>

          {/* Desktop links */}
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

          {/* Mobile hamburger */}
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

      {/* Mobile drawer overlay */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-4/5 max-w-sm z-50 bg-navy-900 transform transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-5 border-b border-white/10">
          <span className="text-gold-400 font-black tracking-wide uppercase">ΑΙΓΑΙΟΜΕΤΑΦΟΡΙΚΗ</span>
          <button
            onClick={() => setOpen(false)}
            className="text-slate-400 p-1"
            aria-label="Κλείσιμο μενού"
          >
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
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import TopBar from '@/components/TopBar'
import Nav from '@/components/Nav'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
    </main>
  )
}
```

- [ ] **Step 3: Test in browser**

```bash
npm run dev
```
Expected: sticky navy nav on desktop with links; hamburger icon on mobile; clicking hamburger opens full-height drawer; clicking overlay or ✕ closes it.

- [ ] **Step 4: Commit**

```bash
git add components/Nav.tsx app/page.tsx
git commit -m "feat: add Nav with sticky desktop bar and mobile drawer"
```

---

### Task 6: Services component

**Files:**
- Create: `components/Services.tsx`

- [ ] **Step 1: Write `components/Services.tsx`**

```tsx
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
            {/* Left accent */}
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
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import TopBar from '@/components/TopBar'
import Nav from '@/components/Nav'
import Services from '@/components/Services'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Services />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Expected: 6 cards in 3-column grid on desktop, 2 columns on tablet, 1 column on mobile. Gold left border on each card.

- [ ] **Step 4: Commit**

```bash
git add components/Services.tsx app/page.tsx
git commit -m "feat: add Services section with 6 B2B service cards"
```

---

### Task 7: WhyUs component

**Files:**
- Create: `components/WhyUs.tsx`

- [ ] **Step 1: Write `components/WhyUs.tsx`**

```tsx
import { WHY_US_ITEMS, STATS } from '@/lib/constants'

export default function WhyUs() {
  return (
    <section id="why-us" className="bg-navy-900 py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left: advantages */}
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

        {/* Right: stats grid */}
        <div className="grid grid-cols-2 gap-5">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-7 text-center"
            >
              <div className="text-4xl sm:text-5xl font-black text-gold-400 leading-none mb-2">
                {stat.value}
              </div>
              <div className="text-slate-500 text-xs sm:text-sm leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import TopBar from '@/components/TopBar'
import Nav from '@/components/Nav'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Services />
      <WhyUs />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Expected: dark navy section, 2 columns on desktop (advantages + stats grid), single column on mobile.

- [ ] **Step 4: Commit**

```bash
git add components/WhyUs.tsx app/page.tsx
git commit -m "feat: add WhyUs section with advantages and stats"
```

---

### Task 8: Coverage component

**Files:**
- Create: `components/Coverage.tsx`

- [ ] **Step 1: Write `components/Coverage.tsx`**

```tsx
import { OFFICES } from '@/lib/constants'

export default function Coverage() {
  return (
    <section id="coverage" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <p className="text-xs font-bold text-gold-400 tracking-[3px] uppercase mb-3">
          Περιοχές εξυπηρέτησης
        </p>
        <h2 className="text-3xl sm:text-4xl font-black text-navy-900 mb-4 tracking-tight">
          Φτάνουμε παντού
        </h2>
        <p className="text-slate-500 text-base mb-12 max-w-lg leading-relaxed">
          Δίκτυο παρουσίας σε στρατηγικά σημεία της Ελλάδας.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFICES.map((office) => (
            <div
              key={office.city}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-gold-400 transition-colors"
            >
              <h4 className="flex items-center gap-2 text-navy-900 font-extrabold text-base mb-3">
                <span>{office.icon}</span>
                {office.city}
              </h4>
              <p className="text-slate-500 text-sm mb-1">{office.contact}</p>
              <a
                href={`tel:${office.tel}`}
                className="text-navy-900 font-semibold text-sm hover:text-gold-400 transition-colors"
              >
                📞 {office.phone}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import TopBar from '@/components/TopBar'
import Nav from '@/components/Nav'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Coverage from '@/components/Coverage'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Services />
      <WhyUs />
      <Coverage />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Expected: 4 office cards in a row on desktop, 2 columns on tablet, 1 on mobile. Phone numbers are tappable links.

- [ ] **Step 4: Commit**

```bash
git add components/Coverage.tsx app/page.tsx
git commit -m "feat: add Coverage section with 4 office cards"
```

---

### Task 9: Footer component

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 1: Write `components/Footer.tsx`**

```tsx
import { PRIMARY_EMAIL, PRIMARY_PHONE, PRIMARY_TEL } from '@/lib/constants'

const FOOTER_SERVICES = ['Εντός Αττικής', 'Πανελλαδικές Μεταφορές', 'Νησιά Αιγαίου', 'Βαρέα Φορτία', 'Μετακομίσεις']
const FOOTER_COMPANY = ['Σχετικά με εμάς', 'Επικοινωνία']

export default function Footer() {
  return (
    <footer className="bg-navy-950 pt-14 pb-6 px-4 sm:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-gold-400 font-black text-lg tracking-wide uppercase">ΑΙΓΑΙΟΜΕΤΑΦΟΡΙΚΗ</p>
            <p className="text-slate-600 text-[10px] tracking-[3px] uppercase mb-4">Αφοί Κατσούρη Ε.Π.Ε.</p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Αξιόπιστες B2B εμπορευματικές μεταφορές σε όλη την Ελλάδα από το 1990.
            </p>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-gold-400 text-xs font-bold tracking-[2px] uppercase mb-4">Υπηρεσίες</h5>
            {FOOTER_SERVICES.map((s) => (
              <a key={s} href="#services" className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">
                {s}
              </a>
            ))}
          </div>

          {/* Company */}
          <div>
            <h5 className="text-gold-400 text-xs font-bold tracking-[2px] uppercase mb-4">Εταιρεία</h5>
            {FOOTER_COMPANY.map((s) => (
              <a key={s} href="#" className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">
                {s}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-gold-400 text-xs font-bold tracking-[2px] uppercase mb-4">Επικοινωνία</h5>
            <a href={`tel:${PRIMARY_TEL}`} className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">
              📞 {PRIMARY_PHONE}
            </a>
            <a href={`mailto:${PRIMARY_EMAIL}`} className="block text-slate-600 text-sm mb-2 hover:text-slate-400 transition-colors">
              ✉ {PRIMARY_EMAIL}
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-5 flex flex-col sm:flex-row justify-between gap-2">
          {/* Year is dynamic — update CONTACT_EMAIL in .env before go-live */}
          <p className="text-slate-700 text-xs">© {new Date().getFullYear()} Αιγαιομεταφορική Ε.Π.Ε. — Αφοί Κατσούρη</p>
          <p className="text-slate-700 text-xs">Σχεδιασμός & Ανάπτυξη</p>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import TopBar from '@/components/TopBar'
import Nav from '@/components/Nav'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Coverage from '@/components/Coverage'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Services />
      <WhyUs />
      <Coverage />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Expected: 4-column footer on desktop, stacks on mobile. Phone/email links work.

- [ ] **Step 4: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: add Footer component"
```

---

## Chunk 3: Hero, Contact Form & Server Action

### Task 10: Resend email utility

**Files:**
- Create: `lib/sendEmail.ts`

- [ ] **Step 1: Write `lib/sendEmail.ts`**

```ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export interface ContactFormData {
  name: string
  phone: string
  route: string
  cargoType: string
  notes?: string
}

export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const recipient = process.env.CONTACT_EMAIL
  if (!recipient) throw new Error('CONTACT_EMAIL env var not set')

  await resend.emails.send({
    from: 'onboarding@resend.dev', // Replace with verified domain sender
    to: recipient,
    subject: `Νέο αίτημα προσφοράς — ${data.name}`,
    html: `
      <h2>Νέο αίτημα προσφοράς</h2>
      <table cellpadding="8" style="border-collapse:collapse;">
        <tr><td><strong>Όνομα:</strong></td><td>${data.name}</td></tr>
        <tr><td><strong>Τηλέφωνο:</strong></td><td>${data.phone}</td></tr>
        <tr><td><strong>Διαδρομή:</strong></td><td>${data.route}</td></tr>
        <tr><td><strong>Είδος φορτίου:</strong></td><td>${data.cargoType}</td></tr>
        ${data.notes ? `<tr><td><strong>Σημειώσεις:</strong></td><td>${data.notes}</td></tr>` : ''}
      </table>
    `,
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/sendEmail.ts
git commit -m "feat: add Resend email utility"
```

---

### Task 11: Contact Server Action

**Files:**
- Create: `app/actions/contact.ts`

- [ ] **Step 1: Write `app/actions/contact.ts`**

```ts
'use server'

import { sendContactEmail } from '@/lib/sendEmail'
import { CARGO_TYPES } from '@/lib/constants'

export type ContactState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function submitContactForm(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const name = formData.get('name')?.toString().trim() ?? ''
  const phone = formData.get('phone')?.toString().trim() ?? ''
  const route = formData.get('route')?.toString().trim() ?? ''
  const cargoType = formData.get('cargoType')?.toString().trim() ?? ''
  const notes = formData.get('notes')?.toString().trim()

  // Validation
  if (!name || !phone || !route || !cargoType) {
    return { status: 'error', message: 'Παρακαλώ συμπληρώστε όλα τα υποχρεωτικά πεδία.' }
  }
  if (phone.replace(/\D/g, '').length < 10) {
    return { status: 'error', message: 'Παρακαλώ εισάγετε έγκυρο τηλέφωνο.' }
  }
  if (!CARGO_TYPES.includes(cargoType)) {
    return { status: 'error', message: 'Μη έγκυρο είδος φορτίου.' }
  }

  try {
    await sendContactEmail({ name, phone, route, cargoType, notes })
    return { status: 'success' }
  } catch (err) {
    console.error('Email send error:', err)
    return { status: 'error', message: 'Κάτι πήγε στραβά. Παρακαλώ δοκιμάστε ξανά ή καλέστε μας.' }
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/actions/contact.ts
git commit -m "feat: add contact form Server Action with validation"
```

---

### Task 12: ContactForm client component

**Files:**
- Create: `components/ContactForm.tsx`

- [ ] **Step 1: Write `components/ContactForm.tsx`**

```tsx
'use client'

import { useActionState } from 'react'
import { submitContactForm, ContactState } from '@/app/actions/contact'
import { CARGO_TYPES } from '@/lib/constants'

const initialState: ContactState = { status: 'idle' }

const inputClass =
  'w-full px-3.5 py-3 rounded-lg border-[1.5px] border-slate-200 bg-slate-50 text-navy-900 text-sm focus:outline-none focus:border-gold-400 transition-colors'

export default function ContactForm() {
  const [state, action, isPending] = useActionState(submitContactForm, initialState)

  if (state.status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
        <span className="text-5xl">✅</span>
        <p className="text-navy-900 font-extrabold text-xl">Το αίτημά σας στάλθηκε!</p>
        <p className="text-slate-500 text-sm leading-relaxed">
          Θα επικοινωνήσουμε μαζί σας εντός 24 ωρών.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="flex flex-col gap-3.5">
      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Ονοματεπώνυμο <span className="text-red-500">*</span>
        </label>
        <input
          name="name"
          type="text"
          placeholder="Γιώργος Παπαδόπουλος"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Τηλέφωνο <span className="text-red-500">*</span>
        </label>
        <input
          name="phone"
          type="tel"
          placeholder="69X XXX XXXX"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Προέλευση → Προορισμός <span className="text-red-500">*</span>
        </label>
        <input
          name="route"
          type="text"
          placeholder="π.χ. Αθήνα → Ρόδος"
          required
          className={inputClass}
        />
      </div>

      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Είδος φορτίου <span className="text-red-500">*</span>
        </label>
        <select name="cargoType" required className={inputClass}>
          <option value="">Επιλέξτε...</option>
          {CARGO_TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] font-bold text-navy-900 uppercase tracking-wide mb-1.5">
          Σημειώσεις
        </label>
        <textarea
          name="notes"
          placeholder="Βάρος, διαστάσεις, ιδιαίτερες απαιτήσεις..."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {state.status === 'error' && (
        <p className="text-red-600 text-xs font-semibold bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          ❌ {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-navy-900 text-gold-400 py-3.5 rounded-lg font-extrabold text-sm tracking-wide mt-1 disabled:opacity-60 hover:bg-navy-800 transition-colors"
      >
        {isPending ? 'Αποστολή...' : 'Αποστολή Αιτήματος →'}
      </button>

      <p className="text-center text-[11px] text-slate-400">
        🔒 Τα στοιχεία σας παραμένουν εμπιστευτικά
      </p>
    </form>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ContactForm.tsx
git commit -m "feat: add ContactForm client component with pending/success/error states"
```

---

### Task 13: Hero section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 1: Write `components/Hero.tsx`**

```tsx
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
        {/* Content */}
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
            Από την Αττική ώς τα νησιά του Αιγαίου — αναλαμβάνουμε τη μεταφορά
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

          {/* Stats */}
          <div className="flex flex-wrap gap-8 mt-12 pt-10 border-t border-white/[0.07]">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-black text-gold-400 leading-none">{stat.value}</p>
                <p className="text-slate-500 text-xs uppercase tracking-wide mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div id="contact-form" className="bg-white rounded-2xl p-8 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
          <p className="text-navy-900 font-extrabold text-xl mb-1">Ζητήστε Προσφορά</p>
          <p className="text-slate-400 text-sm mb-6">Δωρεάν αξιολόγηση σε 24 ώρες</p>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update `app/page.tsx` with full page assembly**

```tsx
import TopBar from '@/components/TopBar'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import WhyUs from '@/components/WhyUs'
import Coverage from '@/components/Coverage'
import Footer from '@/components/Footer'
import MobileCallBar from '@/components/MobileCallBar'

export default function Home() {
  return (
    <main>
      <TopBar />
      <Nav />
      <Hero />
      <Services />
      <WhyUs />
      <Coverage />
      <Footer />
      <MobileCallBar />
    </main>
  )
}
```

- [ ] **Step 3: Verify in browser**

Expected: full 2-column hero on desktop with form card on the right. Single column on mobile with form below content. Stats bar at the bottom of the hero content.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx app/page.tsx
git commit -m "feat: add Hero section with form card and stats"
```

---

## Chunk 4: Mobile Call Bar & Final Polish

### Task 14: MobileCallBar component

**Files:**
- Create: `components/MobileCallBar.tsx`

- [ ] **Step 1: Write `components/MobileCallBar.tsx`**

```tsx
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
```

- [ ] **Step 2: Add bottom padding to `app/layout.tsx` for mobile**

Add `pb-20 sm:pb-0` to the `<body>` className so the sticky bar doesn't cover content:

```tsx
<body className={`${inter.variable} font-sans antialiased pb-20 sm:pb-0`}>
```

- [ ] **Step 3: Verify on mobile viewport**

Resize browser to mobile width. Expected: sticky bar pinned to bottom with call + form CTA buttons. Bar hidden on desktop/tablet.

- [ ] **Step 4: Commit**

```bash
git add components/MobileCallBar.tsx app/layout.tsx
git commit -m "feat: add sticky mobile call bar"
```

---

### Task 15: Final build & verification

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: `✓ Compiled successfully` with no errors. Note any warnings about missing env vars (expected — Resend key not set yet).

- [ ] **Step 2: Run production server locally**

```bash
npm start
```
Expected: site running at http://localhost:3000, all sections visible.

- [ ] **Step 3: Test mobile responsiveness**

Open DevTools → Toggle Device Toolbar. Test at:
- iPhone SE (375px): hero stacks, form below, mobile call bar visible
- iPad (768px): services 2-col, nav hamburger
- Desktop (1280px): full layout, no mobile bar

- [ ] **Step 4: Test form submission (without Resend)**

Fill and submit form. Expected: error state appears (Resend key not set). Form does not crash.

- [ ] **Step 5: Test form validation**

Submit empty form. Expected: browser native validation fires (required fields). Submit with invalid phone length. Expected: server returns error message.

- [ ] **Step 6: Final commit**

```bash
git add -A
git commit -m "chore: final polish and production build verified"
```

---

## Post-Deployment Checklist

Before going live:
1. Set `RESEND_API_KEY` in Vercel environment variables
2. Set `CONTACT_EMAIL` to client's actual email in Vercel env vars
3. Verify Resend sender domain or use `onboarding@resend.dev` for testing
4. Deploy to Vercel: `vercel --prod`
5. Test form submission end-to-end on production URL
6. Confirm email arrives in client's inbox
