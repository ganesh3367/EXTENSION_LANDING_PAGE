import React from 'react';
import Hero from './components/Hero';
import FoldMarqueeSection from './components/FoldMarqueeSection';
import HowItWorks from './components/HowItWorks';
import LiveTransformation from './components/LiveTransformation';
import BenefitsStory from './components/BenefitsStory';
import IntegrationSection from './components/IntegrationSection';
import CTA from './components/CTA';

// Optional: Global Global ScrollTrigger Refresh for safety
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="app-main">
      <Hero />
      <FoldMarqueeSection />
      <HowItWorks />
      <LiveTransformation />
      <BenefitsStory />
      <IntegrationSection />
      <CTA />
    </div>
  );
}

export default App;
