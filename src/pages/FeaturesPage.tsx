import React from 'react';
import Header from '@/components/Header';
import Features from '@/components/Features';
import Footer from '@/components/Footer';

const FeaturesPage = () => {
  return (
    <div className="bg-white overflow-hidden min-h-screen">
      <Header />
      <main className="pt-8">
        <Features />
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
