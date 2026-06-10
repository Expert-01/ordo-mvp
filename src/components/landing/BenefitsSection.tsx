import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SectionHeader } from './shared'
import { BenefitsSectionProps, BenefitItem } from './types'

/**
 * BenefitsSection Component
 * Displays "What If You Didn't Have To Choose?" benefits
 * 4 benefit items in vertical stack with checkmark icons
 * Green gradient background boxes
 */
const BenefitsSection: React.FC<BenefitsSectionProps> = ({
  title = 'WHAT IF YOU DIDN\'T HAVE TO CHOOSE?',
  subtitle = 'Build it all with ORDO',
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

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 uppercase tracking-wider leading-tight">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-700 font-medium">
            {subtitle}
          </p>
        </div>

        {/* Benefits Container */}
        <div className="max-w-2xl mx-auto flex flex-col gap-4 md:gap-6">
          {defaultBenefits.map((benefit, index) => (
            <div
              key={benefit.id}
              className="flex items-center gap-4 md:gap-6 p-6 md:p-8 bg-gradient-to-r from-ordo-green-700 to-ordo-green-600 rounded-lg hover:shadow-lg hover:from-ordo-green-600 hover:to-ordo-green-500 transition-all duration-300 min-h-[100px] md:min-h-[120px]"
              role="listitem"
              aria-label={`Benefit ${index + 1}: ${benefit.text}`}
            >
              {/* Checkmark Icon */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-white flex-shrink-0" aria-hidden="true" />
              </div>

              {/* Benefit Text */}
              <p className="flex-1 text-white text-base md:text-lg lg:text-xl font-semibold leading-relaxed">
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
