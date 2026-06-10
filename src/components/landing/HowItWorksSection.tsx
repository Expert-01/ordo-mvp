import React from 'react'
import { SectionHeader } from './shared'
import { HowItWorksSectionProps, TimelineStep } from './types'

/**
 * HowItWorksSection Component
 * Displays 3-step user journey/timeline
 * Vertical stack (mobile) → Horizontal (desktop)
 * Numbered badges with descriptions
 */
const HowItWorksSection: React.FC<HowItWorksSectionProps> = () => {
  const defaultSteps: TimelineStep[] = [
    {
      id: 'step-1',
      number: 1,
      title: 'Register',
      description: 'Sign up for your ORDO account in less than 2 minutes.',
      details: [
        'Create your profile',
        'Set your goals',
        'Identify interests',
      ],
    },
    {
      id: 'step-2',
      number: 2,
      title: 'AI Builds Your Roadmap',
      description: 'Our AI analyzes your profile and goals, then creates a personalized roadmap.',
      details: [
        'AI learns your goals',
        'Recommends career path',
        'Shows skill gaps',
        'Plan your journey',
      ],
    },
    {
      id: 'step-3',
      number: 3,
      title: 'Learn & Build',
      description: 'Follow your personalized path, build real projects, and get mentorship along the way.',
      details: [
        'Access courses',
        'Build projects',
        'Get feedback',
        'Track progress',
      ],
    },
  ]

  return (
    <section id="how" className="py-20 md:py-28 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-ordo-green-50 to-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24 text-center">
          <SectionHeader
            title="How it Works"
            description="Simple steps to transform your future"
            centered
            titleSize="xl"
          />
        </div>

        {/* Timeline/Flow Container */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-6 relative">
          {/* Connector Lines (Desktop Only) */}
          {defaultSteps.length > 1 && (
            <>
              <div
                className="hidden md:block absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ordo-green-300 via-ordo-green-200 to-ordo-green-100"
                style={{
                  top: '-40px',
                  height: '4px',
                }}
                aria-hidden="true"
              />
            </>
          )}

          {/* Step Cards */}
          {defaultSteps.map((step, index) => (
            <div
              key={step.id}
              className="flex-1 bg-white rounded-2xl p-8 md:p-10 border-2 border-ordo-green-100 min-h-[280px] flex flex-col justify-start hover:shadow-lg transition-shadow duration-300"
              role="article"
              aria-label={`Step ${step.number}: ${step.title}`}
            >
              {/* Step Number Badge */}
              <div
                className="w-16 h-16 bg-gradient-to-br from-ordo-green-600 to-ordo-green-500 rounded-full flex items-center justify-center mb-6 flex-shrink-0"
                aria-hidden="true"
              >
                <span className="text-3xl font-bold text-white leading-none">
                  {step.number}
                </span>
              </div>

              {/* Step Title */}
              <h3 className="text-2xl font-bold text-ordo-green-900 mb-3 leading-snug">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-base text-gray-600 leading-relaxed mb-6">
                {step.description}
              </p>

              {/* Step Details (Bullet Points) */}
              {step.details && step.details.length > 0 && (
                <ul className="space-y-2 list-none">
                  {step.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span
                        className="text-ordo-green-600 font-bold mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <span className="text-sm md:text-base text-gray-700">
                        {detail}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
