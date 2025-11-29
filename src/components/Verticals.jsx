import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBasket, Snowflake, Package, Wheat, Leaf, Box, ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getVerticals } from '../services/api'

const Verticals = () => {
  const scrollContainerRef = useRef(null)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  const [verticals, setVerticals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Keyboard navigation for horizontal scroll
  const handleKeyDown = (e) => {
    if (scrollContainerRef.current) {
      if (e.key === 'ArrowRight') {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' })
      }
      if (e.key === 'ArrowLeft') {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' })
      }
    }
  }

  // Auto-rotate slides - always active for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 4000) // Change slide every 4 seconds
    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 3)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 3) % 3)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  // Touch handlers for swipe gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }

    // Reset
    setTouchStart(0)
    setTouchEnd(0)
  }

  // Icon mapping for backend data
  const iconMap = {
    'Wheat': Wheat,
    'Snowflake': Snowflake,
    'Box': Box,
    'Leaf': Leaf,
    'Package': Package,
    'ShoppingBasket': ShoppingBasket
  }

  // Color schemes for each vertical
  const colorSchemes = [
    {
      name: 'Groceries & Staples',
      gradient: 'from-orange-500 to-amber-600',
      button_color: 'from-orange-500 to-amber-600',
      text_color: 'text-amber-400',
      hover_color: 'group-hover:text-amber-400',
      icon_bg: 'bg-orange-500'
    },
    {
      name: 'Frozen Vegetables',
      gradient: 'from-blue-500 to-cyan-600',
      button_color: 'from-blue-500 to-cyan-600',
      text_color: 'text-blue-400',
      hover_color: 'group-hover:text-blue-400',
      icon_bg: 'bg-blue-500'
    },
    {
      name: 'Processed Foods',
      gradient: 'from-amber-500 to-yellow-600',
      button_color: 'from-amber-500 to-yellow-600',
      text_color: 'text-amber-400',
      hover_color: 'group-hover:text-amber-400',
      icon_bg: 'bg-amber-500'
    }
  ];

  // Fetch verticals from Django backend
  useEffect(() => {
    const fetchVerticals = async () => {
      try {
        setLoading(true)
        const data = await getVerticals()
        // Map icon names to actual icon components and add color schemes
        const mappedData = data.map((vertical, index) => {
          // Find matching color scheme by name or use index as fallback
          const colorScheme = colorSchemes.find(cs => cs.name === vertical.title) || colorSchemes[index % colorSchemes.length];

          return {
            ...vertical,
            icon: iconMap[vertical.icon_name] || Wheat,
            secondaryIcon: iconMap[vertical.secondary_icon_name] || Leaf,
            gradient: colorScheme.gradient,
            button_color: colorScheme.button_color,
            text_color: colorScheme.text_color,
            hover_color: colorScheme.hover_color,
            icon_bg: colorScheme.icon_bg
          };
        })
        setVerticals(mappedData)
        setError(null)
      } catch (err) {
        console.error('Error fetching verticals:', err)
        setError('Failed to load categories. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchVerticals()
  }, [])

  // Error state
  if (error) {
    return (
      <section id="home" style={{ position: 'relative', zIndex: 1, marginTop: '64px' }}>
        <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-amber-900/20 via-gray-900 to-emerald-900/20 flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-500 text-3xl">!</span>
            </div>
            <p className="text-white text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    )
  }

  // No data state
  if (!verticals || verticals.length === 0) {
    return (
      <section id="home" style={{ position: 'relative', zIndex: 1, marginTop: '64px' }}>
        <div className="relative h-[calc(100vh-64px)] overflow-hidden bg-gradient-to-br from-amber-900/20 via-gray-900 to-emerald-900/20 flex items-center justify-center">
          <div className="text-center px-4">
            <p className="text-white text-lg">No categories available</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="home" style={{ position: 'relative', zIndex: 1, marginTop: '64px' }}>
      {/* Mobile: Full-Screen Slider | Desktop: All 3 Verticals Visible */}
      <div className="relative h-[calc(100vh-64px)] overflow-hidden">

        {/* MOBILE VIEW - Slider */}
        <div
          className="md:hidden relative h-full bg-black"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = Math.abs(offset.x) * velocity.x
                if (swipe < -500) {
                  nextSlide()
                } else if (swipe > 500) {
                  prevSlide()
                }
              }}
              className="absolute inset-0"
            >
              {/* Background Image */}
              <div className="absolute inset-0 bg-black">
                <motion.img
                  src={verticals[currentSlide].image}
                  alt={verticals[currentSlide].title}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.1 }}
                  transition={{
                    duration: 4,
                    ease: "linear"
                  }}
                />
                {/* Dark Overlay - Lighter for better image visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.3,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 200
                    }}
                    className={`w-20 h-20 mx-auto bg-gradient-to-br ${verticals[currentSlide].gradient} rounded-2xl flex items-center justify-center shadow-2xl mb-6`}
                  >
                    {React.createElement(verticals[currentSlide].icon, {
                      className: "text-white",
                      size: 40,
                      strokeWidth: 2
                    })}
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-primary-400 text-sm font-semibold tracking-widest uppercase mb-4"
                  >
                    Premium Quality
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-3xl font-bold text-white mb-4"
                    style={{ fontFamily: 'serif' }}
                  >
                    {verticals[currentSlide].title}
                  </motion.h1>

                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className={`w-24 h-1 bg-gradient-to-r ${verticals[currentSlide].gradient} mx-auto mb-4`}
                  />

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="text-gray-300 text-sm max-w-2xl mx-auto mb-6 leading-relaxed"
                  >
                    {verticals[currentSlide].description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Link to="/products">
                      <button className={`bg-transparent border-2 border-${verticals[currentSlide].icon_bg} ${verticals[currentSlide].text_color} px-8 py-3 rounded-full font-semibold hover:bg-gradient-to-r hover:${verticals[currentSlide].gradient} hover:text-white hover:border-transparent transition-all duration-300 text-sm tracking-wider uppercase`}>
                        Explore Collection
                      </button>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Mobile Navigation */}
          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10" aria-label="Previous">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-3 rounded-full transition-all z-10" aria-label="Next">
            <ChevronRight size={20} />
          </button>

          {/* Mobile Dots with Progress */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
            <div className="flex gap-3 mb-2">
              {verticals.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className="relative"
                  aria-label={`Slide ${index + 1}`}
                >
                  <div className={`transition-all duration-300 rounded-full ${index === currentSlide ? `bg-gradient-to-r ${verticals[index].gradient} w-8 h-3` : 'bg-white/40 hover:bg-white/60 w-3 h-3'
                    }`} />
                  {/* Progress bar for active slide */}
                  {index === currentSlide && (
                    <motion.div
                      className={`absolute top-0 left-0 h-3 bg-gradient-to-r ${verticals[index].gradient} rounded-full opacity-70`}
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 4, ease: "linear" }}
                    />
                  )}
                </button>
              ))}
            </div>
            {/* Auto-play indicator */}
            <p className="text-white/60 text-xs text-center">Auto-playing</p>
          </div>
        </div>

        {/* DESKTOP VIEW - All 3 Verticals with Glowing Boxes */}
        <div className="hidden md:flex h-full items-center justify-center px-8 lg:px-12 bg-gradient-to-br from-amber-900/20 via-gray-900 to-emerald-900/20">
          <div className="max-w-7xl w-full grid grid-cols-3 gap-6 lg:gap-8">
            {verticals.map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <Link to="/products">
                  {/* Glowing Background Effect */}
                  <div className={`absolute -inset-1 bg-gradient-to-r ${vertical.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-60 transition-all duration-500`} />

                  {/* Card */}
                  <div className="relative bg-gradient-to-br from-gray-800/30 to-gray-900/40 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-gray-700/50 hover:border-primary-500/50 transition-all duration-500 h-full flex flex-col overflow-hidden">
                    {/* Background Image with Overlay */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden">
                      <img
                        src={vertical.image}
                        alt={vertical.title}
                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/60 to-gray-900/75" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex flex-col h-full">
                      {/* Icon */}
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="mb-4"
                      >
                        <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${vertical.gradient} rounded-xl flex items-center justify-center shadow-2xl group-hover:shadow-primary-500/50 transition-all duration-500`}>
                          {React.createElement(vertical.icon, {
                            className: "text-white",
                            size: 36,
                            strokeWidth: 2.5
                          })}
                        </div>
                      </motion.div>

                      {/* Title */}
                      <h2 className={`text-2xl lg:text-3xl font-bold text-white mb-3 ${vertical.hover_color} transition-colors duration-300`} style={{ fontFamily: 'serif' }}>
                        {vertical.title}
                      </h2>

                      {/* Divider */}
                      <div className={`w-16 h-1 bg-gradient-to-r ${vertical.gradient} mb-4 group-hover:w-24 transition-all duration-500`} />

                      {/* Description */}
                      <p className="text-gray-300 text-sm lg:text-base leading-relaxed mb-6 flex-grow">
                        {vertical.description}
                      </p>

                      {/* Products List */}
                      <div className="space-y-2 mb-6">
                        {vertical.products.slice(0, 3).map((product, idx) => (
                          <div key={idx} className="flex items-start text-sm text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${vertical.gradient} mr-2 flex-shrink-0 mt-1.5`} />
                            <span className="line-clamp-1 group-hover:text-gray-300 transition-colors duration-300">{product.name}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <button className={`w-full bg-gradient-to-r ${vertical.button_color} text-white py-3 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 text-sm uppercase tracking-wider hover:scale-105`}>
                        {vertical.button_text}
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-primary-50 via-amber-50 to-primary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Need Custom Solutions?
          </h3>
          <p className="text-gray-700 mb-8 text-lg">
            We offer tailored product solutions for bulk orders and specific business requirements
          </p>
          <Link to="/contact">
            <button className="bg-primary-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 hover:shadow-xl transition-all duration-300 border-2 border-primary-500">
              Contact Us for Bulk Orders
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Verticals