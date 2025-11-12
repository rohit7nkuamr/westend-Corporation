import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const location = useLocation()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              {/* Logo Image */}
              <img 
                src="/logo.png" 
                alt="Westend Corporation Logo" 
                className="h-10 md:h-14 w-auto object-contain"
              />
              {/* Company Name - Show on mobile too */}
              <div>
                <h1 className="text-base md:text-xl font-bold text-gray-800" style={{ fontFamily: 'serif' }}>
                  Westend Corporation
                </h1>
                <p className="text-xs text-primary-600 hidden sm:block">Premium Food Products</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors duration-300 font-medium ${
                  location.pathname === link.href 
                    ? 'text-primary-700 border-b-2 border-primary-700' 
                    : 'text-gray-700 hover:text-primary-700'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-primary-600 text-white px-6 py-2.5 rounded-lg hover:bg-primary-700 hover:shadow-lg transition-all duration-300 font-medium border-2 border-primary-500"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-700 transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-neutral-200"
        >
          <div className="px-4 pt-2 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-neutral-700 hover:text-accent-600 transition-colors py-2 font-medium"
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-all duration-300 text-center font-medium border-2 border-primary-500"
            >
              Request Quote
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}

export default Navbar
