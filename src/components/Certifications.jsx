import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Certifications = () => {
  const [certifications, setCertifications] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch certifications from API
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await fetch('https://westendcorporation.in/api/certifications/')
        const data = await response.json()
        setCertifications(data)
      } catch (err) {
        console.error('Error fetching certifications:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchCertifications()
  }, [])

  // Auto-play carousel
  useEffect(() => {
    if (certifications.length === 0) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % certifications.length)
    }, 4000) // Auto-slide every 4 seconds
    return () => clearInterval(interval)
  }, [certifications.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % certifications.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + certifications.length) % certifications.length)
  }

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  if (loading) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-500">Loading certifications...</p>
        </div>
      </section>
    )
  }

  if (certifications.length === 0) {
    return null // Don't show section if no certifications
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#059669 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Trust & Quality</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Certifications & Compliance
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-primary-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Committed to maintaining the highest standards of quality, safety, and sustainability
            through internationally recognized certifications.
          </p>
        </motion.div>

        {/* Unified Carousel for Both Mobile & Desktop */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {certifications.map((cert, index) => (
                <div
                  key={cert.id}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-cream-100 rounded-xl p-8 md:p-12 text-center shadow-lg border border-primary-100">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-6 object-contain"
                    />
                    <h3 className="font-bold text-gray-900 mb-3 text-xl md:text-2xl">{cert.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{cert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all z-10 border border-gray-200"
            aria-label="Previous certification"
          >
            <ChevronLeft className="text-gray-700" size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white hover:bg-gray-50 p-3 rounded-full shadow-lg transition-all z-10 border border-gray-200"
            aria-label="Next certification"
          >
            <ChevronRight className="text-gray-700" size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {certifications.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all ${index === currentIndex
                    ? 'bg-accent-500 w-8'
                    : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                aria-label={`Go to certification ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-accent-500 to-accent-600 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
            {[
              { value: '15+', label: 'Years of Excellence' },
              { value: '500+', label: 'Happy Clients' },
              { value: '40+', label: 'Product Range' },
              { value: '10+', label: 'Countries Served' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90 text-xs md:text-base font-medium tracking-wide uppercase">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications
