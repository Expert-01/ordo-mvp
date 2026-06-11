import React from 'react'

const OrdoIcon: React.FC<{size?: number, className?: string}> = ({ size = 96, className }) => {
  const s = size
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ordo logo"
    >
      <g transform="translate(50 50)">
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0"
            to="360"
            dur="2s"
            repeatCount="indefinite"
          />
          <circle cx="0" cy="0" r="40" stroke="#19A974" strokeWidth="6" fill="none" opacity="0.9" />
        </g>
        <circle cx="0" cy="0" r="26" stroke="#19A974" strokeWidth="6" fill="none" opacity="0.95" />
        <rect x="-2" y="-20" width="4" height="16" rx="2" fill="#19A974" />
        <rect x="-2" y="6" width="4" height="16" rx="2" fill="#19A974" />
      </g>
    </svg>
  )
}

export default OrdoIcon
