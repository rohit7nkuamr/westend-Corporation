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
      <div className="relative px-4 sm:px-6 lg:px-8 py-4 md:py-12 overflow-hidden" style={{ position: 'relative', minHeight: '150px' }}>
        {/* Background Image - Extends to edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0 }}>
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop"
            alt="Fresh Food Background"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* Dark Overlay for Better Text Readability */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto text-center" style={{ zIndex: 1 }}>
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-white mb-1.5">
            Premium Food Products
          </h1>
          <p className="text-white text-xs md:text-sm max-w-2xl mx-auto mb-3">
          Supplier of quality groceries, frozen vegetables, and processed foods
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center w-full sm:w-auto max-w-full">
            <Link to="/contact" className="w-full sm:w-auto max-w-full">
              <button className="w-full sm:w-auto bg-primary-600 text-white px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:bg-primary-700 transition-all shadow-lg text-xs sm:text-sm border-2 border-primary-500">
                Request Quote
              </button>
            </Link>
            <Link to="/products" className="w-full sm:w-auto max-w-full">
              <button className="w-full sm:w-auto bg-white text-primary-700 px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-lg font-semibold hover:bg-primary-50 transition-all text-xs sm:text-sm shadow-lg border-2 border-white">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Verticals - Hero Section for Both Mobile & Desktop */}
      <div className="px-3 sm:px-6 lg:px-8 py-3 md:py-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <h2 className="text-sm md:text-lg font-bold text-gray-900">Our Product Categories</h2>
            <Link to="/products" className="text-xs md:text-sm text-primary-700 font-semibold hover:text-primary-800">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4 [&>*:nth-child(3)]:col-span-2 [&>*:nth-child(3)]:md:col-span-1 [&>*:nth-child(3)]:mx-auto [&>*:nth-child(3)]:max-w-[50%] [&>*:nth-child(3)]:md:max-w-none items-stretch">
            {verticals.map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link to="/products">
                  <div className="bg-white rounded-lg md:rounded-xl overflow-hidden border-2 border-primary-100 hover:border-primary-400 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    {/* Product Image */}
                    <div className="relative h-28 md:h-40 overflow-hidden bg-gray-50 flex-shrink-0">
                      <img 
                        src={vertical.image} 
                        alt={vertical.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Icon Badge */}
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <div className={`w-10 h-10 md:w-14 md:h-14 bg-gradient-to-br ${vertical.gradient} rounded-lg md:rounded-xl flex items-center justify-center shadow-lg`}>
                          <vertical.icon className="text-white" size={20} strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Info */}
                    <div className="p-2 md:p-4 flex flex-col flex-grow">
                      <h3 className="text-sm md:text-lg font-bold text-gray-900 mb-1.5 md:mb-2">{vertical.title}</h3>
                      <p className="text-gray-600 mb-2 md:mb-3 text-xs leading-snug line-clamp-2">{vertical.description}</p>
                      
                      {/* Product List */}
                      <div className="space-y-0.5 md:space-y-1 mb-2 md:mb-3 flex-grow">
                        {vertical.products.slice(0, 2).map((product, idx) => (
                          <div key={idx} className="flex items-start text-xs text-gray-600">
                            <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${vertical.gradient} mr-1.5 flex-shrink-0 mt-1`} />
                            <span className="line-clamp-1 leading-tight">{product}</span>
                          </div>
                        ))}
                        <div className="hidden md:block">
                          {vertical.products.slice(2, 3).map((product, idx) => (
                            <div key={idx} className="flex items-start text-xs text-gray-600">
                              <div className={`w-1 h-1 rounded-full bg-gradient-to-r ${vertical.gradient} mr-1.5 flex-shrink-0 mt-1`} />
                              <span className="line-clamp-1 leading-tight">{product}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* CTA Button */}
                      <button className="w-full bg-primary-500 hover:bg-primary-600 border border-primary-400 text-white py-1.5 md:py-2 rounded-md font-medium transition-all duration-300 hover:shadow-md text-xs md:text-sm mt-auto">
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
