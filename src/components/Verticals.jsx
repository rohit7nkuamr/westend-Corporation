import React from 'react'
import { motion } from 'framer-motion'
import { ShoppingBasket, Snowflake, Package, Wheat, Leaf, Box } from 'lucide-react'
import { Link } from 'react-router-dom'

const Verticals = () => {
  const verticals = [
    {
      icon: Wheat,
      title: 'Groceries & Staples',
      description: 'Certified organic pulses, premium grains, authentic spice blends, and traditional jaggery products sourced from trusted farms',
      gradient: 'from-primary-600 to-primary-700',
      bgGradient: 'from-primary-50 to-blue-50',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
      products: ['Certified Organic Pulses', 'Premium Quality Grains', 'Authentic Spice Blends', 'Traditional Jaggery'],
      secondaryIcon: Leaf
    },
    {
      icon: Snowflake,
      title: 'Frozen Vegetables',
      description: 'IQF (Individually Quick Frozen) vegetables processed at peak freshness using advanced cold chain technology to preserve nutrients',
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-emerald-50',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&h=400&fit=crop',
      products: ['IQF Cut Vegetables', 'Whole Frozen Vegetables', 'Ready-to-Cook Range', 'Exotic Varieties'],
      secondaryIcon: Package
    },
    {
      icon: Box,
      title: 'Processed Foods',
      description: 'FSSAI certified processed foods manufactured in state-of-the-art facilities maintaining international hygiene standards',
      gradient: 'from-neutral-600 to-neutral-700',
      bgGradient: 'from-neutral-50 to-gray-50',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=400&fit=crop',
      products: ['Canned Vegetables', 'Ready-to-Eat Meals', 'Frozen Snacks', 'Dairy Products'],
      secondaryIcon: ShoppingBasket
    },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-3 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Verticals Grid - HERO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {verticals.map((vertical, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full bg-white rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100">
                {/* Image Section */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img 
                    src={vertical.image} 
                    alt={vertical.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Icon Badge on Image */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${vertical.gradient} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`}>
                      <vertical.icon className="text-white" size={24} strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-4 sm:p-6">
                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">
                    {vertical.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm">
                    {vertical.description}
                  </p>

                  {/* Products List */}
                  <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                    {vertical.products.map((product, idx) => (
                      <div
                        key={idx}
                        className="flex items-center text-xs sm:text-sm text-gray-600"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${vertical.gradient} mr-2 flex-shrink-0`} />
                        {product}
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <Link to="/products">
                    <button
                      className={`w-full ${vertical.buttonColor} text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-sm sm:text-base`}
                    >
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-white rounded-2xl p-8 md:p-12 max-w-4xl mx-auto shadow-lg border border-gray-100">
            <h3 className="text-3xl font-bold mb-4 text-primary-900">
              Need Custom Solutions?
            </h3>
            <p className="text-gray-700 mb-6 text-lg">
              We offer tailored product solutions for bulk orders and specific requirements
            </p>
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 hover:shadow-2xl transition-all duration-300"
              >
                Request a Quote
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Verticals
