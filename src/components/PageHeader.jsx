import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle }) => {
    return (
        <div className="bg-primary-900 text-white py-12 pt-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
                    {subtitle && (
                        <p className="text-xl text-green-100">{subtitle}</p>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default PageHeader;
