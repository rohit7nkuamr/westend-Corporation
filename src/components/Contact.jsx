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
    setSubmitting(true)
    setSubmitStatus(null)

    try {
      await submitContactForm(formData)
      setSubmitStatus({ type: 'success', message: 'Thank you for your inquiry! We will get back to you soon.' })
      setFormData({ name: '', email: '', phone: '', company: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to submit form. Please try again or contact us directly.' })
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
      details: '+91 XXX XXX XXXX',
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
      details: 'B-106, Okhla Industrial Area, Phase 1, Delhi - 110020',
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
                      <p className="text-gray-600">{info.details}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass rounded-2xl p-6 h-64 flex items-center justify-center relative overflow-hidden"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="absolute inset-0 bg-gradient-to-br from-amber-400 via-primary-400 to-orange-400 opacity-20"
                />
                <div className="relative z-10 text-center">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MapPin className="text-primary-600 mx-auto mb-2" size={48} />
                  </motion.div>
                  <p className="text-gray-600 font-medium">Delhi, India</p>
                </div>
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
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50"
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all bg-white/50"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none bg-white/50"
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
                  className={`w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center group ${
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
