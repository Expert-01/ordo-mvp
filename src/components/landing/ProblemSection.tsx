import React from 'react'
import { Brain, BarChart3, Users, Briefcase } from 'lucide-react'
import { Card, SectionHeader } from './shared'
import { ProblemSectionProps, ProblemCard } from './types'

/**
 * ProblemSection Component
 * Displays 4 problem cards in a 2x2 grid layout
 * Shows student pain points that ORDO solves
 * Responsive: single column (mobile), 2x2 grid (desktop)
 */
const ProblemSection: React.FC<ProblemSectionProps> = () => {
  const defaultProblems: ProblemCard[] = [
    {
      id: 'problem-1',
      icon: <Brain className="w-12 h-12 text-ordo-green-700" />,
      title: "You're learning topics that won't help you in the real world",
      description: 'Most textbooks and courses are outdated.',
    },
    {
      id: 'problem-2',
      icon: <BarChart3 className="w-12 h-12 text-ordo-green-700" />,
      title: 'Your progress isn\'t tracked',
      description: 'You don\'t know what skills you\'re developing.',
    },
    {
      id: 'problem-3',
      icon: <Users className="w-12 h-12 text-ordo-green-700" />,
      title: 'No community or mentorship',
      description: 'You\'re alone in your journey.',
    },
    {
      id: 'problem-4',
      icon: <Briefcase className="w-12 h-12 text-ordo-green-700" />,
      title: 'You have no portfolio to show what you can do',
      description: 'When you graduate, you don\'t have projects employers care about.',
    },
  ]

  return (
    <section id="problem" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            title="The Problem"
            description="Your dreams are great for great things, but actually achieving them is way harder than they say."
            centered
          />
        </div>

        {/* Problem Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {defaultProblems.map((problem) => (
            <Card
              key={problem.id}
              variant="solid"
              hover
              className="p-6 md:p-8 flex flex-col md:flex-row md:items-stretch md:gap-6 min-h-full md:min-h-[240px]"
            >
              {/* Icon/Image Container */}
              <div className="flex-shrink-0 mb-4 md:mb-0 flex items-center justify-center w-full md:w-32 h-32 bg-ordo-green-50 rounded-md">
                {problem.icon}
              </div>

              {/* Text Container */}
              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-lg md:text-xl font-semibold text-ordo-green-900 mb-2 leading-snug">
                  {problem.title}
                </h4>
                <p className="text-base text-gray-600 leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
