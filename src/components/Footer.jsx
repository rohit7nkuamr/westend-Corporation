import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '/about' },
      { name: 'Our Products', href: '/products' },
      { name: 'Why Choose Us', href: '/#why-choose-us' },
      { name: 'Certifications', href: '/certifications' }
    ],
    products: [
      { name: 'Spices & Seasonings', href: '/products?category=Spices%20%26%20Seasonings' },
      { name: 'Processed Drinks & Confectionery', href: '/products?category=Processed%20Drinks%20%26%20Confectionery' },
      { name: 'Baked Goods', href: '/products?category=Baked%20Goods' },
      { name: 'Health Mixes', href: '/products?category=Health%20Mixes' },
      { name: 'Frozen Vegetables', href: '/products?category=Frozen%20Vegetables' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Request Quote', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' }
    ]
  }

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-primary-500 mb-4">
              Westend Corporation
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for premium quality groceries, frozen vegetables, and processed foods since 2010.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start">
                <MapPin className="mr-2 flex-shrink-0 mt-1 text-primary-500" size={16} />
                <a
                  href="https://www.google.com/maps/place/Westend+corporation/@28.5420132,77.2756653,383m/data=!3m1!1e3!4m10!1m2!2m1!1sX-57+Phase-II+Okhla,+Delhi+110020!3m6!1s0x390ce30010f472fb:0x1456fe72f05194a7!8m2!3d28.5420132!4d77.2780471!15sCiFYLTU3IFBoYXNlLUlJIE9raGxhLCBEZWxoaSAxMTAwMjCSAQl3YXJlaG91c2WqAWIKDS9nLzExaDJkNnJueXkQASoIIgR4IDU3KAAyHxABIhvY5h26iiHHI4RCMG_ABwDAu3WfLw6-2GboZKsyJBACIiB4IDU3IHBoYXNlIGlpIG9raGxhIGRlbGhpIDExMDAyMOABAA!16s%2Fg%2F11w7fmnqrq?hl=en&entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  X-57 Phase-II Okhla, Delhi 110020
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 flex-shrink-0 text-primary-500" size={16} />
                <a
                  href="tel:+919311933481"
                  className="hover:text-primary-400 transition-colors"
                >
                  +91 93119 33481
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 flex-shrink-0 text-primary-500" size={16} />
                <a
                  href="mailto:support@westendcorporation.in"
                  className="hover:text-primary-400 transition-colors"
                >
                  support@westendcorporation.in
                </a>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold text-white mb-3">Follow Us</h5>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/westendcorporation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-300 group"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
                <a
                  href="https://www.facebook.com/westendcorporation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 bg-gray-800 rounded-full hover:bg-primary-600 transition-colors duration-300 group"
                  aria-label="Follow us on Facebook"
                >
                  <Facebook size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Products Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4 text-white">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-gray-800 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              © {currentYear} Westend Corporation Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              {/* Social Media Links */}
              <div className="flex space-x-3 mr-6">
                <a
                  href="https://www.instagram.com/westendcorporation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://www.facebook.com/westendcorporation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
              </div>
              <div className="flex space-x-6 text-sm text-gray-500">
                <a href="/privacy" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
                <a href="/terms" className="hover:text-primary-400 transition-colors">Terms of Service</a>
                <a href="/contact" className="hover:text-primary-400 transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-primary-600" />
    </footer>
  )
}

export default Footer
