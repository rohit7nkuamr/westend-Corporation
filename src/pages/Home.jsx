import React, { useState, useEffect } from 'react'
import Verticals from '../components/Verticals'
import FeaturedProducts from '../components/FeaturedProducts'
import Certifications from '../components/Certifications'
import WhyChooseUs from '../components/WhyChooseUs'

import SEO from '../components/SEO'

const Home = () => {
  const [error, setError] = useState(null);

  useEffect(() => {
    // Catch any errors that might be thrown by child components
    const handleError = (event) => {
      setError(event.error?.message || 'An unknown error occurred');
    };

    window.addEventListener('error', handleError);
    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Westend Corporation - Premium International Food Exporter | USA, Canada & Worldwide"
        description="Westend Corporation is a leading international food exporter from India, specializing in premium groceries, pulses, spices, and frozen vegetables. We export to USA, Canada, and worldwide markets with FSSAI certification."
        keywords="Westend Corporation, Westend Corporation India, Westend Corporation Delhi, Westend Foods, Westend Exports, international food exporter, food exporter to USA, food exporter to Canada, bulk food export India, FSSAI certified exporter, wholesale food export, B2B food distributor, Indian spices exporter, organic pulses supplier, frozen vegetables exporter"
      />
      <Verticals />
      <FeaturedProducts />
      <Certifications />
      <WhyChooseUs />
    </>
  )
}

export default Home
