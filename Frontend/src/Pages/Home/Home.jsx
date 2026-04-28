import React from 'react'

import HomePageHero from './HomePageHero'
import TrustedPartners from './TrustedPartners'
import ServicesSection from './ServicesSection'
import WhyChooseUs from './WhyChooseUs'
import OurProcess from './OurProcess'
import TestimonialSection from './TestimonialSection'
import ContactHeroSection from '../Contact/ContectHeroSection'

const Home = () => {
  return (
    <>
      
      <HomePageHero />
      <ServicesSection />
      <OurProcess />
      <WhyChooseUs />
      <TrustedPartners />
      <TestimonialSection />
      <ContactHeroSection />
    
    </>
  )
}

export default Home