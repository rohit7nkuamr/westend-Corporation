import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Truck, Leaf, CheckCircle, Clock, Star } from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Multi-stage quality control with HACCP and ISO 22000 compliance ensuring product excellence',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'Direct partnerships with certified organic farms ensuring traceability and sustainability',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: Truck,
      title: 'Global Logistics',
      description: 'Temperature-controlled supply chain with real-time tracking for international deliveries',
      color: 'from-orange-600 to-orange-700'
    },
    {
      icon: CheckCircle,
      title: 'Regulatory Compliance',
      description: 'Full compliance with FSSAI, FDA, and international food safety regulations',
      color: 'from-purple-600 to-purple-700'
    },
    {
      icon: Clock,
      title: 'Advanced Processing',
      description: 'IQF technology and modern processing ensuring maximum nutrient retention',
      color: 'from-teal-600 to-teal-700'
    },
    {
      icon: Star,
      title: 'Industry Experience',
      description: '15+ years serving B2B clients with consistent quality and reliability',
      color: 'from-indigo-600 to-indigo-700'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 opacity-50" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose Us
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your trusted partner for quality food products with unmatched service
          </p>
        </motion.div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 h-full relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}
                >
                  <reason.icon className="text-white" size={28} strokeWidth={2} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {reason.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${reason.color} rounded-full opacity-5`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16"
        >
          <div className="glass rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Animated Background */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 opacity-10"
            />

            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                Ready to Partner With Us?
              </h3>
              <p className="text-gray-600 mb-8 text-lg max-w-2xl mx-auto">
                Join hundreds of satisfied clients who trust us for their food product needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300"
                >
                  Get Started
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="glass px-8 py-4 rounded-full text-lg font-semibold text-gray-800 hover:shadow-xl transition-all duration-300"
                >
                  View Catalog
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WhyChooseUs
