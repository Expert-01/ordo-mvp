import React from 'react'

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BenefitCard: React.FC<{children: React.ReactNode}> = ({children}) => (
  <div className="rounded-md p-6 shadow-md mb-6" style={{backgroundColor:'var(--ordo-green-700)', color:'white'}}>
    <div className="flex items-start">
      <CheckIcon />
      <div className="text-lg">{children}</div>
    </div>
  </div>
)

const BenefitsList: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h3 className="text-xl font-semibold mb-4">WHAT IF YOU DIDN'T HAVE TO CHOOSE?</h3>
      <p className="text-gray-600 mb-6">What if you could</p>
      <div>
        <BenefitCard>Learn from your university curriculum AND industry demand</BenefitCard>
        <BenefitCard>Build real projects that employers actually care about</BenefitCard>
        <BenefitCard>Get mentorship while still in school (not after) and have a portfolio ready when you graduate</BenefitCard>
      </div>
    </section>
  )
}

export default BenefitsList
