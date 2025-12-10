import React from 'react'
import Contact from '../components/Contact'
import PageHeader from '../components/PageHeader'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        title="Contact Us"
        subtitle="Get in touch with our team for inquiries and support"
      />
      <Contact />
    </div>
  )
}

export default ContactPage
