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
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-green-50">
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
              <span className="text-green-600 font-semibold text-lg">About Us</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
                  whileHover={{ scale: 1.05 }}
                  className="glass p-4 rounded-xl"
                >
                  <feature.icon className="text-green-600 mb-2" size={24} />
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
              <div className="glass rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden border border-gray-100 bg-gradient-to-br from-slate-50 to-gray-100">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-gradient-to-br from-green-600 via-blue-600 to-teal-600 opacity-5"
                />
                <div className="relative z-10 text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-green-600 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl">
                    <Package className="text-white" size={64} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Modern Infrastructure</h3>
                  <p className="text-gray-600">State-of-the-art processing & cold storage facilities</p>
                  <div className="mt-4 flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <CheckCircle className="text-green-600" size={16} />
                    <span>ISO Certified</span>
                  </div>
                </div>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute -top-6 -left-6 glass p-4 rounded-2xl"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-sm text-gray-600">Years</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 glass p-4 rounded-2xl"
              >
                <div className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
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
