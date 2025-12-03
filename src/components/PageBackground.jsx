import React, { useState, useEffect } from 'react'
import { getPageBackgrounds } from '../services/api'

const PageBackground = ({ pageKey, children, className = '' }) => {
    const [background, setBackground] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBackground = async () => {
            try {
                const backgrounds = await getPageBackgrounds()
                const bg = backgrounds.find(b => b.page === pageKey && b.is_active)
                setBackground(bg)
            } catch (error) {
                console.error('Error fetching page background:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBackground()
    }, [pageKey])

    if (loading || !background) {
        return <div className={className}>{children}</div>
    }

    return (
        <div className={`relative ${className}`}>
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed pointer-events-none"
                style={{
                    backgroundImage: `url(${background.background_image})`,
                    opacity: background.opacity,
                    zIndex: -1
                }}
            />
            {/* Content */}
            <div className="relative z-0">
                {children}
            </div>
        </div>
    )
}

export default PageBackground
