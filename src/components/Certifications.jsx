import React from 'react'
import { motion } from 'framer-motion'
import { Award, Shield, CheckCircle2, FileCheck, Globe, TrendingUp } from 'lucide-react'

const Certifications = () => {
  const certifications = [
    {
      icon: Shield,
      title: 'FSSAI Certified',
      description: 'Food Safety and Standards Authority of India',
      color: 'from-amber-500 to-amber-600'
    },
    {
      icon: Award,
      title: 'ISO 22000:2018',
      description: 'Food Safety Management System',
      color: 'from-primary-600 to-primary-700'
    },
    {
      icon: FileCheck,
      title: 'HACCP Certified',
      description: 'Hazard Analysis Critical Control Points',
      color: 'from-emerald-600 to-emerald-700'
    },
    {
      icon: Globe,
      title: 'Export Certified',
      description: 'International Quality Standards',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: CheckCircle2,
      title: 'Organic Certified',
      description: 'USDA & India Organic Standards',
      color: 'from-primary-500 to-emerald-600'
    },
    {
      icon: TrendingUp,
      title: 'GMP Compliant',
      description: 'Good Manufacturing Practices',
      color: 'from-amber-600 to-orange-600'
    }
  ]

  const stats = [
    { value: '15+', label: 'Years of Excellence', suffix: '' },
    { value: '500', label: 'Happy Clients', suffix: '+' },
    { value: '40', label: 'Product Range', suffix: '+' },
    { value: '10', label: 'Countries Served', suffix: '+' }
  ]

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
          className="text-center mb-20"
        >
          <span className="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">Trust & Quality</span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 font-serif">
            Certifications & Compliance
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-primary-600 mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Committed to maintaining the highest standards of quality, safety, and sustainability
            through internationally recognized certifications.
          </p>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-xl p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 border border-gray-100 hover:border-primary-100"
            >
              <div className="flex items-start space-x-5">
                <div className={`w-16 h-16 bg-gradient-to-br ${cert.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <cert.icon className="text-white" size={32} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
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
          className="bg-primary-900 rounded-3xl p-12 relative overflow-hidden shadow-2xl"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-primary-800 rounded-full opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-primary-800 rounded-full opacity-50 blur-3xl"></div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-serif">
                  {stat.value}<span className="text-amber-400">{stat.suffix}</span>
                </div>
                <div className="text-primary-200 text-sm md:text-base font-medium tracking-wide uppercase">
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
