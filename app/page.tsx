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
