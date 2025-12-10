import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Check } from 'lucide-react';

const ProductSidebar = ({ categories, selectedCategory, onSelectCategory }) => {
    if (!categories || categories.length === 0) {
        return null;
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-28">
            <div className="p-4 bg-gray-50 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Categories</h3>
            </div>
            <div className="max-h-[calc(100vh-12rem)] overflow-y-auto p-2">
                {categories.map((category) => {
                    const isSelected = selectedCategory === category.name;
                    return (
                        <button
                            key={category.name}
                            onClick={() => onSelectCategory(category.name)}
                            className={`
                                w-full flex items-center justify-between p-3 rounded-lg text-sm font-medium transition-all duration-200 mb-1 text-left
                                ${isSelected
                                    ? 'bg-primary-50 text-primary-700 shadow-sm'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <span className="flex items-center gap-2 flex-1 pr-2">
                                {isSelected && <Check size={14} className="text-primary-600 shrink-0" />}
                                <span>{category.name}</span>
                            </span>

                            <span className={`
                                text-xs px-2 py-0.5 rounded-full shrink-0
                                ${isSelected
                                    ? 'bg-primary-100 text-primary-700'
                                    : 'bg-gray-100 text-gray-500'}
                            `}>
                                {category.count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default ProductSidebar;
