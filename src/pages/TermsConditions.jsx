import React from 'react'
import { motion } from 'framer-motion'
import SEO from '../components/SEO'

const TermsConditions = () => {
    return (
        <>
            <SEO
                title="Terms & Conditions - Westend Corporation"
                description="Terms and Conditions for Westend Corporation. Guidelines for B2B transactions, product information, and export services."
            />
            <div className="min-h-screen bg-gray-50 pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">Terms & Conditions</h1>

                    <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
                        <p className="text-sm text-gray-500">Last Updated: {new Date().toLocaleDateString()}</p>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">1. Scope of Services</h2>
                            <p>
                                Westend Corporation Pvt. Ltd. operates this website (westendcorporation.in) as a B2B digital catalog and inquiry platform.
                                We specialize in the export and wholesale supply of food products including groceries, spices, frozen vegetables, and processed foods.
                                This website does not facilitate direct online retail transactions (e-commerce).
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">2. Product Information</h2>
                            <p>
                                While we strive for accuracy, please note:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li><strong>Agricultural Variations:</strong> As our products are natural/agricultural commodities, slight variations in color, texture, or size may occur between batches.</li>
                                <li><strong>Packaging:</strong> Product packaging may vary based on bulk requirements (e.g., 25kg bags vs. retail packs) or export regulations of the destination country.</li>
                                <li><strong>Images:</strong> Product images on the website are for illustrative purposes only.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">3. Quotes and Pricing</h2>
                            <p>
                                Any pricing information or quotes provided through this website or via email are:
                            </p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li><strong>Estimates:</strong> Subject to market fluctuation, currency exchange rates, and shipping costs.</li>
                                <li><strong>Non-Binding:</strong> A request for a quote does not constitute a binding contract. A formal contract/Proforma Invoice is issued only after mutual agreement on terms (Incoterms, Payment Terms, etc.).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">4. Intellectual Property</h2>
                            <p>
                                All content on this site, including the Westend Corporation logo, product descriptions, and images, is the property of Westend Corporation Pvt. Ltd.
                                Unauthorized commercial use or reproduction of this content without express written permission is prohibited.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">5. Limitation of Liability</h2>
                            <p>
                                Westend Corporation shall not be liable for any direct, indirect, or consequential damages arising from the use of this website or reliance on the information provided herein.
                                For specific product liability claims, the terms of the specific export contract shall prevail.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">6. Governing Law</h2>
                            <p>
                                These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising in relation to this website shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-800 mb-3">7. Contact Information</h2>
                            <p>
                                For legal inquiries or questions regarding these terms, please contact us at:
                            </p>
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
                                <p className="font-bold text-gray-900">Westend Corporation Pvt. Ltd.</p>
                                <p>X-57 Phase-II Okhla Industrial Area</p>
                                <p>New Delhi, Delhi 110020, India</p>
                                <p className="mt-2"><span className="font-medium">Email:</span> support@westendcorporation.in</p>
                            </div>
                        </section>
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default TermsConditions
