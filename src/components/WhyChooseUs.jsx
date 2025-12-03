import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Truck, Leaf, CheckCircle, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Multi-stage quality control with HACCP and ISO 22000 compliance',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'Direct partnerships with certified organic farms',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Truck,
      title: 'Global Logistics',
      description: 'Temperature-controlled supply chain with real-time tracking',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Regulatory Compliance',
      description: 'Full compliance with FSSAI, FDA, and international regulations',
      color: 'from-accent-500 to-accent-600'
    },
    {
      icon: Clock,
      title: 'Advanced Processing',
      description: 'IQF technology ensuring maximum nutrient retention',
      color: 'from-forest-500 to-forest-600'
    },
    {
      icon: Star,
      title: 'Industry Experience',
      description: '15+ years serving B2B clients worldwide',
      color: 'from-primary-500 to-primary-600'
    }
  ]

  // Triple for ultra-smooth infinite scroll (no visible seam)
  const tripledReasons = [...reasons, ...reasons, ...reasons]

  return (
    <section id="why-choose-us" className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-br from-cream-50 via-white to-primary-50">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Advantage</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-accent-500 to-primary-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for quality food products with unmatched service and reliability.
          </p>
        </motion.div>

        {/* Why Choose Us Cards - Seamless Circular Ribbon Animation */}
        <div className="relative mb-16">
          {/* Gradient fade edges for seamless appearance */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-cream-50 via-cream-50/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-cream-50 via-cream-50/80 to-transparent z-10 pointer-events-none"></div>

          <div className="overflow-hidden">
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
              {/* Double the tripled array for ultra-smooth seamless loop */}
              {[...tripledReasons, ...tripledReasons].map((reason, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className={`w-14 h-14 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <reason.icon className="text-white" size={28} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {reason.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Mobile: Horizontal scroll (user can swipe) */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4 pb-4">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 bg-white rounded-2xl p-5 shadow-lg border border-gray-100"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-3 shadow-md`}>
                  <reason.icon className="text-white" size={24} strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {reason.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative"
        >
          <div className="bg-gradient-to-br from-white to-cream-50 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-2xl border border-primary-100">
            {/* Subtle Animated Background */}
            <motion.div
              animate={{
                opacity: [0.03, 0.06, 0.03],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-br from-accent-400 via-primary-400 to-accent-400"
            />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 font-serif">
                Ready to Partner With Us?
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                Join hundreds of satisfied clients who trust us for their food product needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-accent-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-accent-600 shadow-lg hover:shadow-accent-500/30 transition-all duration-300 min-w-[200px]"
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:border-accent-500 hover:text-accent-600 transition-all duration-300 min-w-[200px]"
                  >
                    View Catalog
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
