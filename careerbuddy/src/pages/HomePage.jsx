import NewSliders from 'components/NewSliders'
import AboutUs from 'components/AboutUs'
import Services from 'components/Services'
import Navbar from 'components/Navbar'

import ServiceMap from 'components/ServiceMap'
import Footer from 'components/Footer'
import FAQ from 'components/FAQ'
function HomePage() {
  return (
    <div>
      <Navbar />
      <NewSliders />

      <AboutUs />
      <Services />
      {/* <ServiceMap /> */}
      <FAQ />
      <Footer />
    </div>
  )
}

export default HomePage
