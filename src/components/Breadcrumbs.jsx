import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = ({ customItems = null }) => {
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)

    // Generate breadcrumb items automatically if not provided
    const generateBreadcrumbs = () => {
        const pathnames = location.pathname.split('/').filter(x => x)

        const items = [
            { label: 'Home', path: '/', icon: Home }
        ]

        // Map path segments to readable labels
        const labelMap = {
            'products': 'Products',
            'product': 'Product',
            'about': 'About Us',
            'contact': 'Contact',
            'certifications': 'Certifications',
            'privacy': 'Privacy Policy',
            'terms': 'Terms & Conditions'
        }

        pathnames.forEach((segment, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`
            const label = labelMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

            items.push({ label, path })
        })

        // Add category from query params if on products page
        if (location.pathname === '/products') {
            const category = searchParams.get('category')
            if (category) {
                items.push({ label: category, path: null }) // No link for current category
            }
        }

        return items
    }

    const breadcrumbItems = customItems || generateBreadcrumbs()

    // Don't show breadcrumbs on homepage
    if (location.pathname === '/' && !customItems) {
        return null
    }

    return (
        <nav className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <ol className="flex items-center space-x-2 text-sm overflow-x-auto scrollbar-hide">
                    {breadcrumbItems.map((item, index) => {
                        const isLast = index === breadcrumbItems.length - 1
                        const Icon = item.icon

                        return (
                            <li key={index} className="flex items-center flex-shrink-0">
                                {index > 0 && (
                                    <ChevronRight className="text-gray-400 mx-2" size={16} />
                                )}

                                {item.path && !isLast ? (
                                    <Link
                                        to={item.path}
                                        className="flex items-center text-gray-600 hover:text-primary-600 transition-colors font-medium"
                                    >
                                        {Icon && <Icon className="mr-1" size={16} />}
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className={`flex items-center ${isLast ? 'text-gray-900 font-semibold' : 'text-gray-600'}`}>
                                        {Icon && <Icon className="mr-1" size={16} />}
                                        {item.label}
                                    </span>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </nav>
    )
}

export default Breadcrumbs
