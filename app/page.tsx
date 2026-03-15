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
