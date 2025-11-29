import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const response = await fetch('https://westendcorporation.in/api/hero-slides/');
                const data = await response.json();
                setSlides(data);
            } catch (err) {
                console.error('Error fetching hero slides:', err);
            }
        };
        fetchHeroSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides]);

    // Don't render carousel if no slides
    if (slides.length === 0) {
        return (
            <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center px-4">
                    <p className="text-gray-400 text-lg">No hero slides available</p>
                    <p className="text-gray-500 text-sm mt-2">Add slides in the admin panel to display here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900 overflow-hidden">
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
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].title || "Hero slide"}
                        className="w-full h-full object-cover opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-gray-900/90"></div>
                </motion.div>
            </AnimatePresence>


        </div>
    );
};

export default Hero;
