import React from 'react'
import OrdoIcon from './OrdoIcon'

const Preloader: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,250,0.9))',
      zIndex: 9999
    }}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>
        <OrdoIcon size={96} />
        <div style={{color: '#0f172a', fontSize: 14, opacity: 0.85}}>Loading…</div>
      </div>
    </div>
  )
}

export default Preloader
