import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin } from 'lucide-react'

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
      { name: 'Groceries & Staples', href: '/products' },
      { name: 'Frozen Vegetables', href: '/products' },
      { name: 'Processed Foods', href: '/products' }
    ],
    support: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Request Quote', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' }
    ]
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 text-white">
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
            <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 via-primary-400 to-orange-400 bg-clip-text text-transparent mb-4">
              Westend Corporation
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner for premium quality groceries, frozen vegetables, and processed foods since 2010.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-start">
                <MapPin className="mr-2 flex-shrink-0 mt-1" size={16} />
                <a
                  href="https://www.google.com/maps/place/Westend+corporation/@28.5420132,77.2756653,383m/data=!3m1!1e3!4m10!1m2!2m1!1sX-57+Phase-II+Okhla,+Delhi+110020!3m6!1s0x390ce30010f472fb:0x1456fe72f05194a7!8m2!3d28.5420132!4d77.2780471!15sCiFYLTU3IFBoYXNlLUlJIE9raGxhLCBEZWxoaSAxMTAwMjCSAQl3YXJlaG91c2WqAWIKDS9nLzExaDJkNnJueXkQASoIIgR4IDU3KAAyHxABIhvY5h26iiHHI4RCMG_ABwDAu3WfLw6-2GboZKsyJBACIiB4IDU3IHBoYXNlIGlpIG9raGxhIGRlbGhpIDExMDAyMOABAA!16s%2Fg%2F11w7fmnqrq?hl=en&entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-400 transition-colors"
                >
                  X-57 Phase-II Okhla, Delhi 110020
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="mr-2 flex-shrink-0" size={16} />
                <a
                  href="tel:+919311933481"
                  className="hover:text-amber-400 transition-colors"
                >
                  +91 93119 33481
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="mr-2 flex-shrink-0" size={16} />
                <a
                  href="mailto:support@westendcorporation.in"
                  className="hover:text-amber-400 transition-colors"
                >
                  support@westendcorporation.in
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
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
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
            <h4 className="text-lg font-semibold mb-4">Products</h4>
            <ul className="space-y-2">
              {footerLinks.products.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
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
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 mb-6">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-amber-400 transition-colors duration-300"
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
          className="border-t border-gray-700 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Westend Corporation Pvt. Ltd. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</a>
              <a href="/contact" className="hover:text-amber-400 transition-colors">Contact</a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-primary-500 to-orange-500" />
    </footer>
  )
}

export default Footer
