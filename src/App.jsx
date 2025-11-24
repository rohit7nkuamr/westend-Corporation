import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductsPage from './pages/ProductsPage'
import ProductDetail from './pages/ProductDetail'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import CertificationsPage from './pages/CertificationsPage'

function App() {
  // PageVisit tracker component: reports route changes to the backend
  function RouteTracker() {
    const location = useLocation()
    useEffect(() => {
      // Send a lightweight page visit event
      import('./services/api').then(({ submitPageVisit }) => {
        const pageMap = {
          '/': 'home',
          '/products': 'products',
          '/about': 'about',
          '/contact': 'contact'
        }
        const pageName = pageMap[location.pathname] || (location.pathname.startsWith('/product') ? 'product_detail' : 'home')
        submitPageVisit({ page: pageName, action: 'page_view', session_id: '' })
      }).catch(() => { })
    }, [location])
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50" style={{ position: 'relative' }}>
      <Navbar />
      <RouteTracker />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/certifications" element={<CertificationsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
