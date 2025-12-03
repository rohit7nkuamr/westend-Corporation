import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const Certifications = () => {
  const [certifications, setCertifications] = useState([])
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

        {/* Seamless Circular Ribbon Animation for Certifications */}
        <div className="relative max-w-6xl mx-auto mb-12">
          {/* Gradient fade edges for seamless appearance */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden rounded-xl">
            <motion.div
              animate={{
                x: ['0%', '-50%']
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 7,
                  ease: "linear"
                }
              }}
              className="flex gap-6"
              style={{ willChange: 'transform' }}
            >
              {/* Double the tripled certifications for ultra-smooth seamless loop */}
              {[
                ...certifications,
                ...certifications,
                ...certifications,
                ...certifications,
                ...certifications,
                ...certifications
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (index % certifications.length) * 0.05 }}
                  className="flex-shrink-0"
                  style={{ width: '350px' }}
                >
                  <div className="bg-cream-100 rounded-xl p-8 md:p-10 text-center shadow-lg border border-primary-100 h-full hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="w-32 h-32 md:w-36 md:h-36 mx-auto mb-6 object-contain"
                    />
                    <h3 className="font-bold text-gray-900 mb-3 text-lg md:text-xl">{cert.title}</h3>
                    <p className="text-gray-600 leading-relaxed text-sm">{cert.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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
