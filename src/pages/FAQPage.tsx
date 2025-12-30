import React from 'react';
import Header from '@/components/Header';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

const FAQPage = () => {
  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <Header />
      <main className="pt-8">
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default FAQPage;
