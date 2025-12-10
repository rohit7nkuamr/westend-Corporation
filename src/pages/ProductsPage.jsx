import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, SlidersHorizontal, Package, Grid3x3, List } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { getProducts, getVerticals } from '../services/api'
import OptimizedImage from '../components/OptimizedImage'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductSidebar from '../components/ProductSidebar'


const ProductsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'catalog'
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;

  // Scroll to top on navigation to this page
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

        // Set category from URL after categories are loaded
        if (categoryFromUrl) {
          const matchingCategory = allCategories.find(cat => cat.name === categoryFromUrl)
          if (matchingCategory) {
            setSelectedCategory(categoryFromUrl)
          }
        }

        setError(null)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load products. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [categoryFromUrl]) // Re-run when URL category changes

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.vertical_title === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products based on selected sort order
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'featured':
        return (a.featured_order || 999) - (b.featured_order || 999)
      case 'newest':
        // Assuming created_at exists, fallback to id for newer products
        return new Date(b.created_at || 0) - new Date(a.created_at || 0) || b.id - a.id
      case 'name-asc':
        return a.name.localeCompare(b.name)
      case 'name-desc':
        return b.name.localeCompare(a.name)
      default:
        return 0
    }
  })

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage)
  const indexOfLastProduct = currentPage * productsPerPage
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct)

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-primary-50">
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
      <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-primary-50">
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-primary-900 text-white py-12 pt-28">
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

      {/* Breadcrumbs */}
      <Breadcrumbs />

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
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1">
            <ProductSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Right Side - Products */}
          <div className="lg:col-span-3">


            {/* Product Display - Grid or Catalog */}
            {currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <Package className="mx-auto text-gray-400 mb-4" size={64} />
                <p className="text-gray-600 text-lg">No products found</p>
                <p className="text-gray-500 text-sm mt-2">Try adjusting your filters or search query</p>
              </div>
            ) : viewMode === 'catalog' ? (
              /* Catalog Table View */
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden md:table-cell">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">MOQ</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden lg:table-cell">Packaging</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider hidden sm:table-cell">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {currentProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <Link to={`/product/${product.slug}`} className="flex items-center gap-3 group">
                              <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded overflow-hidden">
                                <OptimizedImage
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full"
                                  aspectRatio="1/1"
                                />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900 group-hover:text-primary-600 transition-colors">
                                  {product.name}
                                </p>
                                {product.badge && (
                                  <span className="inline-block mt-1 bg-primary-100 text-primary-700 text-xs px-2 py-0.5 rounded">
                                    {product.badge}
                                  </span>
                                )}
                              </div>
                            </Link>
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 hidden md:table-cell">
                            {product.vertical_title}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">
                            {product.moq || '—'}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-600 hidden lg:table-cell">
                            {product.packaging || '—'}
                          </td>
                          <td className="px-4 py-4 hidden sm:table-cell">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${product.stock_status === 'in_stock'
                              ? 'bg-green-100 text-green-800'
                              : product.stock_status === 'low_stock'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                              }`}>
                              {product.stock_status === 'in_stock' ? '✓ In Stock' :
                                product.stock_status === 'low_stock' ? '⚠ Low Stock' :
                                  '✗ Out of Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              /* Grid View */
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
                          {product.badge && (
                            <div className="absolute top-2 left-2">
                              <span className="bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          {/* Stock Status */}
                          {product.stock_status === 'out_of_stock' && (
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
                          <p className="text-xs text-gray-500 mt-2">{product.vertical_title}</p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

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
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                    // Show first page, last page, current page, and 2 pages around current
                    let pageNum;
                    if (totalPages <= 7) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 6 + i;
                    } else {
                      pageNum = currentPage - 3 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors ${pageNum === currentPage
                          ? 'bg-primary-600 text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                          }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
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
          </div> {/* End Right Side Products */}
        </div> {/* End Main Grid */}
      </div> {/* End Container */}
    </div>
  );
};

export default ProductsPage;
