import React, { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, Share2, ShoppingCart, Check, Truck, Shield, ArrowLeft, AlertTriangle, Loader } from 'lucide-react'
import { getProductBySlug, getProductsByCategory } from '../services/api'
import SEO, { getProductSchema, getBreadcrumbSchema, getFAQSchema } from '../components/SEO'

// Helper function to generate smart keywords from product name
const generateSmartKeywords = (product) => {
  const baseKeywords = []

  // 1. Extract individual words from product name
  const nameWords = product.name.toLowerCase().split(' ').filter(word => word.length > 2)
  baseKeywords.push(...nameWords)

  // 2. Add variations and common misspellings (COMPREHENSIVE LIST)
  const variations = {
    // Rice & Grains
    'khichdi': ['khichadi', 'khichri', 'kitchdi', 'khichari', 'ready to eat meal', 'instant meal', 'rice dish'],
    'rice': ['basmati', 'rice grains', 'chawal'],
    'atta': ['flour', 'wheat flour', 'aata', 'whole wheat flour'],
    'maida': ['all purpose flour', 'refined flour', 'white flour'],
    'sooji': ['semolina', 'rava', 'suji'],
    'poha': ['flattened rice', 'beaten rice', 'chura'],
    'vermicelli': ['sevai', 'seviyan', 'semiya', 'noodles'],

    // Pulses & Lentils
    'dal': ['daal', 'lentils', 'pulses', 'dhal'],
    'chana': ['chickpeas', 'gram', 'chole', 'garbanzo beans', 'bengal gram'],
    'moong': ['mung', 'green gram', 'mung beans', 'green lentils'],
    'urad': ['black lentils', 'black gram', 'urad dal', 'black beans'],
    'masoor': ['red lentils', 'masur', 'pink lentils'],
    'toor': ['arhar', 'pigeon peas', 'tur dal', 'yellow lentils'],
    'rajma': ['kidney beans', 'red beans'],
    'kabuli': ['white chickpeas', 'kabuli chana'],

    // Spices & Masala
    'masala': ['spices', 'spice mix', 'masalas', 'seasoning'],
    'turmeric': ['haldi', 'turmeric powder', 'yellow spice'],
    'chilli': ['chili', 'red chilli', 'mirch', 'hot pepper'],
    'coriander': ['dhania', 'cilantro', 'coriander powder'],
    'cumin': ['jeera', 'cumin seeds', 'zeera'],
    'garam': ['garam masala', 'spice blend'],
    'tikka': ['tikka masala', 'tandoori'],
    'biryani': ['biriyani', 'biryani masala'],
    'curry': ['curry powder', 'curry masala'],

    // Tea & Beverages
    'tea': ['chai', 'tea leaves', 'black tea', 'tea powder'],
    'coffee': ['instant coffee', 'coffee powder', 'kapi'],

    // Pickles & Preserves
    'achar': ['pickle', 'pickles', 'aachaar', 'preserved vegetables'],
    'pickle': ['achar', 'preserved', 'pickled'],
    'murabba': ['preserve', 'sweet preserve', 'fruit preserve'],
    'chutney': ['sauce', 'condiment', 'chatni'],

    // Ready to Eat
    'instant': ['ready to eat', 'RTE', 'instant food'],
    'ready': ['instant', 'RTE', 'ready to cook', 'RTC'],
    'mix': ['mixture', 'blend', 'powder mix'],
    'paratha': ['flatbread', 'stuffed bread', 'indian bread'],

    // Vegetables
    'aloo': ['potato', 'potatoes', 'batata'],
    'peas': ['green peas', 'matar'],
    'potato': ['aloo', 'potatoes'],
    'okra': ['bhindi', 'ladies finger'],
    'corn': ['maize', 'sweet corn', 'makka'],

    // Oils & Ghee
    'ghee': ['clarified butter', 'pure ghee', 'desi ghee'],
    'oil': ['cooking oil', 'edible oil'],

    // Sweets & Snacks
    'jaggery': ['gur', 'gud', 'unrefined sugar', 'natural sweetener'],
    'sugar': ['shakkar', 'khand'],
    'sev': ['namkeen', 'savory snack'],
    'namkeen': ['snacks', 'savory snacks', 'mixture'],
    'rewari': ['sesame brittle', 'til ki gajak'],

    // General Terms
    'organic': ['natural', 'chemical free', 'pesticide free'],
    'whole': ['sabut', 'unpolished', 'whole grain'],
    'split': ['dhuli', 'polished'],
    'frozen': ['IQF', 'individually quick frozen', 'deep frozen'],
    'diced': ['cubed', 'chopped'],
    'powder': ['ground', 'powdered', 'fine'],

    // Common Misspellings
    'vegetable': ['vegitable', 'vegtable', 'veg'],
    'chicken': ['chiken', 'chickin'],
    'butter': ['buter', 'buttar']
  }

  // 3. Add variations for matched words
  nameWords.forEach(word => {
    if (variations[word]) {
      baseKeywords.push(...variations[word])
    }
  })

  // 4. Generate combinations (brand + word, word + exporter, etc.)
  const smartKeywords = [
    product.name, // Full name
    ...nameWords, // Individual words
    ...baseKeywords, // Variations
    `${product.brand} ${product.name}`,
    `Westend ${product.name}`,
    ...nameWords.map(word => `${word} exporter`),
    ...nameWords.map(word => `${word} supplier`),
    ...nameWords.map(word => `buy ${word} bulk`),
    ...nameWords.map(word => `${word} wholesale`),
    ...nameWords.map(word => `organic ${word}`),
    product.vertical_name,
    `${product.vertical_name} exporter`,
    'food exporters',
    'food exports',
    'worldwide food exporter'
  ]

  return [...new Set(smartKeywords)].join(', ') // Remove duplicates
}


const ProductDetail = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true)
        setError(null)
        setSelectedImage(0) // Reset selected image when product changes

        // Scroll to top when navigating to a new product
        window.scrollTo({ top: 0, behavior: 'smooth' })

        // Fetch product with Slug
        const productData = await getProductBySlug(slug)
        // Process product data

        // Create an array of images from the product data
        const productImages = [
          productData.image || 'https://westendcorporation.in/media/products/placeholder.svg'
        ];

        // Add additional images if they exist
        if (productData.image_2) {
          productImages.push(productData.image_2);
        }

        if (productData.image_3) {
          productImages.push(productData.image_3);
        }

        // If we still have fewer than 3 images, add placeholders
        while (productImages.length < 3) {
          productImages.push('https://westendcorporation.in/media/products/placeholder.svg');
        }

        // Get features from the API or use default features
        const productFeatures = productData.features_list && productData.features_list.length > 0
          ? productData.features_list
          : [
            '100% Certified Organic',
            'USDA & India Organic Certified',
            'No Pesticides or Chemicals',
            'High Protein Content',
            'Rich in Dietary Fiber',
            'Naturally Gluten-Free',
            'Farm Fresh Quality',
            'Vacuum Packed for Freshness'
          ];

        // Create specifications object from API data
        const specifications = {
          'Product Type': productData.vertical_name || 'Organic Product',
          'Packaging': productData.packaging || 'Standard Packaging',
          'Shelf Life': productData.shelf_life || '12 Months',
          'Storage': productData.storage || 'Cool & Dry Place',
          'Origin': productData.origin || 'India',
          'Certifications': productData.certifications || 'FSSAI, Organic India',
          'Minimum Order': productData.moq || '25 kg',
          'Bulk Pricing': 'Available for larger quantities'
        };

        // Enhance product with processed data
        const enhancedProduct = {
          ...productData,
          images: productImages,
          features: productFeatures,
          specifications: specifications,
          brand: productData.brand || productData.vertical_name || 'Westend Organic',
        }

        setProduct(enhancedProduct)

        // Fetch related products from the same vertical
        if (productData.vertical) {
          // Fetch related products
          const relatedData = await getProductsByCategory(productData.vertical)
          // Process related products

          // Filter out the current product and limit to 4 items
          const filtered = relatedData
            .filter(item => item.slug !== productData.slug) // Use slug for comparison
            .slice(0, 4)
          setRelatedProducts(filtered)
        }
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to load product details. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
  }, [slug])

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-10 w-10 text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested product could not be found or has been removed.'}</p>
          <button
            onClick={() => navigate('/products')}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28">
      {/* SEO Meta Tags and Structured Data */}
      <SEO
        title={`${product.name} - International Exporter to USA, Canada & Worldwide | Westend Corporation`}
        description={`Premium ${product.name} exporter from India to USA, Canada & worldwide markets. ${product.moq ? `MOQ: ${product.moq}.` : 'Bulk export orders.'} FSSAI certified. ${product.packaging ? `Packaging: ${product.packaging}.` : 'Export-quality packaging.'} Contact for competitive international pricing.`}
        keywords={generateSmartKeywords(product)}
        ogImage={product.image}
        ogType="product"
        canonical={`https://westendcorporation.in/product/${product.slug}`}
        structuredData={[
          getProductSchema(product),
          getBreadcrumbSchema([
            { name: 'Home', url: 'https://westendcorporation.in/' },
            { name: 'Products', url: 'https://westendcorporation.in/products' },
            { name: product.name, url: `https://westendcorporation.in/product/${product.slug}` }
          ]),
          getFAQSchema(product)
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-green-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/products" className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 mb-6">
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden mb-4">
                <img
                  src={product.images && product.images[selectedImage] || product.image || 'https://westendcorporation.in/media/products/placeholder.svg'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://westendcorporation.in/media/products/placeholder.svg';
                  }}
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-3">
                {Array.isArray(product.images) && product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${selectedImage === index ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    <img
                      src={image || product.image || 'https://westendcorporation.in/media/products/placeholder.svg'}
                      alt={`${product.name} - View ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://westendcorporation.in/media/products/placeholder.svg';
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Title */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="text-sm text-green-600 font-medium">{product.brand}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                </div>
                <div className="flex gap-2 relative">
                  <button
                    onClick={async () => {
                      const shareData = {
                        title: product.name,
                        text: `Check out ${product.name} from Westend Corporation - Premium Bulk Exporter`,
                        url: window.location.href
                      };

                      try {
                        if (navigator.share) {
                          await navigator.share(shareData);
                        } else {
                          await navigator.clipboard.writeText(window.location.href);
                          // Simple alert fallback since we don't have a toast component yet
                          alert('Link copied to clipboard!');
                        }
                      } catch (err) {
                        console.error('Error sharing:', err);
                      }
                    }}
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 hover:text-primary-600 transition-colors"
                    title="Share Product"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Info */}
            <div className="bg-primary-50 rounded-xl p-6 border-2 border-primary-200">
              <h3 className="text-xl font-bold text-primary-900 mb-2">Bulk Order Pricing</h3>
              <p className="text-gray-600 mb-4">
                Competitive wholesale pricing available. Contact us for volume-based quotes and custom packaging options.
              </p>
              <div className="flex gap-3">
                <Link to="/contact" className="flex-1">
                  <button className="w-full bg-accent-500 text-white py-3 rounded-lg font-semibold hover:bg-accent-600 transition-colors shadow-lg">
                    Request Quote
                  </button>
                </Link>
                <button className="flex-1 border-2 border-accent-500 text-accent-600 py-3 rounded-lg font-semibold hover:bg-accent-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock_status === 'in_stock' && (
                <>
                  <Check className="text-green-500" size={20} />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              )}
              {product.stock_status === 'out_of_stock' && (
                <>
                  <AlertTriangle className="text-red-500" size={20} />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
              {product.stock_status === 'low_stock' && (
                <>
                  <AlertTriangle className="text-amber-500" size={20} />
                  <span className="text-amber-600 font-medium">Low Stock</span>
                </>
              )}
              {product.stock_status === 'coming_soon' && (
                <>
                  <Truck className="text-blue-500" size={20} />
                  <span className="text-blue-600 font-medium">Coming Soon</span>
                </>
              )}
            </div>

            {/* Quantity and CTA */}
            <div className="space-y-4">
              {/* Minimum Order Info */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-2">Bulk Order Information</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Minimum Order Quantity (MOQ): <span className="font-medium text-gray-900">{product.moq || 'Contact for details'}</span></p>
                  <p>• Packaging: <span className="font-medium text-gray-900">{product.packaging || 'Standard Bulk Packaging'}</span></p>
                  <p>• Origin: <span className="font-medium text-gray-900">{product.origin || 'India'}</span></p>
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  to={`/contact?product=${encodeURIComponent(product.name)}`}
                  className="w-full bg-accent-500 text-white py-4 rounded-xl font-bold hover:bg-accent-600 transition-all text-center shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Request Wholesale Quote
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="bg-blue-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Global Shipping</p>
                  <p className="text-sm text-gray-600">Export to USA, Canada & Worldwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Quality Certified</p>
                  <p className="text-sm text-gray-600">FSSAI & Export Grade Quality</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Description</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>

              <h3 className="text-xl font-bold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {Array.isArray(product.features) && product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="text-green-500 flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="space-y-3">
                {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex border-b border-gray-200 pb-3">
                    <span className="font-medium text-gray-700 w-1/2">{key}</span>
                    <span className="text-gray-600 w-1/2">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          {relatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relProduct) => (
                <Link
                  key={relProduct.id}
                  to={`/product/${relProduct.slug}`}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
                >
                  <div className="aspect-square bg-gray-100 overflow-hidden relative">
                    <img
                      src={relProduct.image}
                      alt={relProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {relProduct.stock_status === 'out_of_stock' && (
                      <div className="absolute top-2 right-2 bg-white/90 text-red-600 text-xs font-bold py-1 px-2 rounded-full">
                        Out of Stock
                      </div>
                    )}
                    {relProduct.badge && (
                      <div className="absolute top-2 left-2 bg-amber-500 text-white text-xs font-bold py-1 px-2 rounded-full">
                        {relProduct.badge}
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                      {relProduct.name}
                    </h3>
                    <div className="text-xs text-gray-600 mb-2">{relProduct.packaging}</div>
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">MOQ: {relProduct.moq}</div>
                      <Link to={`/contact?product=${encodeURIComponent(relProduct.name)}`} className="text-primary-600 text-xs font-medium hover:underline">
                        Inquire
                      </Link>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">No related products found</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
