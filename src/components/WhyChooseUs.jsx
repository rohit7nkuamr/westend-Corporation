import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Truck, Leaf, CheckCircle, Clock, Star } from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Multi-stage quality control with HACCP and ISO 22000 compliance ensuring product excellence',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Leaf,
      title: 'Sustainable Sourcing',
      description: 'Direct partnerships with certified organic farms ensuring traceability and sustainability',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Truck,
      title: 'Global Logistics',
      description: 'Temperature-controlled supply chain with real-time tracking for international deliveries',
      color: 'from-slate-500 to-blue-600'
    },
    {
      icon: CheckCircle,
      title: 'Regulatory Compliance',
      description: 'Full compliance with FSSAI, FDA, and international food safety regulations',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Clock,
      title: 'Advanced Processing',
      description: 'IQF technology and modern processing ensuring maximum nutrient retention',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: Star,
      title: 'Industry Experience',
      description: '15+ years serving B2B clients with consistent quality and reliability',
      color: 'from-slate-500 to-blue-600'
    }
  ]

  return (
    <section id="why-choose-us" className="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-primary-50/50" />
      
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
            <span className="bg-gradient-to-r from-amber-600 via-primary-600 to-orange-600 bg-clip-text text-transparent">
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
              whileHover={{ y: -10 }}
              className="group relative"
            >
              {/* Glowing Background Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${reason.color} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500`} />
              
              <div className="relative bg-white rounded-2xl p-8 h-full overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100">
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`w-16 h-16 bg-gradient-to-br ${reason.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                >
                  <reason.icon className="text-white" size={28} strokeWidth={2} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {reason.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${reason.color} rounded-full opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
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
              className="absolute inset-0 bg-gradient-to-br from-amber-400 via-primary-400 to-orange-400 opacity-10"
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
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl transition-all duration-300"
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
