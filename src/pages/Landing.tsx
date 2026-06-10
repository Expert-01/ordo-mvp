import React from 'react'
import Hero from '../components/landing/Hero'
import ProblemSection from '../components/landing/ProblemSection'
import BenefitsList from '../components/landing/BenefitsList'
import IntroSection from '../components/landing/IntroSection'
import AIAcademicBox from '../components/landing/AIAcademicBox'
import FooterCTA from '../components/landing/FooterCTA'
import LandingNavbar from '../components/landing/LandingNavbar'

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-ordo-cream">
      <LandingNavbar />
      <Hero />
      <ProblemSection />
      <BenefitsList />
      <IntroSection />
      <AIAcademicBox />
      <FooterCTA />
    </div>
  )
}

export default Landing
