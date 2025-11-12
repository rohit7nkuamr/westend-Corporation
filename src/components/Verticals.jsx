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
      gradient: 'from-primary-500 to-primary-700',
      bgGradient: 'from-primary-50 to-amber-50',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
      products: ['Certified Organic Pulses', 'Premium Quality Grains', 'Authentic Spice Blends', 'Traditional Jaggery'],
      secondaryIcon: Leaf,
      buttonColor: 'bg-primary-600 hover:bg-primary-700 border-2 border-primary-500'
    },
    {
      icon: Snowflake,
      title: 'Frozen Vegetables',
      description: 'IQF (Individually Quick Frozen) vegetables processed at peak freshness using advanced cold chain technology to preserve nutrients',
      gradient: 'from-accent-600 to-accent-800',
      bgGradient: 'from-accent-50 to-emerald-50',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&h=400&fit=crop',
      products: ['IQF Cut Vegetables', 'Whole Frozen Vegetables', 'Ready-to-Cook Range', 'Exotic Varieties'],
      secondaryIcon: Package,
      buttonColor: 'bg-accent-700 hover:bg-accent-800 border-2 border-accent-600'
    },
    {
      icon: Box,
      title: 'Processed Foods',
      description: 'FSSAI certified processed foods manufactured in state-of-the-art facilities maintaining international hygiene standards',
      gradient: 'from-gray-700 to-gray-800',
      bgGradient: 'from-gray-50 to-neutral-50',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=400&fit=crop',
      products: ['Canned Vegetables', 'Ready-to-Eat Meals', 'Frozen Snacks', 'Dairy Products'],
      secondaryIcon: ShoppingBasket,
      buttonColor: 'bg-gray-700 hover:bg-gray-800 border-2 border-gray-600'
    },
  ]

  return (
    <section id="home" style={{ position: 'relative', zIndex: 1, marginTop: '64px' }}>
      {/* Hero Header with Background Image - Both Mobile & Desktop */}
      <div className="relative px-4 sm:px-6 lg:px-8 py-12 md:py-20 overflow-hidden" style={{ position: 'relative', minHeight: '300px' }}>
        {/* Background Image - Extends to edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
            alt="Fresh Food Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto text-center" style={{ zIndex: 1 }}>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-3" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
            Premium Food Products<br className="hidden md:block" />
          </h1>
          <p className="text-white text-sm md:text-lg max-w-3xl mx-auto mb-6" style={{ textShadow: '1px 1px 6px rgba(0,0,0,0.7)' }}>
          Supplier of quality groceries, frozen vegetables, and processed foods
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto max-w-full">
            <Link to="/contact" className="w-full sm:w-auto max-w-full">
              <button className="w-full sm:w-auto bg-primary-600 text-white px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base md:text-lg border-2 border-primary-500">
                Request Quote
              </button>
            </Link>
            <Link to="/products" className="w-full sm:w-auto max-w-full">
              <button className="w-full sm:w-auto bg-white text-primary-700 px-6 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary-50 transition-all text-sm sm:text-base md:text-lg shadow-lg border-2 border-white">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Verticals - Hero Section for Both Mobile & Desktop */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Our Product Categories</h2>
            <Link to="/products" className="text-sm md:text-base text-primary-700 font-semibold hover:text-primary-800">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {verticals.map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link to="/products">
                  <div className="bg-white rounded-2xl overflow-hidden border-2 border-primary-100 hover:border-primary-400 hover:shadow-xl transition-all duration-300">
                    {/* Product Image */}
                    <div className="relative h-48 md:h-56 overflow-hidden bg-gray-50">
                      <img 
                        src={vertical.image} 
                        alt={vertical.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Icon Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${vertical.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                          <vertical.icon className="text-white" size={28} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{vertical.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">{vertical.description}</p>
                      
                      {/* Product List */}
                      <div className="space-y-2 mb-6">
                        {vertical.products.slice(0, 3).map((product, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${vertical.gradient} mr-2`} />
                            {product}
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <button className={`w-full ${vertical.buttonColor} text-white py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg`}>
                        Request Quote
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br from-primary-50 via-amber-50 to-primary-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Need Custom Solutions?
          </h3>
          <p className="text-gray-700 mb-8 text-lg">
            We offer tailored product solutions for bulk orders and specific business requirements
          </p>
          <Link to="/contact">
            <button className="bg-primary-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 hover:shadow-xl transition-all duration-300 border-2 border-primary-500">
              Contact Us for Bulk Orders
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Verticals
