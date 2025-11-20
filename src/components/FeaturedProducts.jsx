import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getVerticals, getProductsByCategory } from '../services/api'
import { ShoppingBag, Star, Award, Tag, Utensils, Leaf, Snowflake, Package } from 'lucide-react'

const FeaturedProducts = () => {
  const [verticals, setVerticals] = useState([])
  const [productsByVertical, setProductsByVertical] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        // Fetch all verticals
        const verticalsData = await getVerticals()
        setVerticals(verticalsData)
        
        // Fetch products for each vertical
        const productsData = {}
        for (const vertical of verticalsData) {
          // Try to get featured products first
          const products = await getProductsByCategory(vertical.id, { featured: true })
          
          if (products && products.length > 0) {
            // Sort featured products by featured_order
            const sortedProducts = [...products].sort((a, b) => 
              (a.featured_order || 999) - (b.featured_order || 999)
            )
            // Get up to 4 featured products
            productsData[vertical.id] = sortedProducts.slice(0, 4)
          } else {
            // Fallback to regular products if no featured ones
            const regularProducts = await getProductsByCategory(vertical.id)
            productsData[vertical.id] = regularProducts.slice(0, 4)
          }
        }
        
        setProductsByVertical(productsData)
        setError(null)
      } catch (err) {
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Loading state
  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    )
  }

  // Icon mapping based on vertical name
  const getIconForVertical = (vertical) => {
    const name = vertical.title.toLowerCase();
    if (name.includes('groceries') || name.includes('staples')) return <Utensils className="text-white" size={24} />;
    if (name.includes('frozen') || name.includes('vegetables')) return <Snowflake className="text-white" size={24} />;
    if (name.includes('processed') || name.includes('foods')) return <Package className="text-white" size={24} />;
    
    // Default icon based on icon_name
    if (vertical.icon_name === 'Wheat') return <ShoppingBag className="text-white" size={24} />;
    if (vertical.icon_name === 'Snowflake') return <Snowflake className="text-white" size={24} />;
    if (vertical.icon_name === 'Box') return <Package className="text-white" size={24} />;
    if (vertical.icon_name === 'Leaf') return <Leaf className="text-white" size={24} />;
    
    // Default fallback
    return <ShoppingBag className="text-white" size={24} />;
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {verticals.map((vertical, index) => (
          <div key={vertical.id} className="mb-12">
            <div className="flex items-center mb-6">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                index === 0 ? 'from-orange-500 to-amber-600' :
                index === 1 ? 'from-blue-500 to-cyan-600' :
                'from-amber-500 to-yellow-600'
              } flex items-center justify-center mr-4`}>
                {getIconForVertical(vertical)}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 uppercase">{vertical.title}</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {productsByVertical[vertical.id]?.slice(0, 4).map((product) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`} 
                  className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative p-4 flex flex-col items-center">
                    {/* Product Image */}
                    <div className="w-full h-40 mb-3 flex items-center justify-center">
                      <img 
                        src={product.image || 'https://westendcorporation.in/media/products/placeholder.svg'} 
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                      {product.badge && (
                        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.badge}
                        </div>
                      )}
                    </div>
                    
                    {/* Product Name - Centered */}
                    <h3 className="text-center text-gray-800 font-medium text-sm line-clamp-2">
                      {product.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Category View All Link - Below Products */}
            <div className="mt-4 text-center">
              <Link 
                to={`/products?category=${vertical.id}`} 
                className={`inline-flex items-center text-sm font-medium ${
                  index === 0 ? 'text-orange-600 hover:text-orange-700' :
                  index === 1 ? 'text-blue-600 hover:text-blue-700' :
                  'text-amber-600 hover:text-amber-700'
                }`}
              >
                View all {vertical.title}
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts
