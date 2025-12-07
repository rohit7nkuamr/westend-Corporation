import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getHeroSlides } from '../services/api';

const Hero = () => {
    const [slides, setSlides] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeroSlides = async () => {
            try {
                const slidesData = await getHeroSlides();
                setSlides(slidesData);
            } catch (err) {
                console.error('Error fetching hero slides:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchHeroSlides();
    }, []);

    useEffect(() => {
        if (slides.length === 0) return;
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [slides]);

    // Show loading skeleton instead of empty message during initial load
    if (loading) {
        return (
            <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 animate-pulse">
                {/* Loading skeleton - no text, just gradient */}
            </div>
        );
    }

    // Only show empty message if data is loaded but no slides exist
    if (slides.length === 0) {
        return (
            <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
                <div className="text-center px-4">
                    <p className="text-gray-400 text-lg">No hero slides available</p>
                    <p className="text-gray-500 text-sm mt-2">Add slides in the admin panel to display here</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[400px] md:h-[500px] bg-gray-900 overflow-hidden">
            {/* Background Carousel - Supports Video and Images */}
            <AnimatePresence initial={false}>
                {slides[currentSlide] && (
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 z-0"
                    >
                        {slides[currentSlide].use_video && slides[currentSlide].video ? (
                            /* Video Background */
                            <video
                                src={slides[currentSlide].video}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            /* Image Background */
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title || "Hero slide"}
                                className="w-full h-full object-cover"
                            />
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Slide Indicators */}
            {slides.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all ${index === currentSlide
                                ? 'bg-white w-8'
                                : 'w-2 bg-white/50 hover:bg-white/75'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Hero;

