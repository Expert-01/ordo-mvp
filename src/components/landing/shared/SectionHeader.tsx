import React from 'react'
import { SectionHeaderProps } from '../types'

/**
 * Reusable SectionHeader component
 * Displays title, subtitle, and description with consistent styling
 * Supports centered layout and multiple title sizes
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  description,
  centered = true,
  titleSize = 'xl',
}) => {
  const titleSizeMap = {
    lg: 'text-3xl md:text-4xl',
    xl: 'text-4xl md:text-5xl',
    '2xl': 'text-5xl md:text-6xl',
  }

  return (
    <div className={centered ? 'text-center' : ''}>
      {/* Main Title */}
      <h2
        className={`${titleSizeMap[titleSize]} font-bold text-ordo-green-900 mb-4 leading-tight orbitron`}
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <h3 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6 leading-snug">
          {subtitle}
        </h3>
      )}

      {/* Description */}
      {description && (
        <p
          className={`text-lg text-gray-600 leading-relaxed ${
            centered ? 'max-w-2xl mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeader
