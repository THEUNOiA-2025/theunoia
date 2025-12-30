import React from 'react';
import Header from '@/components/Header';
import HowItWorks from '@/components/HowItWorks';
import Footer from '@/components/Footer';

const HowItWorksPage = () => {
  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <Header />
      <main className="pt-8">
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorksPage;
