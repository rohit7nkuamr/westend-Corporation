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
        <section className="relative z-20 -mt-24 pb-16 px-4 sm:px-6 lg:px-8">
            {/* Optional: Add a background image container if needed, currently relying on Hero overlap */}
            {/* <div className="absolute inset-0 bg-[url('path/to/image.jpg')] bg-cover bg-center opacity-10"></div> */}

            <div className="max-w-7xl mx-auto">
                <div className="flex overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {verticals.slice(0, 3).map((vertical, index) => (
                        <motion.div
                            key={vertical.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className={`min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-center bg-white rounded-2xl shadow-xl p-6 border ${vertical.border_color} hover:shadow-2xl transition-all duration-300 group relative overflow-hidden`}
                        >
                            {/* Card Background Image - Always Visible */}
                            <div className="absolute inset-0 opacity-100 transition-opacity duration-500 z-0">
                                <img src={vertical.image} alt="" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50"></div>
                            </div>

                            <Link to={`/products?category=${vertical.id}`} className="flex flex-col items-center text-center h-full relative z-10">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 bg-white/20 backdrop-blur-sm`}>
                                    {React.createElement(vertical.icon, {
                                        className: `text-white transition-colors duration-300`,
                                        size: 32
                                    })}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 font-display transition-colors duration-300">
                                    {vertical.title}
                                </h3>
                                <p className="text-gray-200 text-sm line-clamp-2 mb-4 transition-colors duration-300">
                                    {vertical.description}
                                </p>
                                <span className={`text-sm font-bold text-white uppercase tracking-wider mt-auto transition-colors duration-300`}>
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
