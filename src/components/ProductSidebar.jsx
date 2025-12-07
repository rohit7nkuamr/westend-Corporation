import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { getProductCategories } from '../services/api';

const ProductSidebar = ({ onSubcategoryClick }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedCategories, setExpandedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getProductCategories();
                setCategories(data);
                // Auto-expand all categories by default
                setExpandedCategories(data.map(cat => cat.id));
            } catch (err) {
                console.error('Error fetching product categories:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    if (loading) {
        return (
            <div className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-4 bg-gray-200 rounded"></div>
                    ))}
                </div>
            </div>
        );
    }

    if (categories.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
            <div className="max-h-[calc(100vh-8rem)] overflow-y-auto">
                {categories.map((category) => (
                    <div key={category.id} className="border-b border-gray-100 last:border-b-0">
                        {/* Category Header */}
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full px-4 py-3 flex items-center justify-between text-white font-semibold text-sm transition-colors hover:opacity-90"
                            style={{ backgroundColor: category.bg_color || '#1e293b' }}
                        >
                            <span>{category.title}</span>
                            {expandedCategories.includes(category.id) ? (
                                <ChevronDown size={16} />
                            ) : (
                                <ChevronRight size={16} />
                            )}
                        </button>

                        {/* Subcategories */}
                        <AnimatePresence>
                            {expandedCategories.includes(category.id) && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="py-2">
                                        {category.subcategories && category.subcategories.length > 0 ? (
                                            category.subcategories.map((subcategory) => (
                                                <div
                                                    key={subcategory.id}
                                                    className="px-6 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                >
                                                    {subcategory.title}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-6 py-2 text-sm text-gray-400 italic">
                                                No items
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductSidebar;
