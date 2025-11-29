import React, { useState, useEffect } from 'react'
import { Menu, X, Search, Settings, ShoppingBag, User } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'PRODUCTS', href: '/products' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ]

  return (
    <>
      {/* Top Bar (Optional, for contact info or promos) - Keeping it clean for now as per inspiration */}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img src="/logo.png" alt="Westend Corporation" className="h-12 w-auto object-contain" />
              <div className="flex flex-col">
                <span className="font-bold text-lg md:text-xl text-gray-800 tracking-tight leading-tight group-hover:text-primary-600 transition-colors">
                  WESTEND CORPORATION
                </span>
                <span className="text-[10px] md:text-xs text-gray-500 tracking-wide font-medium">
                  Exporter from India to World
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`text-sm font-bold tracking-wide transition-colors duration-300 relative group ${location.pathname === link.href ? 'text-primary-500' : 'text-gray-600 hover:text-primary-500'
                    }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full ${location.pathname === link.href ? 'w-full' : ''
                    }`}></span>
                </Link>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://wa.me/919311933481"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>
              <Link
                to="/contact"
                className="bg-primary-500 text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-300"
              >
                Request Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-gray-600 hover:text-primary-500 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[60px] left-0 right-0 bg-white shadow-xl z-40 md:hidden border-t border-gray-100"
          >
            <div className="p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm font-bold py-2 ${location.pathname === link.href ? 'text-primary-500' : 'text-gray-600'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-100 flex gap-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-gray-50 rounded-lg text-gray-600">
                  <Search size={18} />
                  <span className="text-sm font-medium">Search</span>
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-primary-50 rounded-lg text-primary-600">
                  <ShoppingBag size={18} />
                  <span className="text-sm font-medium">Cart (0)</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
