import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import  ordo_icon
const LandingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const navPillVariant = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: 0.1 }
  }

  const logoVariant = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, delay: 0 }
  }

  return (
    <nav className="fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex-shrink-0"
            initial={logoVariant.initial}
            animate={logoVariant.animate}
            transition={logoVariant.transition}
          >
            <a 
              href="/" 
              className="text-2xl orbitron font-bold text-[#E2EEE0] hover:text-ordo-[#006633] transition-colors duration-200"
            >
              ORDO
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <motion.div 
              className="flex items-center gap-8 px-8 py-2 bg-[#E6FEDA] "
              initial={navPillVariant.initial}
              animate={navPillVariant.animate}
              transition={navPillVariant.transition}
            >
              <button
                onClick={() => scrollToSection('problem')}
                className="text-sm font-medium text-ordo-green-900 hover:text-ordo-green-700 transition-colors duration-200 cursor-pointer"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="text-sm font-medium text-ordo-green-900 hover:text-ordo-green-700 transition-colors duration-200 cursor-pointer"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-ordo-green-900 hover:text-ordo-green-700 transition-colors duration-200 cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how')}
                className="text-sm font-medium text-ordo-green-900 hover:text-ordo-green-700 transition-colors duration-200 cursor-pointer"
              >
                How it Works
              </button>
              <a
                href="/login"
                className="px-6 py-2 text-sm font-medium text-white bg-ordo-green-900 hover:bg-ordo-green-800 transition-colors duration-200 "
              >
                Get Started
              </a>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-ordo-green-100 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-6 border-t border-ordo-green-700">
            <div className="space-y-3 pt-4">
              <button
                onClick={() => scrollToSection('problem')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                Problem
              </button>
              <button
                onClick={() => scrollToSection('benefits')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                Benefits
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('how')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                How it Works
              </button>
              <div className="flex gap-3 pt-4 px-4">
                <a
                  href="/auth/signup"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-ordo-green-900 hover:bg-ordo-green-800 rounded transition-colors duration-200 text-center"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default LandingNavbar
