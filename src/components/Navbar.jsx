import React, { useState, useEffect } from 'react'
import { Menu, X, Search, Settings, ShoppingBag, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { getVerticals } from '../services/api'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProductsHovered, setIsProductsHovered] = useState(false)
  const [categories, setCategories] = useState([])
  const location = useLocation()

  // Fetch categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const verticalsData = await getVerticals()
        setCategories(verticalsData)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'HOME', to: '/', hasDropdown: false },
    { name: 'PRODUCTS', to: '/products', hasDropdown: true },
    { name: 'ABOUT', to: '/about', hasDropdown: false },
    { name: 'CONTACT', to: '/contact', hasDropdown: false },
  ]

  return (
    <>
      {/* Blue Top Banner Ribbon */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-primary-700 text-white py-2 shadow-md">
        <p className="text-xs md:text-sm font-medium tracking-wide text-right md:text-center px-4">
          Indian Exporter to the World – Premium Quality Food Products
        </p>
      </div>

      {/* Main Navigation */}
      <nav
        className={`fixed top-8 left-0 right-0 z-40 transition-all duration-300 ${isScrolled
          ? 'bg-white shadow-lg py-1'
          : 'bg-transparent py-4'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo with Company Name */}
            <Link to="/" className="flex items-center gap-2 md:gap-3 group">
              <Logo className={`w-auto object-contain transition-all duration-300 ${isScrolled ? 'h-10 md:h-12' : 'h-12 md:h-16'}`} />
              <span className={`hidden sm:block font-bold text-base md:text-lg tracking-wide transition-all duration-300 ${isScrolled
                ? 'text-gray-800'
                : 'text-white'
                }`}
                style={!isScrolled ? { textShadow: '0 2px 4px rgba(0,0,0,0.5)' } : {}}
              >
                WESTEND CORPORATION
              </span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setIsProductsHovered(true)}
                  onMouseLeave={() => link.hasDropdown && setIsProductsHovered(false)}
                >
                  <Link
                    to={link.to}
                    className={`text-sm font-bold tracking-wide transition-all duration-300 relative group flex items-center gap-1 ${isScrolled
                      ? (location.pathname === link.to ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600')
                      : 'text-white hover:text-white/90'
                      }`}
                    style={!isScrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.5)' } : {}}
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={16} className={`transition-transform ${isProductsHovered ? 'rotate-180' : ''}`} />}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${isScrolled ? 'bg-primary-600' : 'bg-white'} ${location.pathname === link.to ? 'w-full' : ''}`}></span>
                  </Link>

                  {/* Products Dropdown */}
                  {link.hasDropdown && isProductsHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100"
                    >
                      <div className="py-2">
                        <Link
                          to="/products"
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors font-medium"
                        >
                          All Products
                        </Link>
                        <div className="border-t border-gray-100 my-1"></div>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/products?category=${encodeURIComponent(category.title)}`}
                            className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-600 transition-colors"
                          >
                            {category.title}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Icons */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://wa.me/919311933481"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2 font-medium transition-colors ${isScrolled
                  ? 'text-green-600 hover:text-green-700'
                  : 'text-white hover:text-white/90'
                  }`}
                style={!isScrolled ? { textShadow: '0 1px 2px rgba(0,0,0,0.5)' } : {}}
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>
              <Link
                to="/contact"
                className={`px-4 py-2 rounded-lg font-medium transition-all ${isScrolled
                  ? 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                  : 'bg-white text-primary-600 hover:bg-gray-100'
                  }`}
              >
                Request Quote
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-3">
              <a
                href="https://wa.me/919311933481"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center p-2 rounded-full transition-colors ${isScrolled
                  ? 'text-green-600 bg-green-50'
                  : 'text-white bg-white/10'
                  }`}
                aria-label="Contact on WhatsApp"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden transition-colors text-gray-600 hover:text-primary-600"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
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
            className="fixed top-16 left-0 right-0 bg-white shadow-xl z-40 md:hidden border-t border-gray-100"
          >
            <div className="p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-sm font-bold py-2 ${location.pathname === link.to ? 'text-primary-500' : 'text-gray-600'
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
