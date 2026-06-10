import React, { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LandingNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-ordo-green-900 to-ordo-green-800 shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="/" 
              className="text-2xl font-bold text-white hover:text-ordo-green-100 transition-colors duration-200"
            >
              ORDO
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection('mission')}
                className="text-sm font-medium text-white hover:text-ordo-green-100 transition-colors duration-200 cursor-pointer"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="text-sm font-medium text-white hover:text-ordo-green-100 transition-colors duration-200 cursor-pointer"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="text-sm font-medium text-white hover:text-ordo-green-100 transition-colors duration-200 cursor-pointer"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection('how')}
                className="text-sm font-medium text-white hover:text-ordo-green-100 transition-colors duration-200 cursor-pointer"
              >
                How it Works
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 ml-8 pl-8 border-l border-ordo-green-700">
              <a
                href="/auth/login"
                className="px-5 py-2 text-sm font-medium text-ordo-green-900 bg-white rounded-md hover:bg-ordo-green-50 transition-colors duration-200"
              >
                Login
              </a>
              <a
                href="/auth/signup"
                className="px-6 py-2 text-sm font-medium text-white bg-ordo-green-950 hover:bg-ordo-green-900 rounded-md transition-colors duration-200 shadow-md"
              >
                Get Started
              </a>
            </div>
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
                onClick={() => scrollToSection('mission')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                Mission
              </button>
              <button
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection('community')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                Community
              </button>
              <button
                onClick={() => scrollToSection('how')}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-white hover:bg-ordo-green-700 rounded transition-colors duration-200"
              >
                How it Works
              </button>
              <div className="flex gap-3 pt-4 px-4">
                <a
                  href="/auth/login"
                  className="flex-1 px-4 py-2 text-sm font-medium text-ordo-green-900 bg-white rounded-md hover:bg-ordo-green-50 transition-colors duration-200 text-center"
                >
                  Login
                </a>
                <a
                  href="/auth/signup"
                  className="flex-1 px-4 py-2 text-sm font-medium text-white bg-ordo-green-950 hover:bg-ordo-green-900 rounded-md transition-colors duration-200 text-center"
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
