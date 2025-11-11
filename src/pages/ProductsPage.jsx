import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, Star, Heart, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { name: 'All Products', count: 42 },
    { name: 'Groceries & Staples', count: 16 },
    { name: 'Frozen Vegetables', count: 14 },
    { name: 'Processed Foods', count: 12 },
    { name: 'Organic Range', count: 8 },
    { name: 'Spices & Masala', count: 6 },
  ]

  const products = [
    {
      id: 1,
      name: 'Organic Kabuli Chana',
      category: 'Groceries & Staples',
      price: '₹120/kg',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 124,
      badge: 'Organic',
      inStock: true,
      discount: '15% OFF'
    },
    {
      id: 2,
      name: 'Frozen Diced Potato (IQF)',
      category: 'Frozen Vegetables',
      price: '₹85/kg',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 89,
      badge: 'IQF',
      inStock: true,
      discount: null
    },
    {
      id: 3,
      name: 'Punjabi Jaggery Powder',
      category: 'Groceries & Staples',
      price: '₹95/kg',
      image: 'https://images.unsplash.com/photo-1599909533730-f9d7c4bc0c5d?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 156,
      badge: 'Traditional',
      inStock: true,
      discount: '10% OFF'
    },
    {
      id: 4,
      name: 'Frozen Green Peas',
      category: 'Frozen Vegetables',
      price: '₹75/kg',
      image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 203,
      badge: 'Fresh',
      inStock: true,
      discount: null
    },
    {
      id: 5,
      name: 'Tikka Masala Powder',
      category: 'Spices & Masala',
      price: '₹180/kg',
      image: 'https://images.unsplash.com/photo-1596040033229-a0b3b9b82f4c?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 178,
      badge: 'Authentic',
      inStock: true,
      discount: '20% OFF'
    },
    {
      id: 6,
      name: 'Canned Sweet Corn Kernels',
      category: 'Processed Foods',
      price: '₹65/can',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 92,
      badge: 'Canned',
      inStock: true,
      discount: null
    },
    {
      id: 7,
      name: 'Organic Masoor Dal',
      category: 'Organic Range',
      price: '₹140/kg',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 145,
      badge: 'Certified',
      inStock: true,
      discount: '15% OFF'
    },
    {
      id: 8,
      name: 'Frozen Baby Okra',
      category: 'Frozen Vegetables',
      price: '₹95/kg',
      image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 67,
      badge: 'Premium',
      inStock: false,
      discount: null
    },
    {
      id: 9,
      name: 'Biryani Masala Blend',
      category: 'Spices & Masala',
      price: '₹200/kg',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&h=500&fit=crop',
      rating: 4.9,
      reviews: 234,
      badge: 'Best Seller',
      inStock: true,
      discount: '25% OFF'
    },
    {
      id: 10,
      name: 'Frozen Aloo Paratha',
      category: 'Processed Foods',
      price: '₹12/piece',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&h=500&fit=crop',
      rating: 4.8,
      reviews: 189,
      badge: 'Ready-to-Eat',
      inStock: true,
      discount: null
    },
    {
      id: 11,
      name: 'Organic Whole Moong Beans',
      category: 'Organic Range',
      price: '₹130/kg',
      image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=500&h=500&fit=crop',
      rating: 4.7,
      reviews: 112,
      badge: 'Organic',
      inStock: true,
      discount: '10% OFF'
    },
    {
      id: 12,
      name: 'Frozen Diced Capsicum',
      category: 'Frozen Vegetables',
      price: '₹110/kg',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=500&h=500&fit=crop',
      rating: 4.6,
      reviews: 78,
      badge: 'IQF',
      inStock: true,
      discount: null
    },
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Page Header */}
      <div className="bg-primary-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
            <p className="text-xl text-green-100">Discover our premium range of food products</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            
            {/* Filter Button */}
            <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <SlidersHorizontal size={20} />
              <span className="font-medium">Filters</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="mr-2" size={20} />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm ${
                      selectedCategory === category.name
                        ? 'bg-primary-700 text-white font-medium'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.name}</span>
                      <span className={`text-xs ${
                        selectedCategory === category.name ? 'text-green-100' : 'text-gray-500'
                      }`}>
                        ({category.count})
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <Link
                  to="/contact"
                  className="block w-full bg-accent-600 text-white text-center py-3 rounded-lg font-medium hover:bg-accent-700 hover:shadow-lg transition-all"
                >
                  Bulk Order Inquiry
                </Link>
              </div>
            </div>
          </div>

          {/* Products Grid - Amazon Style */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredProducts.length}</span> results
              </p>
              <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-4 gap-3">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="group"
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                      {/* Image Container */}
                      <div className="relative aspect-square bg-gray-100 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        
                        {/* Badges */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1">
                          {product.discount && (
                            <span className="bg-accent-600 text-white text-xs font-bold px-2 py-1 rounded">
                              {product.discount}
                            </span>
                          )}
                          <span className="bg-primary-700 text-white text-xs font-semibold px-2 py-1 rounded">
                            {product.badge}
                          </span>
                        </div>

                        {/* Quick Actions */}
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition-colors">
                            <Heart size={16} className="text-gray-700" />
                          </button>
                          <button className="bg-white p-2 rounded-full shadow-md hover:bg-green-50 transition-colors">
                            <Eye size={16} className="text-gray-700" />
                          </button>
                        </div>

                        {/* Stock Status */}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">({product.reviews})</span>
                        </div>

                        {/* Contact for Price */}
                        <div className="mt-2">
                          <button className="w-full bg-primary-700 text-white text-xs py-2 rounded hover:bg-primary-800 transition-colors font-medium">
                            Request Quote
                          </button>
                        </div>

                        {/* Category Tag */}
                        <p className="text-xs text-gray-500 mt-1">{product.category}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Previous
                </button>
                {[1, 2, 3, 4].map((page) => (
                  <button
                    key={page}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      page === 1
                        ? 'bg-green-500 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
