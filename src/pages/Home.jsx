import React, { useState, useEffect } from 'react'
import Verticals from '../components/Verticals'
import FeaturedProducts from '../components/FeaturedProducts'
import Certifications from '../components/Certifications'
import WhyChooseUs from '../components/WhyChooseUs'

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
      <Verticals />
      <FeaturedProducts />
      <Certifications />
      <WhyChooseUs />
    </>
  )
}

export default Home
