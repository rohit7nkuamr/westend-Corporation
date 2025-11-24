import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const PrivacyPolicy = () => {
    return (
        <>
            <SEO
                title="Privacy Policy - Westend Corporation"
                description="Privacy Policy for Westend Corporation. Learn how we collect, use, and protect your personal information for B2B inquiries and export services."
            />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Privacy Policy</h1>

                    <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                        <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Introduction</h2>
                            <p>
                                Welcome to Westend Corporation ("we," "our," or "us"). As a leading B2B food exporter and wholesale supplier, we value the trust of our international partners and clients.
                                This Privacy Policy outlines how we collect, use, and protect your information when you visit our website (westendcorporation.in) or engage with us for business inquiries.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Information We Collect</h2>
                            <p>Given the B2B nature of our business, we primarily collect business-related information through our "Contact Us" and "Request Quote" forms:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li><strong>Business Identity Data:</strong> Company name, contact person's name, and job title.</li>
                                <li><strong>Contact Information:</strong> Business email address, phone number, and office location.</li>
                                <li><strong>Inquiry Details:</strong> Information regarding specific products, bulk quantities, port of discharge, and other export-related requirements.</li>
                                <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns to optimize our website performance for global access.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. How We Use Your Information</h2>
                            <p>We use your data strictly for business purposes:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li><strong>Processing Inquiries:</strong> To provide accurate price quotes (FOB/CIF) and product specifications based on your requirements.</li>
                                <li><strong>Business Communication:</strong> To discuss potential partnerships, export documentation, and logistics.</li>
                                <li><strong>Service Improvement:</strong> To analyze demand for specific food categories (e.g., Frozen Vegetables vs. Spices) in different regions.</li>
                                <li><strong>Compliance:</strong> To adhere to export regulations and Know Your Customer (KYC) norms where applicable.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Data Sharing & International Transfers</h2>
                            <p>
                                We do not sell your personal data. However, as an international exporter, we may share necessary details with:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li><strong>Logistics Partners:</strong> Freight forwarders and shipping lines to facilitate product delivery.</li>
                                <li><strong>Regulatory Authorities:</strong> Customs and food safety authorities (like FSSAI, FDA) for export clearance.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your business information. Access to sensitive inquiry data is restricted to authorized personnel involved in the export and sales process.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Your Rights</h2>
                            <p>
                                You have the right to request access to the information we hold about your business or request corrections. If you wish to opt-out of marketing communications, you may contact us directly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact Us</h2>
                            <p>
                                For any privacy-related queries or to update your business details, please contact our administrative office:
                            </p>
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-bold text-gray-900">Westend Corporation Pvt. Ltd.</p>
                                <p>X-57 Phase-II Okhla Industrial Area</p>
                                <p>New Delhi, Delhi 110020, India</p>
                                <p className="mt-2"><span className="font-medium">Email:</span> support@westendcorporation.in</p>
                                <p><span className="font-medium">Phone:</span> +91 93119 33481</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default PrivacyPolicy
