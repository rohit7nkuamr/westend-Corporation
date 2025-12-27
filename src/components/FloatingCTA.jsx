
import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { downloadCatalog } from '../services/api';

const FloatingCTA = () => {
    const handleDownload = () => {
        // Trigger download
        const url = downloadCatalog();
        window.open(url, '_blank');
    };

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
            <button
                onClick={handleDownload}
                className={`
                  relative
                  group
                  flex items-center gap-2 md:gap-3
                  py-2 px-3 md:py-4 md:px-6
                  rounded-l-xl md:rounded-l-2xl
                  overflow-hidden
                  transition-all duration-300
                  backdrop-blur-md
                  bg-gradient-to-l from-primary-900/90 to-black/80
                  border-l border-t border-b border-primary-500/30
                  shadow-[0_0_20px_rgba(234,179,8,0.2)]
                  hover:shadow-[0_0_30px_rgba(234,179,8,0.4)]
                  translate-x-[5px]
                  hover:translate-x-0
                  w-auto md:min-w-[240px]
                `}
                aria-label="Download Full Catalog"
            >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />

                <div className="flex flex-col items-start z-10 w-full">
                    <span className="hidden md:block text-xs text-primary-400 font-medium tracking-wider uppercase mb-0.5">
                        Exclusive Access
                    </span>
                    <span className="font-bold text-white text-xs md:text-lg tracking-wide group-hover:text-primary-400 transition-colors">
                        <span className="md:hidden">CATALOG</span>
                        <span className="hidden md:inline">DOWNLOAD CATALOG</span>
                    </span>
                    <span className="hidden md:flex text-[10px] text-gray-400 font-light items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Updated with 200+ Products
                    </span>
                </div>

                <div className="relative z-10 p-1.5 md:p-2 rounded-full bg-primary-500/10 group-hover:bg-primary-500/20 transition-colors border border-primary-500/30">
                    <Download className="w-4 h-4 md:w-5 md:h-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
                </div>
            </button>
        </div>
    );
};

export default FloatingCTA;
