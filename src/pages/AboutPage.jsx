import React from 'react'
import { motion } from 'framer-motion'
import { Award, Users, TrendingUp, Heart, Package, CheckCircle, Target, Globe, Shield, Leaf } from 'lucide-react'

const AboutPage = () => {
  const stats = [
    { number: '15+', label: 'Years in Business', icon: Award },
    { number: '500+', label: 'Happy Clients', icon: Users },
    { number: '40+', label: 'Product Range', icon: Package },
    { number: '100%', label: 'Quality Assured', icon: CheckCircle },
  ]

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To provide premium quality food products that meet international standards while supporting sustainable farming practices and local communities.'
    },
    {
      icon: Globe,
      title: 'Our Vision',
      description: 'To become a leading global supplier of organic and processed food products, recognized for quality, reliability, and customer satisfaction.'
    },
    {
      icon: Heart,
      title: 'Our Values',
      description: 'Integrity, Quality, Sustainability, and Customer-Centricity drive everything we do. We believe in building long-term partnerships based on trust.'
    }
  ]

  const milestones = [
    { year: '2010', event: 'Company Founded', description: 'Started operations in Okhla, Delhi' },
    { year: '2013', event: 'ISO Certification', description: 'Achieved ISO 22000 certification' },
    { year: '2016', event: 'Organic Certified', description: 'Received USDA Organic certification' },
    { year: '2019', event: 'Export Expansion', description: 'Expanded to 15+ countries' },
    { year: '2023', event: 'Modern Facility', description: 'Opened state-of-the-art processing unit' },
    { year: '2024', event: 'US Subsidiary - Chicago', description: 'Opened a subsidiary in Chicago, USA to better serve our North American customers and partners.' },
  ]

  const team = [
    {
      name: 'Leadership Team',
      description: 'Experienced professionals with 20+ years in food industry',
      icon: Users
    },
    {
      name: 'Quality Control',
      description: 'Dedicated team ensuring product excellence',
      icon: Shield
    },
    {
      name: 'Sustainability',
      description: 'Committed to eco-friendly practices',
      icon: Leaf
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">About Westend Corporation</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Leading the way in premium food products since 2010, serving businesses worldwide with excellence and integrity
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <stat.icon className="mx-auto mb-3 text-primary-700" size={32} />
              <h3 className="text-3xl font-bold text-primary-900 mb-1">{stat.number}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Company Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary-900 mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Founded in 2010, Westend Corporation Pvt. Ltd. began with a simple mission: to provide
                premium quality food products to businesses worldwide. What started as a small operation
                in Delhi's Okhla Industrial Area has grown into a trusted name in the B2B food supply industry.
              </p>
              <p>
                Our journey has been marked by continuous innovation, unwavering commitment to quality,
                and a deep respect for sustainable practices. We work directly with certified organic farms
                and maintain state-of-the-art processing facilities that adhere to international standards.
              </p>
              <p>
                Today, we serve over 500 clients across 15+ countries, offering a comprehensive range of
                groceries, frozen vegetables, and processed foods. Our success is built on the trust of
                our partners and the dedication of our team.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-primary-100 to-blue-100 rounded-2xl p-8 h-full flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={40} />
                </div>
                <p className="text-4xl font-bold text-primary-900 mb-2">15+</p>
                <p className="text-gray-700 font-medium">Years of Excellence</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mission, Vision, Values */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-primary-900 mb-12"
          >
            Our Mission, Vision & Values
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                  <value.icon className="text-primary-700" size={32} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center text-primary-900 mb-12"
        >
          Our Journey
        </motion.h2>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary-200 hidden md:block" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-xl p-6 shadow-md">
                    <span className="text-accent-600 font-bold text-lg">{milestone.year}</span>
                    <h3 className="text-xl font-bold text-gray-900 mt-2">{milestone.event}</h3>
                    <p className="text-gray-600 mt-2">{milestone.description}</p>
                  </div>
                </div>

                <div className="w-4 h-4 bg-primary-700 rounded-full border-4 border-white shadow-lg z-10 hidden md:block" />

                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-primary-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-primary-900 mb-12"
          >
            Our Team
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-20 h-20 bg-primary-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <member.icon className="text-white" size={36} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary-900 to-primary-700 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Ready to Partner With Us?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join hundreds of satisfied clients worldwide
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 transition-all"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
