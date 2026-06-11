import React from 'react'

const OrdoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    aria-label="Ordo logo"
  >
    <circle cx="50" cy="50" r="44" fill="none" stroke="#2a7a44" strokeWidth="6" />
    <circle cx="50" cy="50" r="30" fill="none" stroke="#2a7a44" strokeWidth="6" />
    <rect x="47" y="20" width="6" height="20" fill="#2a7a44" rx="1" />
    <rect x="47" y="60" width="6" height="20" fill="#2a7a44" rx="1" />
  </svg>
)

export default OrdoIcon
