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
    <section id="home" className="relative bg-white pt-20">
      {/* Hero Header - Both Mobile & Desktop */}
      <div className="px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gradient-to-br from-primary-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-primary-700 font-semibold text-sm md:text-base mb-3 uppercase tracking-wider">Westend Corporation • B2B Food Supplier</p>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Premium Food Products<br className="hidden md:block" />
          </h1>
          <p className="text-gray-600 text-base md:text-xl max-w-3xl mx-auto mb-6">
            Supplier of quality groceries, frozen vegetables, and processed foods
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link to="/contact">
              <button className="bg-accent-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-accent-700 transition-all shadow-md">
                Request Quote
              </button>
            </Link>
            <Link to="/products">
              <button className="bg-white border-2 border-primary-700 text-primary-700 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-all">
                View Products
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Product Verticals - Hero Section for Both Mobile & Desktop */}
      <div className="px-4 sm:px-6 lg:px-8 py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Product Categories</h2>
            <Link to="/products" className="text-sm md:text-base text-primary-700 font-semibold hover:text-primary-800">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {verticals.map((vertical, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Link to="/products">
                  <div className="bg-white rounded-2xl overflow-hidden border-2 border-gray-100 hover:border-primary-500 hover:shadow-xl transition-all duration-300">
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden bg-gray-50">
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
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
            Need Custom Solutions?
          </h3>
          <p className="text-gray-600 mb-8 text-lg">
            We offer tailored product solutions for bulk orders and specific business requirements
          </p>
          <Link to="/contact">
            <button className="bg-accent-600 text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 hover:shadow-xl transition-all duration-300">
              Contact Us for Bulk Orders
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Verticals
