import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles, Wheat, Snowflake, Box, Leaf, Package, ShoppingBasket } from 'lucide-react'
import { Link } from 'react-router-dom'

const Hero = () => {
  const verticals = [
    {
      icon: Wheat,
      title: 'Groceries & Staples',
      description: 'Certified organic pulses, premium grains, authentic spice blends',
      gradient: 'from-primary-600 to-primary-700',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop',
      buttonColor: 'bg-primary-700 hover:bg-primary-800'
    },
    {
      icon: Snowflake,
      title: 'Frozen Vegetables',
      description: 'IQF vegetables processed at peak freshness',
      gradient: 'from-green-600 to-green-700',
      image: 'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=600&h=400&fit=crop',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: Box,
      title: 'Processed Foods',
      description: 'FSSAI certified processed foods',
      gradient: 'from-neutral-600 to-neutral-700',
      image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=600&h=400&fit=crop',
      buttonColor: 'bg-neutral-700 hover:bg-neutral-800'
    },
  ]

  return (
    <>
      {/* Wholesale Banner */}
      <div className="bg-amber-500 text-white py-2 text-center font-bold relative z-50">
        <div className="container mx-auto flex items-center justify-center">
          <Sparkles className="mr-2" size={18} />
          <span className="uppercase tracking-wider">Wholesale Supplier - Bulk Orders Only</span>
          <Sparkles className="ml-2" size={18} />
        </div>
      </div>
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        {/* Background Image - Using Unsplash food/agriculture image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2000&auto=format&fit=crop')`,
          }}
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/75 to-gray-900/85" />
        
        {/* Subtle animated gradient overlay */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-blue-600/20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center mb-6"
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-green-400 mr-3" />
          <span className="text-green-400 font-medium text-sm tracking-wider uppercase">Established 2010</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-green-400 ml-3" />
        </motion.div>
        
        {/* Wholesale Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <div className="inline-flex items-center px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full shadow-xl border-2 border-white/20">
            <Sparkles size={20} className="text-white mr-3" />
            <span className="text-white font-bold text-lg uppercase tracking-wider">WHOLESALE ONLY</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="text-white drop-shadow-lg">Wholesale Food Products</span>
          <br />
          <span className="text-accent-400 drop-shadow-lg">
            Exporter from India
          </span>
        </motion.h1>

        {/* Hero subtitle for trust: visible on mobile & desktop */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mb-6"
        >
          <span className="inline-flex items-center justify-center text-lg md:text-2xl text-amber-200 font-semibold">
            <span className="mr-2 text-sm md:text-base">🇮🇳</span>
            Premium Food Products — Exporter from India
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto leading-relaxed drop-shadow-md"
        >
          Leading wholesale supplier and exporter of quality groceries, frozen vegetables, and processed foods.
          Serving businesses worldwide with bulk quantities, competitive pricing, and reliable delivery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/products"
            className="group bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-800 hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center"
          >
            Wholesale Product Range
            <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" size={20} />
          </Link>
          <Link
            to="/contact"
            className="bg-accent-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-accent-700 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Request Quote
          </Link>
        </motion.div>

        {/* Product Verticals Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {verticals.map((vertical, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-white/20">
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={vertical.image} 
                    alt={vertical.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Icon Badge on Image */}
                  <div className="absolute top-4 left-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${vertical.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                      <vertical.icon className="text-white" size={28} strokeWidth={2} />
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="relative p-6">
                  {/* Wholesale Tag */}
                  <div className="absolute -top-3 right-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    WHOLESALE
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {vertical.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                    {vertical.description}
                  </p>

                  {/* Button */}
                  <Link to="/products">
                    <button
                      className={`w-full ${vertical.buttonColor} text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300`}
                    >
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/80 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
    </>
  )
}

export default Hero
