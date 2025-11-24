import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, Package } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { getProducts, getVerticals } from '../services/api'
import OptimizedImage from '../components/OptimizedImage'

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  // Clear any persisted state on mount to ensure fresh defaults
  useEffect(() => {
    sessionStorage.removeItem('productsPageState');
  }, []);

  // Scroll to top on navigation to this page
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  // Fetch products and categories from Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [productsData, verticalsData] = await Promise.all([
          getProducts(),
          getVerticals()
        ])

        setProducts(productsData)

        // Build categories with counts
        const allCategories = [
          { name: 'All Products', count: productsData.length }
        ]
        verticalsData.forEach(vertical => {
          const count = productsData.filter(p => p.vertical === vertical.id).length
          allCategories.push({ name: vertical.title, count, id: vertical.id })
        })
        setCategories(allCategories)

        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.vertical_name === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination calculations
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Reset to page 1 when filters change – handled inline in handlers
  // Removed useEffect resetting page


  // Persist filter and pagination state to sessionStorage
  useEffect(() => {
    const state = {
      selectedCategory,
      searchQuery,
      currentPage,
    };
    sessionStorage.setItem('productsPageState', JSON.stringify(state));
  }, [selectedCategory, searchQuery, currentPage]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-primary-50">
        <div className="max-w-7xl mx-auto py-20 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-primary-50">
        <div className="max-w-7xl mx-auto py-20 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-3xl">!</span>
          </div>
          <p className="text-gray-600 text-lg mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  // Dummy data for reference (remove after backend is ready)
  const dummyProducts = [
    {
      id: 1,
      name: 'Organic Kabuli Chana',
      category: 'Groceries & Staples',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&h=500&fit=crop',
      badge: 'Organic',
      inStock: true,
      moq: 'MOQ: 100 kg',
      packaging: 'Bulk/Custom'
    },
    {
      id: 2,
      name: 'Frozen Diced Potato (IQF)',
      category: 'Frozen Vegetables',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&h=500&fit=crop',
      badge: 'IQF',
      inStock: true,
      moq: 'MOQ: 500 kg',
      packaging: 'Bulk/Custom'
    },
    {
      id: 3,
      name: 'Punjabi Jaggery Powder',
      category: 'Groceries & Staples',
      image: 'https://images.unsplash.com/photo-1599909533730-f9d7c4bc0c5d?w=500&h=500&fit=crop',
      badge: 'Traditional',
      inStock: true,
      moq: 'MOQ: 200 kg',
      packaging: 'Bulk/Custom'
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

  // Old filter logic removed - now using the one above that works with backend data

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
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Horizontal Category Chips */}
        <div className="mb-6 overflow-x-auto scrollbar-hide">
          <div className="flex gap-3 pb-2">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedCategory(category.name);
                  setCurrentPage(1);
                }}
                className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${selectedCategory === category.name
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredProducts.length}</span> results
            </p>
            <select className="border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
              <option>Sort by: Featured</option>
              <option>Newest First</option>
              <option>Name: A to Z</option>
              <option>Name: Z to A</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group"
              >
                <Link to={`/product/${product.slug}`}>
                  <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                    {/* Image Container */}
                    <div className="relative aspect-square bg-gray-100 overflow-hidden">
                      <OptimizedImage
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full"
                        aspectRatio="1/1"
                      />

                      {/* Badge */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                          {product.badge}
                        </span>
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
                      <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>

                      {/* B2B Info */}
                      {product.moq && (
                        <div className="flex items-center gap-1 mb-1">
                          <Package size={12} className="text-gray-500" />
                          <span className="text-xs text-gray-600">{product.moq}</span>
                        </div>
                      )}
                      {product.packaging && (
                        <p className="text-xs text-gray-500 mb-2">Packaging: {product.packaging}</p>
                      )}

                      {/* Request Quote Button */}
                      <div className="mt-2">
                        <Link to="/contact">
                          <button className="w-full bg-primary-600 text-white text-xs py-2 rounded-lg hover:bg-primary-700 transition-colors font-medium border border-primary-500">
                            Request Quote
                          </button>
                        </Link>
                      </div>

                      {/* Category Tag */}
                      <p className="text-xs text-gray-500 mt-2">{product.category}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                  Previous
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg transition-colors ${page === currentPage
                      ? 'bg-primary-600 text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border border-gray-300 rounded-lg transition-colors ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
                    }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage
