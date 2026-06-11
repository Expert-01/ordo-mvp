import React from 'react'

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-4 flex-shrink-0">
    <path d="M20 6L9 17l-5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const BenefitCard: React.FC<{children: React.ReactNode; style?: React.CSSProperties; className?: string}> = ({children, style, className}) => (
  <div className={className} style={{backgroundColor:'var(--ordo-green-700)', color:'white', ...style}}>
    <div className="flex items-start">
      <CheckIcon />
      <div className="text-lg leading-relaxed">{children}</div>
    </div>
  </div>
)

const BenefitsList: React.FC = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <h3 className="text-xl font-semibold mb-4">WHAT IF YOU DIDN'T HAVE TO CHOOSE?</h3>
      <p className="text-gray-600 mb-6">What if you could</p>
      <div className="relative flex flex-col items-center" style={{paddingTop:32}}>
        {[
          'Learn from your university curriculum AND industry demand',
          'Build real projects that employers actually care about',
          'Get mentorship while still in school (not after) and have a portfolio ready when you graduate'
        ].map((text, i) => {
          const translateX = i % 2 === 0 ? '-8%' : '8%'
          const overlap = i === 0 ? 0 : -80
          const zIndex = 10 + (3 - i)
          const style: React.CSSProperties = {
            width: '65%',
            maxWidth: 720,
            minHeight: 160,
            padding: '1.5rem',
            borderRadius: 8,
            boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
            transform: `translateX(${translateX})`,
            marginTop: overlap,
            zIndex,
          }

          return (
            <BenefitCard key={i} style={style} className="mb-6">
              {text}
            </BenefitCard>
          )
        })}
      </div>
    </section>
  )
}

export default BenefitsList
