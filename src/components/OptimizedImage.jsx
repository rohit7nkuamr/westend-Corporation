import React, { useState } from 'react'
import { motion } from 'framer-motion'

/**
 * OptimizedImage Component
 * Provides lazy loading, blur-up effect, and optimized performance
 */
const OptimizedImage = ({
    src,
    alt,
    className = '',
    eager = false,
    aspectRatio = 'auto',
    priority = false
}) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

    // Determine loading strategy
    const loading = eager || priority ? 'eager' : 'lazy'

    // Blur placeholder - tiny base64 encoded 1x1 gray pixel
    const blurDataURL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmM2Y0ZjYiLz48L3N2Zz4='

    return (
        <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio }}>
            {/* Blur Placeholder */}
            {!isLoaded && !hasError && (
                <div
                    className="absolute inset-0 bg-gray-100 animate-pulse"
                    style={{
                        backgroundImage: `url(${blurDataURL})`,
                        backgroundSize: 'cover',
                        filter: 'blur(10px)',
                        transform: 'scale(1.1)'
                    }}
                />
            )}

            {/* Actual Image */}
            {!hasError && (
                <motion.img
                    src={src}
                    alt={alt}
                    loading={loading}
                    decoding={eager ? 'sync' : 'async'}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => setHasError(true)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isLoaded ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className={`w-full h-full object-cover ${isLoaded ? 'scale-100' : 'scale-105'} transition-transform duration-500`}
                    style={{
                        position: 'absolute',
                        inset: 0
                    }}
                />
            )}

            {/* Error Fallback */}
            {hasError && (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Image unavailable</span>
                </div>
            )}
        </div>
    )
}

export default OptimizedImage
