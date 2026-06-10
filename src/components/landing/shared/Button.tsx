import React from 'react'
import { ButtonProps } from '../types'

/**
 * Reusable Button component for landing page CTAs
 * Supports link navigation, variants (primary, secondary, outline), and sizes
 */
const Button: React.FC<ButtonProps> = ({
  label,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  const baseStyles = 'font-medium transition-all duration-300 rounded-md focus:outline-none'

  const variantStyles = {
    primary: 'bg-ordo-green-950 text-white hover:bg-ordo-green-900',
    secondary: 'bg-white text-ordo-green-900 hover:bg-ordo-green-50 border-2 border-white',
    outline: 'bg-transparent text-ordo-green-900 border-2 border-ordo-green-900 hover:bg-ordo-green-50',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg',
  }

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'

  const combinedClassName = `
    ${baseStyles}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${disabledStyles}
    ${className}
  `.trim()

  if (href) {
    return (
      <a href={href} className={combinedClassName}>
        {label}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {label}
    </button>
  )
}

export default Button
