import React from 'react'
import { Brain, Map, Code2, Briefcase } from 'lucide-react'
import { FeaturesSectionProps, FeatureCard } from './types'
import { SectionHeader } from './shared'

/**
 * FeaturesSection Component
 * Displays 4 core ORDO features in gradient cards
 * 2x2 grid layout with varying gradient intensities
 * Cards are clickable and have hover effects
 */
const FeaturesSection: React.FC<FeaturesSectionProps> = () => {
  const defaultFeatures: FeatureCard[] = [
    {
      id: 'feature-1',
      title: 'AI ACADEMIC COMPANION',
      description: 'Your personal tutor always available. Ask anything, anytime.',
      icon: <Brain className="w-12 h-12" />,
      bullets: [
        'Conversational learning',
        'Understand difficult concepts',
        '24/7 availability',
        'Track deadlines & progress',
      ],
      gradientFrom: 'from-ordo-green-700',
      gradientTo: 'to-ordo-green-600',
    },
    {
      id: 'feature-2',
      title: 'SMART CAREER ROADMAPS',
      description: 'Know exactly what it takes to land your dream job.',
      icon: <Map className="w-12 h-12" />,
      bullets: [
        'See career opportunities',
        'Identify skill gaps',
        'Find required training',
        'See next-step guidance',
      ],
      gradientFrom: 'from-ordo-green-600',
      gradientTo: 'to-ordo-green-500',
    },
    {
      id: 'feature-3',
      title: 'PROJECT-BASED LEARNING HUB',
      description: 'Build a portfolio employers care about.',
      icon: <Code2 className="w-12 h-12" />,
      bullets: [
        'Real-world projects',
        'Industry-relevant skills',
        'Deliverable portfolio',
        'Career-ready projects',
      ],
      gradientFrom: 'from-ordo-green-500',
      gradientTo: 'to-ordo-green-400',
    },
    {
      id: 'feature-4',
      title: 'OPPORTUNITY MARKETPLACE',
      description: 'Find internships, jobs, scholarships, and more.',
      icon: <Briefcase className="w-12 h-12" />,
      bullets: [
        'Job opportunities',
        'Internship postings',
        'Scholarship matches',
        'Curated for you',
      ],
      gradientFrom: 'from-ordo-green-500',
      gradientTo: 'to-ordo-green-400',
    },
  ]

  return (
    <section id="features" className="py-20 md:py-28 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <SectionHeader
            title="Introducing ORDO"
            subtitle="Your Complete Student Success Ecosystem"
            description="Everything you need to succeed in your career journey"
            centered
            titleSize="xl"
          />
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {defaultFeatures.map((feature) => (
            <div
              key={feature.id}
              className={`
                bg-gradient-to-br ${feature.gradientFrom} ${feature.gradientTo}
                rounded-2xl p-8 md:p-10 min-h-[280px]
                flex flex-col justify-between
                hover:shadow-2xl hover:scale-105 transition-all duration-300
                cursor-pointer
              `}
              role="article"
              aria-label={feature.title}
            >
              {/* Card Header */}
              <div className="mb-6">
                {/* Icon Badge */}
                <div
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6 text-white"
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 leading-snug">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-base text-white/90 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              {/* Bullets */}
              <div className="space-y-3 mb-6">
                {feature.bullets.map((bullet, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-white font-bold mt-1">•</span>
                    <span className="text-white/85 text-sm md:text-base">
                      {bullet}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom CTA */}
              <p className="text-white font-semibold text-sm md:text-base mt-6">
                Learn more →
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
