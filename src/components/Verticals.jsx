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
      secondaryIcon: Leaf,
      buttonColor: 'bg-primary-700 hover:bg-primary-800'
    },
    {
      icon: Snowflake,
      title: 'Frozen Vegetables',
      description: 'IQF (Individually Quick Frozen) vegetables processed at peak freshness using advanced cold chain technology to preserve nutrients',
      gradient: 'from-green-600 to-green-700',
      bgGradient: 'from-green-50 to-emerald-50',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&h=400&fit=crop',
      products: ['IQF Cut Vegetables', 'Whole Frozen Vegetables', 'Ready-to-Cook Range', 'Exotic Varieties'],
      secondaryIcon: Package,
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: Box,
      title: 'Processed Foods',
      description: 'FSSAI certified processed foods manufactured in state-of-the-art facilities maintaining international hygiene standards',
      gradient: 'from-neutral-600 to-neutral-700',
      bgGradient: 'from-neutral-50 to-gray-50',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=400&fit=crop',
      products: ['Canned Vegetables', 'Ready-to-Eat Meals', 'Frozen Snacks', 'Dairy Products'],
      secondaryIcon: ShoppingBasket,
      buttonColor: 'bg-neutral-700 hover:bg-neutral-800'
    },
  ]

  return (
    <section id="home" className="relative bg-white">
      {/* Mobile Hero Banner - Only on Mobile */}
      <div className="md:hidden relative h-64 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/80 to-primary-900/40 flex items-center px-6">
          <div className="text-white">
            <p className="text-sm font-medium mb-2 uppercase tracking-wider">Westend Corporation</p>
            <h1 className="text-3xl font-bold mb-2">Premium Food<br />Products</h1>
            <p className="text-sm mb-4 opacity-90">Quality groceries for global markets</p>
            <Link to="/products">
              <button className="bg-white text-primary-900 px-6 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-all">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Shop By Category - Mobile */}
      <div className="md:hidden px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Shop By Category</h2>
          <Link to="/products" className="text-sm text-primary-700 font-semibold">See All</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {verticals.map((vertical, index) => (
            <Link to="/products" key={index} className="flex-shrink-0">
              <div className="flex flex-col items-center gap-2">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${vertical.gradient} flex items-center justify-center shadow-md`}>
                  <vertical.icon className="text-white" size={28} strokeWidth={2} />
                </div>
                <p className="text-xs font-medium text-gray-700 text-center w-20">{vertical.title.split(' ')[0]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Products Section - Mobile Card Style */}
      <div className="px-4 py-6 md:hidden">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Our Products</h2>
          <Link to="/products" className="text-sm text-primary-700 font-semibold">See All</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {verticals.map((vertical, index) => (
            <Link to="/products" key={index}>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={vertical.image} 
                    alt={vertical.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Favorite Icon */}
                  <button className="absolute top-2 right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                </div>
                
                {/* Product Info */}
                <div className="p-3">
                  <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-1">{vertical.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-1">{vertical.products[0]}</p>
                  <div className="flex items-center justify-between">
                    <button className={`${vertical.buttonColor} text-white px-4 py-1.5 rounded-md text-xs font-semibold`}>
                      View
                    </button>
                    <div className="flex items-center gap-1">
                      <svg className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                      <span className="text-xs font-medium text-gray-700">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop View - Original 3 Column Layout */}
      <div className="hidden md:block py-24 px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-3 gap-8">
            {verticals.map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative h-full"
              >
                {/* Card */}
                <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-gray-100 flex flex-col h-full min-h-[550px]">
                  {/* Image Section */}
                  <div className="relative h-48 overflow-hidden flex-shrink-0">
                    <img 
                      src={vertical.image} 
                      alt={vertical.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    
                    {/* Icon Badge on Image */}
                    <div className="absolute top-4 left-4">
                      <div className={`w-16 h-16 bg-gradient-to-br ${vertical.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                        <vertical.icon className="text-white" size={24} strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="relative p-6 pb-6 flex-grow flex flex-col">
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">
                      {vertical.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-3 leading-relaxed text-sm line-clamp-2">
                      {vertical.description}
                    </p>

                    {/* Products List */}
                    <div className="space-y-1.5 mb-4">
                      {vertical.products.map((product, idx) => (
                        <div
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${vertical.gradient} mr-2 flex-shrink-0`} />
                          {product}
                        </div>
                      ))}
                    </div>

                    {/* Spacer */}
                    <div className="flex-grow"></div>

                    {/* Button - Always at bottom */}
                    <Link to="/products" className="mt-4">
                      <button
                        className={`w-full ${vertical.buttonColor} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 text-base`}
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
      </div>
    </section>
  )
}

export default Verticals
