import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Truck, Leaf, CheckCircle, Clock, Star } from 'lucide-react'
import { Link } from 'react-router-dom'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Multi-stage quality control with HACCP and ISO 22000 compliance ensuring product excellence',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'Direct partnerships with certified organic farms ensuring traceability and sustainability',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Truck,
      title: 'Global Logistics',
      description: 'Temperature-controlled supply chain with real-time tracking for international deliveries',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Regulatory Compliance',
      description: 'Full compliance with FSSAI, FDA, and international food safety regulations',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Clock,
      title: 'Advanced Processing',
      description: 'IQF technology and modern processing ensuring maximum nutrient retention',
      color: 'from-primary-500 to-primary-600'
    },
    {
      icon: Star,
      title: 'Industry Experience',
      description: '15+ years serving B2B clients with consistent quality and reliability',
      color: 'from-blue-500 to-blue-600'
    }
  ]

  return (
    <section id="why-choose-us" className="py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gray-50">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Our Advantage</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">
            Why Choose Us
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-primary-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Your trusted partner for quality food products with unmatched service and reliability.
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 hover:border-primary-100"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <reason.icon className="text-white" size={32} strokeWidth={1.5} />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">
                {reason.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative"
        >
          <div className="bg-white rounded-3xl p-12 text-center relative overflow-hidden shadow-2xl border border-gray-100">
            {/* Subtle Animated Background - Pulse instead of Rotate */}
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
              className="absolute inset-0 bg-gradient-to-br from-amber-400 via-primary-400 to-orange-400"
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
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-primary-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary-700 shadow-lg hover:shadow-primary-500/30 transition-all duration-300 min-w-[200px]"
                  >
                    Get Started
                  </motion.button>
                </Link>
                <Link to="/products">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white text-gray-800 border-2 border-gray-200 px-8 py-4 rounded-xl text-lg font-semibold hover:border-primary-500 hover:text-primary-600 transition-all duration-300 min-w-[200px]"
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
