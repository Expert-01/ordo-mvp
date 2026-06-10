import React from 'react'
import Hero from '../components/landing/Hero'
import LandingNavbar from '../components/landing/LandingNavbar'
import ProblemSection from '../components/landing/ProblemSection'
import BenefitsSection from '../components/landing/BenefitsSection'
import FeaturesSection from '../components/landing/FeaturesSection'
import HowItWorksSection from '../components/landing/HowItWorksSection'
import FooterCTA from '../components/landing/FooterCTA'

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />
      <Hero />
      <ProblemSection />
      <BenefitsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FooterCTA />
    </div>
  )
}

export default Landing
