import React from 'react'
import Hero from '../components/Hero'
import CategoryShowcase from '../components/CategoryShowcase'
import FeaturedProducts from '../components/FeaturedProducts'
import Certifications from '../components/Certifications'
import WhyChooseUs from '../components/WhyChooseUs'
import SEO, { getOrganizationSchema, getWebSiteSchema } from '../components/SEO'
import PageBackground from '../components/PageBackground'

const Home = () => {
  return (
    <PageBackground pageKey="home">
      <SEO
        title="Westend Corporation - Premium International Food Exporter | USA, Canada & Worldwide"
        description="Westend Corporation is a leading international food exporter from India, specializing in premium groceries, pulses, spices, and frozen vegetables. We export to USA, Canada, and worldwide markets with FSSAI certification."
        keywords="Westend Corporation, Westend Corporation India, Westend Corporation Delhi, Westend Foods, Westend Exports, food exporters, food exporters India, food exports, worldwide food exporter, international food exporter, global food exporters, food export company, Indian food exporters, food exporters to USA, food exporters to Canada, food exporters worldwide, bulk food exporters, wholesale food exporters, organic food exporters, spices exporters India, pulses exporters, frozen food exporters, ready to eat food exporters, food export business, FSSAI certified food exporters, B2B food exporters"
        ogImage="https://westendcorporation.in/logo.png"
        structuredData={[getOrganizationSchema(), getWebSiteSchema()]}
      />
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <WhyChooseUs />
      <Certifications />
    </PageBackground>
  )
}

export default Home
