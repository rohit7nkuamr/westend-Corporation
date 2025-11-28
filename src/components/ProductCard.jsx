import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative">
            {/* Badges */}
            <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
                {product.badge && (
                    <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {product.badge}
                    </span>
                )}
                {product.discount && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {product.discount}
                    </span>
                )}
            </div>

            {/* Image Container */}
            <div className="relative aspect-square bg-gray-50 overflow-hidden p-4">
                <OptimizedImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />

                {/* Hover Actions */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <Link
                        to={`/product/${product.slug}`}
                        className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                        title="View Details"
                    >
                        <Eye size={18} />
                    </Link>
                    <Link
                        to="/contact"
                        className="bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-primary-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                        title="Request Quote"
                    >
                        <ShoppingCart size={18} />
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 text-center">
                <h3 className="font-bold text-gray-800 text-sm mb-1 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    <Link to={`/product/${product.slug}`}>
                        {product.name}
                    </Link>
                </h3>

                {/* Rating */}
                <div className="flex justify-center gap-0.5 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} size={12} className="text-yellow-400 fill-yellow-400" />
                    ))}
                </div>

                {/* Price / MOQ */}
                <div className="flex items-center justify-center gap-2">
                    <span className="text-primary-600 font-bold text-sm">
                        {product.price || 'Contact for Price'}
                    </span>
                    {product.oldPrice && (
                        <span className="text-gray-400 text-xs line-through">
                            {product.oldPrice}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
