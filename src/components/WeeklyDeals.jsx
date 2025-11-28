import React from 'react';
import { Link } from 'react-router-dom';

const WeeklyDeals = () => {
    return (
        <section className="relative py-20 bg-primary-500 overflow-hidden">
            {/* Background Pattern/Image Overlay */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h3 className="font-display text-white text-3xl md:text-5xl font-bold mb-4 italic">
                    Weekly Deals
                </h3>
                <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
                    Get the best prices on our premium organic selection. Limited time offers on seasonal favorites.
                </p>

                <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
                    {/* Countdown Mockup */}
                    <div className="flex gap-4 text-white">
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
                            <span className="block text-3xl font-bold">02</span>
                            <span className="text-xs uppercase tracking-wider">Days</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
                            <span className="block text-3xl font-bold">14</span>
                            <span className="text-xs uppercase tracking-wider">Hours</span>
                        </div>
                        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 w-20">
                            <span className="block text-3xl font-bold">45</span>
                            <span className="text-xs uppercase tracking-wider">Mins</span>
                        </div>
                    </div>
                </div>

                <Link
                    to="/products"
                    className="inline-block bg-white text-primary-600 font-bold px-8 py-3 rounded-full hover:bg-primary-50 transition-colors shadow-lg"
                >
                    Shop Deals
                </Link>
            </div>
        </section>
    );
};

export default WeeklyDeals;
