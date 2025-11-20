import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send } from 'lucide-react'
import { submitContactForm } from '../services/api'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Basic form validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please fill in all required fields (Name, Email, and Message).' 
      })
      return
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email.trim())) {
      setSubmitStatus({ 
        type: 'error', 
        message: 'Please enter a valid email address.' 
      })
      return
    }
    
    setSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm(formData)
      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you for your inquiry! We will get back to you soon.' 
      })
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
      
      // Scroll to the status message
      setTimeout(() => {
        window.scrollTo({
          top: window.scrollY - 100,
          behavior: 'smooth'
        })
      }, 100)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Failed to submit form. Please try again or contact us directly.' 
      })
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 93119 33481',
      color: 'from-amber-500 to-orange-600'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@westendcorp.com',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: 'X-57 Phase-II Okhla, Delhi 110020',
      color: 'from-slate-500 to-blue-600'
    }
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-amber-50/30 to-primary-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-amber-600 via-primary-600 to-orange-600 bg-clip-text text-transparent">
              Request a Business Inquiry
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with our team to discuss bulk orders, partnerships, or custom requirements. 
            We typically respond within 24 business hours.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, x: 10 }}
                  className="group relative"
                >
                  {/* Glowing effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${info.color} rounded-2xl blur opacity-20 group-hover:opacity-40 transition-all duration-500`} />
                  
                  <div className="relative bg-white rounded-2xl p-6 flex items-start space-x-4 shadow-md hover:shadow-xl transition-all border border-gray-100">
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`w-12 h-12 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}
                    >
                      <info.icon className="text-white" size={22} strokeWidth={2} />
                    </motion.div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{info.title}</h3>
                      {info.title === 'Phone' ? (
                        <a
                          href="tel:+919311933481"
                          className="block font-medium text-gray-800 hover:text-primary-600 transition-colors text-sm md:text-base"
                        >
                          +91 93119 33481
                        </a>
                      ) : info.title === 'Address' ? (
                        <a
                          href="https://www.google.com/maps/place/Westend+corporation/@28.5420132,77.2756653,383m/data=!3m1!1e3!4m10!1m2!2m1!1sX-57+Phase-II+Okhla,+Delhi+110020!3m6!1s0x390ce30010f472fb:0x1456fe72f05194a7!8m2!3d28.5420132!4d77.2780471!15sCiFYLTU3IFBoYXNlLUlJIE9raGxhLCBEZWxoaSAxMTAwMjCSAQl3YXJlaG91c2WqAWIKDS9nLzExaDJkNnJueXkQASoIIgR4IDU3KAAyHxABIhvY5h26iiHHI4RCMG_ABwDAu3WfLw6-2GboZKsyJBACIiB4IDU3IHBoYXNlIGlpIG9raGxhIGRlbGhpIDExMDAyMOABAA!16s%2Fg%2F11w7fmnqrq?hl=en&entry=ttu&g_ep=EgoyMDI1MTExMi4wIKXMDSoASAFQAw%3D%3D"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-primary-600 transition-colors text-sm md:text-base"
                        >
                          {info.details}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.details}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Embedded Google Map - Satellite View */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl overflow-hidden h-64"
              >
                <iframe
                  title="Westend Corporation Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d959.6654389648438!2d77.2780471!3d28.5420132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce30010f472fb%3A0x1456fe72f05194a7!2sWestend%20corporation!5e1!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-100 hover:border-primary-100 transition-colors">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50 hover:border-gray-300"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50 hover:border-gray-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50 hover:border-gray-300"
                      placeholder="+91 XXX XXX XXXX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50 hover:border-gray-300"
                    placeholder="Your company name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none bg-white/50 hover:border-gray-300"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                {/* Submit Status Message */}
                {submitStatus && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl ${
                      submitStatus.type === 'success' 
                        ? 'bg-green-50 text-green-800 border border-green-200' 
                        : 'bg-red-50 text-red-800 border border-red-200'
                    }`}
                  >
                    {submitStatus.message}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={submitting}
                  whileHover={{ scale: submitting ? 1 : 1.02 }}
                  whileTap={{ scale: submitting ? 1 : 0.98 }}
                  className={`w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center group border-2 border-transparent hover:border-amber-600 ${
                    submitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {submitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <Send className="ml-2" size={20} />
                      </motion.div>
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
