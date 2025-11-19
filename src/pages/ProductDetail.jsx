import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Heart, Share2, ShoppingCart, Check, Truck, Shield, ArrowLeft } from 'lucide-react'

const ProductDetail = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  // Mock product data (in real app, fetch based on id)
  const product = {
    id: id,
    name: 'Organic Kabuli Chana (Chickpeas)',
    category: 'Groceries & Staples',
    price: '₹120',
    unit: 'per kg',
    originalPrice: '₹150',
    discount: '20% OFF',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    sku: 'WC-OKC-001',
    brand: 'Westend Organic',
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=800&fit=crop&sat=-100',
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=800&fit=crop&hue=30',
    ],
    description: 'Premium quality organic Kabuli Chana (chickpeas) sourced directly from certified organic farms. Rich in protein, fiber, and essential nutrients. Perfect for making chana masala, salads, and various Indian dishes.',
    features: [
      '100% Certified Organic',
      'USDA & India Organic Certified',
      'No Pesticides or Chemicals',
      'High Protein Content (19g per 100g)',
      'Rich in Dietary Fiber',
      'Naturally Gluten-Free',
      'Farm Fresh Quality',
      'Vacuum Packed for Freshness'
    ],
    specifications: {
      'Product Type': 'Organic Pulses',
      'Packaging': 'Vacuum Sealed Bag',
      'Shelf Life': '12 Months',
      'Storage': 'Cool & Dry Place',
      'Origin': 'Maharashtra, India',
      'Certifications': 'FSSAI, Organic India, USDA',
      'Minimum Order': '25 kg',
      'Bulk Pricing': 'Available for 100kg+'
    }
  }

  const relatedProducts = [
    {
      id: 2,
      name: 'Organic Masoor Dal',
      price: '₹140/kg',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop',
      rating: 4.7
    },
    {
      id: 3,
      name: 'Organic Moong Beans',
      price: '₹130/kg',
      image: 'https://images.unsplash.com/photo-1583663848850-46af132dc08e?w=300&h=300&fit=crop',
      rating: 4.8
    },
    {
      id: 4,
      name: 'Organic Chana Dal',
      price: '₹125/kg',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop',
      rating: 4.6
    },
    {
      id: 5,
      name: 'Organic Toor Dal',
      price: '₹145/kg',
      image: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=300&h=300&fit=crop',
      rating: 4.9
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
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
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-green-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
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
            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <span className="text-sm text-green-600 font-medium">{product.brand}</span>
                  <h1 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h1>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Heart size={20} />
                  </button>
                  <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
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
                  <button className="w-full bg-primary-700 text-white py-3 rounded-lg font-semibold hover:bg-primary-800 transition-colors">
                    Request Quote
                  </button>
                </Link>
                <button className="flex-1 border-2 border-primary-700 text-primary-700 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors">
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.inStock ? (
                <>
                  <Check className="text-green-500" size={20} />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <span className="text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            {/* Quantity and CTA */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg)</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center border border-gray-300 rounded-lg py-2"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-gray-600">Minimum order: 25 kg</span>
                </div>
              </div>

              {/* Minimum Order Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-2">Minimum Order Quantity</h4>
                <p className="text-gray-600 text-sm">
                  MOQ varies based on product and packaging. Contact our sales team for detailed information.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  to="/contact"
                  className="flex-1 border-2 border-green-600 text-green-600 py-4 rounded-xl font-semibold hover:bg-green-50 transition-all text-center"
                >
                  Contact Supplier
                </Link>
              </div>
            </div>

            {/* Features */}
            <div className="bg-blue-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Free Shipping</p>
                  <p className="text-sm text-gray-600">On orders above 100 kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-blue-600" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Quality Assured</p>
                  <p className="text-sm text-gray-600">100% certified organic</p>
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
                {product.features.map((feature, index) => (
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
                {Object.entries(product.specifications).map(([key, value]) => (
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((relProduct) => (
              <Link
                key={relProduct.id}
                to={`/product/${relProduct.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all overflow-hidden group"
              >
                <div className="aspect-square bg-gray-100 overflow-hidden">
                  <img
                    src={relProduct.image}
                    alt={relProduct.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                    {relProduct.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        className={i < Math.floor(relProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <button className="w-full bg-primary-700 text-white text-xs py-2 rounded hover:bg-primary-800 transition-colors font-medium mt-2">
                    Request Quote
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
