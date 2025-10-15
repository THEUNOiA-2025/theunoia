import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import BrandLogos from '@/components/BrandLogos';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import Integrations from '@/components/Integrations';
import Dashboard from '@/components/Dashboard';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="bg-white overflow-hidden">
      <Header />
      <main>
        <Hero />
        <BrandLogos />
        <HowItWorks />
        <Features />
        <Integrations />
        <Dashboard />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
