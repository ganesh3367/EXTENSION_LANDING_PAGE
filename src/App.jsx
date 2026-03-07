import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Hero from './components/Hero';
import FoldMarqueeSection from './components/FoldMarqueeSection';
import HowItWorks from './components/HowItWorks';
import LiveTransformation from './components/LiveTransformation';
import BenefitsStory from './components/BenefitsStory';
import IntegrationSection from './components/VSCodeIntegration';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Aboutit from './components/Aboutit';

// Optional: Global Global ScrollTrigger Refresh for safety
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-main">
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <FoldMarqueeSection />
              <HowItWorks />
              <LiveTransformation />
              <BenefitsStory />
              <IntegrationSection />
              <CTA />
              <Footer />
            </>
          } />
          <Route path="/about" element={<Aboutit />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
