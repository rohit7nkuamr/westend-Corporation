import React, { useState, useEffect } from 'react'
import { getSectionBackgrounds } from '../services/api'

const SectionBackground = ({ sectionKey, children, className = '' }) => {
    const [background, setBackground] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchBackground = async () => {
            try {
                const backgrounds = await getSectionBackgrounds()
                const bg = backgrounds.find(b => b.section === sectionKey && b.is_active)
                setBackground(bg)
            } catch (error) {
                console.error('Error fetching section background:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchBackground()
    }, [sectionKey])

    if (loading || !background) {
        return <div className={className}>{children}</div>
    }

    return (
        <div className={`relative ${className}`}>
            {/* Background Image Layer */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
                style={{
                    backgroundImage: `url(${background.background_image})`,
                    opacity: background.opacity,
                    zIndex: 0
                }}
            />
            {/* Content */}
            <div className="relative" style={{ zIndex: 1 }}>
                {children}
            </div>
        </div>
    )
}

export default SectionBackground
