import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getVerticals } from '../services/api';

const Hero = () => {
    const [verticals, setVerticals] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchVerticals = async () => {
            try {
                const data = await getVerticals();
                setVerticals(data);
            } catch (err) {
                console.error('Error fetching verticals:', err);
            }
        };
        fetchVerticals();
    }, []);

    useEffect(() => {
        if (verticals.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % verticals.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [verticals]);

    const defaultImage = "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=2070&auto=format&fit=crop";

    return (
        <div className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
            {/* Background Carousel */}
            <AnimatePresence initial={false}>
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 z-0"
                >
                    <img
                        src={verticals[currentSlide]?.image || defaultImage}
                        alt="Background"
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900/90"></div>
                </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-primary-400 text-xl md:text-2xl font-medium tracking-wide mb-4 italic">
                        Welcome to Westend Corporation
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                        Premium <span className="text-primary-500 italic">Organic</span> Exports
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto mb-8 font-light leading-relaxed">
                        Sourcing the finest quality products from India to the world.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
