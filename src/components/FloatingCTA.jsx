
import React, { useState, useEffect } from 'react';
import { Download } from 'lucide-react';
import { getBrochures } from '../services/api';

const FloatingCTA = () => {
    const [brochures, setBrochures] = useState([]);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const fetchBrochures = async () => {
            try {
                const data = await getBrochures();
                if (data && data.length > 0) {
                    setBrochures(data);
                    setIsVisible(true);
                }
            } catch (error) {
                console.error('Error fetching brochures:', error);
            }
        };

        fetchBrochures();
    }, []);

    if (!isVisible || brochures.length === 0) return null;

    const handleDownload = (brochure) => {
        // Create a temporary link to download the file
        const link = document.createElement('a');
        link.href = brochure.file;
        link.target = '_blank';
        link.download = brochure.title ? `${brochure.title}.pdf` : 'catalog.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const gradients = [
        'from-primary-600 to-primary-500', // Default Gold/Primary
        'from-blue-600 to-blue-500',       // Blue
        'from-emerald-600 to-emerald-500', // Green
        'from-rose-600 to-rose-500',       // Red/Rose
        'from-violet-600 to-violet-500',   // Purple
        'from-amber-600 to-amber-500',     // Orange
        'from-cyan-600 to-cyan-500',       // Cyan
    ];

    return (
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
            {brochures.map((brochure, index) => {
                // Pick a color based on the index to keep it consistent
                const gradientClass = gradients[index % gradients.length];

                return (
                    <button
                        key={brochure.id}
                        onClick={() => handleDownload(brochure)}
                        className={`
                          flex items-center gap-2 
                          bg-gradient-to-l ${gradientClass}
                          text-white 
                          py-3 px-4 
                          rounded-l-lg 
                          shadow-lg 
                          hover:shadow-xl 
                          hover:translate-x-1 
                          transition-all 
                          duration-300 
                          group
                          justify-between
                          min-w-[200px]
                        `}
                        aria-label={`Download ${brochure.title}`}
                    >
                        <span className="font-medium whitespace-nowrap text-shadow-sm">
                            {brochure.title || 'Download Catalog'}
                        </span>
                        <Download className="w-5 h-5 animate-bounce-slow" />
                    </button>
                );
            })}
        </div>
    );
};

export default FloatingCTA;
