import React, { useState, useEffect } from 'react'
import { getCompanyInfo } from '../services/api'

const Logo = ({ className = 'h-12 w-auto', fallback = '/logo.png' }) => {
    const [companyInfo, setCompanyInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchCompanyInfo = async () => {
            try {
                console.log('Logo: Fetching company info...')
                const info = await getCompanyInfo()
                console.log('Logo: Raw API response:', info)
                // API returns paginated response with results array
                const company = info.results ? info.results[0] : (Array.isArray(info) ? info[0] : info)
                console.log('Logo: Company data:', company)
                console.log('Logo: Video enabled?', company?.use_video_logo)
                console.log('Logo: Video URL:', company?.logo_video)
                console.log('Logo: Image URL:', company?.logo_image)
                setCompanyInfo(company)
            } catch (err) {
                console.error('Logo: Error fetching company info:', err)
                setError(true)
            } finally {
                setLoading(false)
            }
        }
        fetchCompanyInfo()
    }, [])

    // While loading or on error, show fallback
    if (loading || error || !companyInfo) {
        return (
            <img
                src={fallback}
                alt="Westend Corporation"
                className={className}
            />
        )
    }

    // If video logo is enabled and video exists, show video
    if (companyInfo.use_video_logo && companyInfo.logo_video) {
        console.log('Logo: Rendering VIDEO')
        return (
            <video
                autoPlay
                loop
                muted
                playsInline
                className={className}
                style={{ objectFit: 'contain' }}
                onError={(e) => console.error('Logo: Video failed to load', e)}
                onLoadedData={() => console.log('Logo: Video loaded successfully')}
            >
                <source src={companyInfo.logo_video} type="video/mp4" />
                <source src={companyInfo.logo_video} type="video/webm" />
                {/* Fallback to image if video fails */}
                <img
                    src={companyInfo.logo_image || fallback}
                    alt="Westend Corporation"
                    className={className}
                />
            </video>
        )
    }

    // If logo image exists, show it
    if (companyInfo.logo_image) {
        return (
            <img
                src={companyInfo.logo_image}
                alt="Westend Corporation"
                className={className}
            />
        )
    }

    // Final fallback
    return (
        <img
            src={fallback}
            alt="Westend Corporation"
            className={className}
        />
    )
}

export default Logo
