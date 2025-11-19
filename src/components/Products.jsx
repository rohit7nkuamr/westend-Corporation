import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ChevronDown, Star, ShoppingCart } from 'lucide-react'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [viewMode, setViewMode] = useState('grid')
  const [searchQuery, setSearchQuery] = useState('')

  const categories = [
    { name: 'All Products', count: 42, icon: '🛒' },
    { name: 'Groceries', count: 16, icon: '🌾' },
    { name: 'Frozen Vegetables', count: 14, icon: '❄️' },
    { name: 'Processed Foods', count: 12, icon: '📦' },
    { name: 'Organic Range', count: 8, icon: '🌱' },
    { name: 'Spices & Masala', count: 6, icon: '🌶️' },
  ]

  const products = [
    {
      id: 1,
      name: 'Organic Kabuli Chana',
      category: 'Groceries',
      price: 'Bulk Pricing',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 124,
      badge: 'Organic',
      description: 'Premium quality organic chickpeas'
    },
    {
      id: 2,
      name: 'Frozen Diced Potato',
      category: 'Frozen Vegetables',
      price: 'Contact for Quote',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 89,
      badge: 'IQF',
      description: 'Individually quick frozen potato cubes'
    },
    {
      id: 3,
      name: 'Punjabi Jaggery Powder',
      category: 'Groceries',
      price: 'Bulk Available',
      image: 'https://images.unsplash.com/photo-1599909533730-f9d7c4bc0c5d?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 156,
      badge: 'Traditional',
      description: 'Pure traditional jaggery powder'
    },
    {
      id: 4,
      name: 'Frozen Green Peas',
      category: 'Frozen Vegetables',
      price: 'Request Quote',
      image: 'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 203,
      badge: 'Fresh',
      description: 'Farm fresh frozen green peas'
    },
    {
      id: 5,
      name: 'Tikka Masala Powder',
      category: 'Spices & Masala',
      price: 'Bulk Orders',
      image: 'https://images.unsplash.com/photo-1596040033229-a0b3b9b82f4c?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 178,
      badge: 'Authentic',
      description: 'Authentic Indian spice blend'
    },
    {
      id: 6,
      name: 'Canned Sweet Corn',
      category: 'Processed Foods',
      price: 'Wholesale',
      image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 92,
      badge: 'Canned',
      description: 'Premium quality canned corn kernels'
    },
    {
      id: 7,
      name: 'Organic Masoor Dal',
      category: 'Organic Range',
      price: 'Contact Us',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 145,
      badge: 'Certified',
      description: 'USDA certified organic red lentils'
    },
    {
      id: 8,
      name: 'Frozen Baby Okra',
      category: 'Frozen Vegetables',
      price: 'Bulk Pricing',
      image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 67,
      badge: 'Premium',
      description: 'Tender frozen baby okra'
    },
    {
      id: 9,
      name: 'Biryani Masala',
      category: 'Spices & Masala',
      price: 'Request Quote',
      image: 'https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=400&h=400&fit=crop',
      rating: 4.9,
      reviews: 234,
      badge: 'Best Seller',
      description: 'Premium biryani spice mix'
    },
    {
      id: 10,
      name: 'Frozen Aloo Paratha',
      category: 'Processed Foods',
      price: 'Wholesale',
      image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=400&fit=crop',
      rating: 4.8,
      reviews: 189,
      badge: 'Ready-to-Eat',
      description: 'Authentic frozen stuffed paratha'
    },
    {
      id: 11,
      name: 'Organic Moong Beans',
      category: 'Organic Range',
      price: 'Bulk Available',
      image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=400&h=400&fit=crop',
      rating: 4.7,
      reviews: 112,
      badge: 'Organic',
      description: 'Whole green moong beans'
    },
    {
      id: 12,
      name: 'Frozen Capsicum',
      category: 'Frozen Vegetables',
      price: 'Contact for Quote',
      image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop',
      rating: 4.6,
      reviews: 78,
      badge: 'IQF',
      description: 'Diced frozen bell peppers'
    },
  ]

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="products-page" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Product Range
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive selection of premium food products for your business needs
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 w-full md:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <Grid size={20} className={viewMode === 'grid' ? 'text-green-600' : 'text-gray-600'} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-white shadow-md' : 'hover:bg-gray-200'
                }`}
              >
                <List size={20} className={viewMode === 'list' ? 'text-green-600' : 'text-gray-600'} />
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Filter className="mr-2" size={20} />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ x: 5 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all ${
                      selectedCategory === category.name
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-xl mr-3">{category.icon}</span>
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <span className={`text-sm ${
                        selectedCategory === category.name ? 'text-white' : 'text-gray-500'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">Need Help?</h4>
                <a
                  href="#contact"
                  className="block w-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-center py-3 rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Request Catalog
                </a>
              </div>
            </div>
          </motion.div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> products
              </p>
            </div>

            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    </div>
                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-green-500 hover:text-white transition-all">
                        View Details
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-green-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3">{product.description}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <p className="text-sm text-gray-500">Pricing</p>
                        <p className="font-bold text-green-600">{product.price}</p>
                      </div>
                      <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-3 rounded-xl hover:shadow-lg transition-all">
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Load More */}
            {filteredProducts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all border border-gray-200">
                  Load More Products
                </button>
              </motion.div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Products
