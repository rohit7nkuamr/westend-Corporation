import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getVerticals } from '../services/api';
import { ShoppingBasket, Snowflake, Package, Wheat, Leaf, Box } from 'lucide-react';

const CategoryShowcase = () => {
    const [verticals, setVerticals] = useState([]);
    const [loading, setLoading] = useState(true);

    // Icon mapping
    const iconMap = {
        'Wheat': Wheat,
        'Snowflake': Snowflake,
        'Box': Box,
        'Leaf': Leaf,
        'Package': Package,
        'ShoppingBasket': ShoppingBasket
    };

    // Color schemes
    const colorSchemes = [
        {
            name: 'Baked Goods',
            gradient: 'from-pink-500 to-rose-600',
            text_color: 'text-pink-600',
            bg_color: 'bg-pink-50',
            border_color: 'border-pink-100'
        },
        {
            name: 'Groceries & Staples',
            gradient: 'from-orange-500 to-amber-600',
            text_color: 'text-amber-600',
            bg_color: 'bg-orange-50',
            border_color: 'border-orange-100'
        },
        {
            name: 'Frozen Vegetables',
            gradient: 'from-blue-500 to-cyan-600',
            text_color: 'text-blue-600',
            bg_color: 'bg-blue-50',
            border_color: 'border-blue-100'
        },
        {
            name: 'Processed Foods',
            gradient: 'from-amber-500 to-yellow-600',
            text_color: 'text-amber-600',
            bg_color: 'bg-amber-50',
            border_color: 'border-amber-100'
        }
    ];

    useEffect(() => {
        const fetchVerticals = async () => {
            try {
                const data = await getVerticals();
                const mappedData = data.map((vertical, index) => {
                    const colorScheme = colorSchemes.find(cs => cs.name === vertical.title) || colorSchemes[index % colorSchemes.length];
                    return {
                        ...vertical,
                        icon: iconMap[vertical.icon_name] || Wheat,
                        ...colorScheme
                    };
                });
                setVerticals(mappedData);
            } catch (err) {
                console.error('Error fetching verticals:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchVerticals();
    }, []);

    if (loading) return null;

    return (
        <section className="relative z-20 -mt-24 pb-16">
            {/* Optional: Add a background image container if needed, currently relying on Hero overlap */}
            {/* <div className="absolute inset-0 bg-[url('path/to/image.jpg')] bg-cover bg-center opacity-10"></div> */}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Mobile: Grid cols 2 (4 rows). Tablet/Desktop: Grid cols 4 (2 rows). */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
                    {verticals.map((vertical, index) => (
                        <motion.div
                            key={vertical.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-white rounded-xl sm:rounded-2xl shadow-md sm:shadow-xl p-3 sm:p-6 border ${vertical.border_color} hover:shadow-2xl transition-all duration-300 group overflow-hidden`}
                        >
                            {/* Card Background Image - Transparent Overlay */}
                            <div className="absolute inset-0 opacity-100 transition-opacity duration-500 z-0">
                                <img src={vertical.image} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/60 sm:bg-black/50"></div>
                            </div>

                            <Link to={`/products?category=${encodeURIComponent(vertical.title)}`} className="flex flex-col items-center text-center h-full relative z-10">
                                {/* Icon Bubble */}
                                <div className={`w-10 h-10 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mb-2 sm:mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/20 backdrop-blur-sm`}>
                                    {React.createElement(vertical.icon, {
                                        className: `text-white transition-colors duration-300`,
                                        size: window.innerWidth < 640 ? 20 : 32 // Dynamic icon sizing handled via CSS preferred but direct prop works for simple toggle
                                    })}
                                </div>

                                <h3 className="text-sm sm:text-xl font-bold text-white mb-1 sm:mb-2 font-display leading-tight">
                                    {vertical.title}
                                </h3>

                                {/* Description hidden on mobile to save space */}
                                <p className="hidden sm:block text-gray-200 text-sm line-clamp-2 mb-4">
                                    {vertical.description}
                                </p>

                                <span className={`text-[10px] sm:text-sm font-bold text-white uppercase tracking-wider mt-auto pt-2`}>
                                    Shop Now
                                </span>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryShowcase;
