import React from 'react'
import { motion } from 'framer-motion'
import { Award, Shield, CheckCircle2, FileCheck, Globe, TrendingUp } from 'lucide-react'

const Certifications = () => {
  const certifications = [
    {
      icon: Shield,
      title: 'FSSAI Certified',
      description: 'Food Safety and Standards Authority of India',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: Award,
      title: 'ISO 22000:2018',
      description: 'Food Safety Management System',
      color: 'from-green-600 to-green-700'
    },
    {
      icon: FileCheck,
      title: 'HACCP Certified',
      description: 'Hazard Analysis Critical Control Points',
      color: 'from-purple-600 to-purple-700'
    },
    {
      icon: Globe,
      title: 'Export Certified',
      description: 'International Quality Standards',
      color: 'from-teal-600 to-teal-700'
    },
    {
      icon: CheckCircle2,
      title: 'Organic Certified',
      description: 'USDA & India Organic Standards',
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      icon: TrendingUp,
      title: 'GMP Compliant',
      description: 'Good Manufacturing Practices',
      color: 'from-orange-600 to-orange-700'
    }
  ]

  const stats = [
    { value: '15+', label: 'Years of Excellence', suffix: '' },
    { value: '500', label: 'Happy Clients', suffix: '+' },
    { value: '40', label: 'Product Range', suffix: '+' },
    { value: '10', label: 'Countries Served', suffix: '+' }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Certifications & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Committed to maintaining the highest standards of quality, safety, and sustainability 
            through internationally recognized certifications
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-start space-x-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${cert.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <cert.icon className="text-white" size={28} strokeWidth={2} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {cert.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-gray-400 text-sm md:text-base font-medium">
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
