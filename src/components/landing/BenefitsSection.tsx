import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { BenefitsSectionProps, BenefitItem } from './types'

/**
 * BenefitsSection Component (Advanced Refactor)
 * 
 * Key Changes:
 * 1. Left-aligned header (removed text-center)
 * 2. Staggered card layout with alternating left/right positioning
 * 3. Dynamic card rendering with index-based offset
 * 4. Smooth cascading visual effect
 * 5. Responsive: stagger effect on desktop, linear on mobile
 */
const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title = 'WHAT IF YOU DIDN\'T HAVE TO CHOOSE?',
  subtitle = 'What if you could:',
}) => {
  const defaultBenefits: BenefitItem[] = [
    {
      id: 'benefit-1',
      text: 'Learn from your university curriculum AND industry demand',
    },
    {
      id: 'benefit-2',
      text: 'Build real projects that employers actually care about',
    },
    {
      id: 'benefit-3',
      text: 'Get mentorship while still in school (not after) and have a portfolio ready when you graduate',
    },
    {
      id: 'benefit-4',
      text: 'Track your progress and see skills AND job readiness in real-time',
    },
  ]

  /**
   * Determine card positioning based on index
   * Even indices: left-aligned (0, 2, 4...)
   * Odd indices: right-aligned (1, 3, 5...)
   */
  const getCardAlignment = (index: number): string => {
    if (index % 2 === 0) {
      // Left-aligned card
      return 'md:mr-auto'
    } else {
      // Right-aligned card
      return 'md:ml-auto'
    }
  }

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 md:px-8 lg:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header - LEFT ALIGNED */}
        <div className="mb-12 md:mb-16 text-left">
          <h2 className="orbitron text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 uppercase tracking-wider leading-tight max-w-4xl">
            {title}
          </h2>
          <p className="text-base md:text-lg text-gray-700 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Staggered Benefits Container */}  
        <div className="space-y-4 md:space-y-6">
          {defaultBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className={`flex items-center gap-4 md:gap-6 p-6 md:p-8 bg-[#3d5a38] rounded-lg hover:shadow-xl transition-all duration-300 min-h-[100px] md:min-h-[120px] max-w-2xl md:max-w-3xl ${getCardAlignment(index)}`}
              role="listitem"
              aria-label={`Benefit ${index + 1}: ${benefit.text}`}
            >
              {/* Checkmark Icon */}
              <CheckCircle2 
                className="w-6 h-6 md:w-8 md:h-8 text-white flex-shrink-0" 
                aria-hidden="true" 
              />
              
              {/* Benefit Text */}
              <p className="text-white text-base md:text-lg font-semibold leading-relaxed">
                {benefit.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection