import React, { useState, useEffect } from 'react'
import { Menu, X, MessageCircle, Globe, ShoppingBag } from 'lucide-react'
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
      transition={{ duration: 0.3 }}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999 }}
      className="w-full bg-white shadow-md"
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20 gap-2">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink min-w-0">
              {/* Logo Image */}
              <img
                src="/logo.png"
                alt="Westend Corporation Logo"
                className="h-8 md:h-14 w-auto object-contain flex-shrink-0"
              />
              {/* Company Name - Show on mobile too */}
              <div className="min-w-0 flex-shrink">
                <h1 className="text-sm md:text-xl font-bold text-gray-800 truncate" style={{ fontFamily: 'serif' }}>
                  Westend Corporation
                </h1>
                <p className="text-xs text-primary-600 hidden sm:block">Premium Food Products</p>
                {/* Visible on both mobile and desktop: exporter badge/pill */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 mt-1">
                  <Globe className="text-amber-700" size={12} />
                  Exporter from India
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                className={`transition-colors duration-300 font-medium ${location.pathname === link.href
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

          {/* Mobile Actions: Store Icon & Menu Button */}
          <div className="md:hidden flex items-center gap-3 flex-shrink-0">
            <Link
              to="/products"
              className="text-gray-700 hover:text-primary-700 transition-colors p-2"
              aria-label="View Products"
            >
              <ShoppingBag size={24} />
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-primary-700 transition-colors p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          className="md:hidden bg-white border-t border-gray-200 shadow-lg"
        >
          <div className="px-4 pt-3 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block py-3 px-4 rounded-lg font-medium transition-colors ${location.pathname === link.href
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block w-full bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 text-center font-medium border-2 border-primary-500 mt-3"
            >
              Request Quote
            </Link>
          </div>
        </motion.div>
      )}

      {/* Fixed Floating WhatsApp Button - Visible on all devices */}
      <a
        href="https://wa.me/919311933481"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-24 right-4 md:right-6 z-[10000] bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="WhatsApp"
      >
        <MessageCircle size={24} className="md:w-8 md:h-8" fill="white" strokeWidth={0} />
      </a>
    </motion.nav>
  )
}

export default Navbar
