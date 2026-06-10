import React from 'react'
import { CardProps } from '../types'

/**
 * Reusable Card component for landing page sections
 * Supports multiple variants: outline, solid, gradient
 * Includes hover effects and customizable styling
 */
const Card: React.FC<CardProps> = ({
  children,
  variant = 'solid',
  hover = true,
  className = '',
  onClick,
}) => {
  const baseStyles = 'rounded-lg transition-all duration-300'
  
  const variantStyles = {
    outline: 'border-2 border-gray-200 bg-white',
    solid: 'bg-white border border-gray-200',
    gradient: 'bg-gradient-to-br from-ordo-green-700 to-ordo-green-600',
  }

  const hoverStyles = hover ? 'hover:shadow-lg hover:scale-[1.02]' : ''

  const clickableStyles = onClick ? 'cursor-pointer' : ''

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${hoverStyles}
    ${clickableStyles}
    ${className}
  `.trim()

  return (
    <div className={combinedClassName} onClick={onClick}>
      {children}
    </div>
  )
}

export default Card
