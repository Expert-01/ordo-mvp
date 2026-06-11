import React from 'react'
import { ProblemSectionProps, ProblemCard } from './types'
import ill1 from '../../assets/illustrations/ill1.png'
import ill2 from '../../assets/illustrations/ill2.png'
import ill3 from '../../assets/illustrations/ill3.png'
import ill4 from '../../assets/illustrations/ill4.png'

/**
 * ProblemSection Component
 * Displays 4 problem cards in an alternating layout
 * Text and illustration placeholders alternate left/right
 * Responsive: stacked (mobile), side-by-side (desktop)
 */
const ProblemSection: React.FC<ProblemSectionProps> = () => {
  const defaultProblems: ProblemCard[] = [
    {
      id: 'problem-1',
      icon: 'skills',
      title: "Your degree looks good on paper but employers are looking for skills you don't have",
      description: 'Employers need practical, job-ready skills not just theory',
    },
    {
      id: 'problem-2',
      icon: 'projects',
      title: "You've built assignments, not projects that matter",
      description: 'Assignments don\'t showcase your ability to solve real-world problems.',
    },
    {
      id: 'problem-3',
      icon: 'career',
      title: "You don't know what career path actually fits you",
      description: 'Confusion leads to wrong choices and wasted time',
    },
    {
      id: 'problem-4',
      icon: 'portfolio',
      title: "You have no portfolio to show what you can do",
      description: 'Without a portfolio, you have nothing to prove your abilities',
    },
  ]

  const illustrations = [ill1, ill2, ill3, ill4]

  return (
    <section id="problem" className="py-16 md:py-24 px-4 md:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Section Header - Side by Side Layout */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          <h2 className="text-3xl md:text-4xl font-bold text-ordo-green-900 orbitron flex-shrink-0">
            The Problem
          </h2>
          <div className="flex-1 md:max-w-md">
            <p className="text-base md:text-lg text-gray-700 leading-relaxed">
              You work hard. You attend lectures, pass exams, earn your degree. But when you graduate, you face a painful reality:
            </p>
          </div>
        </div>

        {/* Problem Items - Alternating Layout */}
        <div className="space-y-16 md:space-y-20">
          {defaultProblems.map((problem, index) => {
            const isTextLeft = index % 2 === 0

            return (
              <div
                key={problem.id}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
              >
                {/* Text Content */}
                <div
                  className={`flex-1 ${
                    isTextLeft ? 'md:order-1' : 'md:order-2'
                  }`}
                >
                  <h3 className="text-xl md:text-2xl font-bold text-ordo-green-900 mb-3 leading-snug">
                    {problem.title}
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                {/* Illustration Placeholder */}
                <div
                  className={`flex-1 flex-shrink-0 ${
                    isTextLeft ? 'md:order-2' : 'md:order-1'
                  }`}
                >
                  <img
                    src={illustrations[index]}
                    alt={problem.title}
                    className="w-full h-auto max-h-80 object-contain"
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection