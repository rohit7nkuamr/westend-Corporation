import React from 'react'
import { Helmet } from 'react-helmet-async'

/**
 * SEO component for managing page meta tags and structured data
 */
const SEO = ({
    title = 'Westend Corporation - Premium International Food Exporter | USA, Canada & Worldwide',
    description = 'Leading international food exporter from India. Shipping to USA, Canada & worldwide. FSSAI certified. Premium groceries, pulses, spices & frozen vegetables. B2B bulk orders. Competitive export pricing since 2010.',
    keywords = 'Westend Corporation, Westend Corporation India, Westend Corporation Delhi, Westend Foods, Westend Exports, Westend Corporation products, Westend Corporation reviews, international food exporter, food exporter to USA, food exporter to Canada, bulk food export India, FSSAI certified exporter, wholesale food export, B2B food distributor, Indian spices exporter, organic pulses supplier, frozen vegetables exporter, ready to eat food manufacturer, Indian grocery exporter',
    ogImage = 'https://westendcorporation.in/og-image.jpg',
    ogType = 'website',
    structuredData = null,
    canonical = null
}) => {
    const siteUrl = 'https://westendcorporation.in'
    const fullCanonical = canonical || (typeof window !== 'undefined' ? window.location.href : siteUrl)

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={fullCanonical} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={fullCanonical} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:site_name" content="Westend Corporation" />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullCanonical} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            {/* Additional SEO Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content="English" />
            <meta name="author" content="Westend Corporation" />
            <meta name="geo.region" content="IN-DL" />
            <meta name="geo.placename" content="Delhi" />

            {/* Structured Data */}
            {structuredData && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            )}
        </Helmet>
    )
}

export default SEO

// Helper function to generate organization structured data
export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Westend Corporation",
    "url": "https://westendcorporation.in",
    "logo": "https://westendcorporation.in/logo.png",
    "description": "Premium wholesale food supplier in India since 2010",
    "address": {
        "@type": "PostalAddress",
        "addressLocality": "Delhi",
        "addressRegion": "Delhi",
        "addressCountry": "IN"
    },
    "contactPoint": {
        "@type": "ContactPoint",
        "email": "support@westendcorporation.in",
        "contactType": "Customer Service"
    },
    "sameAs": [
        "https://www.facebook.com/westendcorporation",
        "https://www.linkedin.com/company/westendcorporation"
    ]
})

// Helper function to generate product structured data
export const getProductSchema = (product) => {
    // Get real product image URL from backend
    const productImage = product.image?.startsWith('http')
        ? product.image
        : `https://westendcorporation.in${product.image}`

    return {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": [productImage],
        "description": product.description || `International bulk exporter of ${product.name}. Premium quality, FSSAI certified. Exporting to USA, Canada, and worldwide. Minimum order quantity: ${product.moq || 'Contact for details'}. Contact for competitive export pricing.`,
        "brand": {
            "@type": "Brand",
            "name": product.brand || "Westend Organic"
        },
        "category": product.vertical_name || "Food Products",
        "sku": `WC-${product.id}`,
        "mpn": `WC-${product.id}`,
        "manufacturer": {
            "@type": "Organization",
            "name": "Westend Corporation",
            "description": "Leading International Food Exporter - Shipping to USA, Canada & Worldwide"
        },
        "offers": {
            "@type": "Offer",
            "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "price": "0", // 0 indicates 'Contact for Price' in some contexts, but priceSpecification is better
            "priceCurrency": "USD",
            "priceValidUntil": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            "itemCondition": "https://schema.org/NewCondition",
            "url": `https://westendcorporation.in/product/${product.slug}`,
            "priceSpecification": {
                "@type": "UnitPriceSpecification",
                "priceType": "https://schema.org/InvoicePrice",
                "priceCurrency": "USD",
                "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": product.moq || "Bulk Orders",
                    "unitText": "MOQ"
                }
            },
            "businessFunction": "http://purl.org/goodrelations/v1#Sell",
            "eligibleQuantity": {
                "@type": "QuantitativeValue",
                "minValue": "1",
                "unitText": "International Bulk Orders"
            },
            "eligibleRegion": [
                {
                    "@type": "Place",
                    "name": "United States"
                },
                {
                    "@type": "Place",
                    "name": "Canada"
                },
                {
                    "@type": "Place",
                    "name": "Worldwide"
                }
            ],
            "seller": {
                "@type": "Organization",
                "name": "Westend Corporation - International Food Exporter",
                "description": "Premium food exporter to USA, Canada, and worldwide markets since 2010",
                "url": "https://westendcorporation.in",
                "address": {
                    "@type": "PostalAddress",
                    "addressCountry": "IN",
                    "addressLocality": "Delhi"
                }
            }
        },
        "additionalProperty": [
            {
                "@type": "PropertyValue",
                "name": "Minimum Order Quantity",
                "value": product.moq || "Contact for details"
            },
            {
                "@type": "PropertyValue",
                "name": "Packaging",
                "value": product.packaging || "Export-quality bulk packaging"
            },
            {
                "@type": "PropertyValue",
                "name": "Business Type",
                "value": "International Exporter, Bulk Supplier, B2B - USA, Canada, Worldwide"
            },
            {
                "@type": "PropertyValue",
                "name": "Certifications",
                "value": product.certifications || "FSSAI Certified, Export Quality"
            },
            {
                "@type": "PropertyValue",
                "name": "Export Markets",
                "value": "USA, Canada, and Worldwide"
            }
        ]
    }
}

// Helper function to generate breadcrumb structured data
export const getBreadcrumbSchema = (items) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
    }))
})
