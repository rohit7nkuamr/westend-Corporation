import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Heart, Package, CheckCircle } from 'lucide-react'

const About = () => {
  const features = [
    {
      icon: Award,
      title: 'Quality Certified',
      description: 'All products meet international quality standards'
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: 'Experienced professionals ensuring excellence'
    },
    {
      icon: TrendingUp,
      title: 'Growing Network',
      description: 'Expanding reach across markets'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Dedicated to customer satisfaction'
    }
  ]

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-primary-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-primary-600 font-semibold text-lg uppercase tracking-wider"
              >
                About Us
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                <span className="bg-gradient-to-r from-amber-600 via-primary-600 to-orange-600 bg-clip-text text-transparent">
                  Delivering Excellence
                </span>
                <br />
                <span className="text-gray-800">Since 2010</span>
              </h2>
            </div>

            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              Westend Corporation Pvt. Ltd. is a leading B2B exporter and supplier of premium food products, 
              established in 2010. Headquartered in Delhi's Okhla Industrial Area, we operate state-of-the-art 
              processing facilities that adhere to international quality and safety standards.
            </p>

            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Our vertically integrated supply chain, from farm to fork, ensures complete traceability and 
              quality control. We serve retailers, distributors, food service providers, and institutional 
              clients across multiple countries, delivering consistent quality and reliable service.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white" size={20} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Placeholder */}
              <div className="relative rounded-3xl p-8 h-96 flex items-center justify-center overflow-hidden border border-gray-100 bg-gradient-to-br from-slate-50 to-gray-100">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-amber-500 via-primary-500 to-orange-500 opacity-5"
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: 0.3,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl"
                  >
                    <Package className="text-white" size={64} strokeWidth={1.5} />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-2xl font-bold text-gray-800 mb-2"
                  >
                    Modern Infrastructure
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-600"
                  >
                    State-of-the-art processing & cold storage facilities
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 }}
                    className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500"
                  >
                    <CheckCircle className="text-emerald-600" size={16} />
                    <span>ISO Certified</span>
                  </motion.div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotate: -10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-sm text-gray-600">Years</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, rotate: 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="absolute -bottom-6 -right-6 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-gray-100"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  40+
                </div>
                <div className="text-sm text-gray-600">Products</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
