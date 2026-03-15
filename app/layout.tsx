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
  description: 'B2B εμπορευματικές μεταφορές σε όλη την Ελλάδα. Αττική, πανελλαδικά. Επικοινωνήστε για προσφορά.',
  openGraph: {
    title: 'Αιγαιομεταφορική — Αφοί Κατσούρη',
    description: 'Εμπορευματικές μεταφορές B2B σε Αττική και πανελλαδικά.',
    locale: 'el_GR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="el">
      <body className={`${inter.variable} font-sans antialiased pb-20 sm:pb-0`}>
        {children}
      </body>
    </html>
  )
}
