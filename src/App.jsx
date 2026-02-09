import React from 'react';
import Hero from './components/Hero';
import FoldMarqueeSection from './components/FoldMarqueeSection';
import HowItWorks from './components/HowItWorks';
import LiveTransformation from './components/LiveTransformation';
import BenefitsStory from './components/BenefitsStory';
import IntegrationSection from './components/VSCodeIntegration';
import CTA from './components/CTA';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

// Optional: Global Global ScrollTrigger Refresh for safety
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app-main">
      <Navbar />
      <Hero />
      <FoldMarqueeSection />
      <HowItWorks />
      <LiveTransformation />
      <BenefitsStory />
      <IntegrationSection />
      <CTA />
      <Footer />
    </div>
  );
}

export default App;
