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
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Profile from './components/Profile/Profile';
import PrivateRoute from './components/Auth/PrivateRoute';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';

// Optional: Global Global ScrollTrigger Refresh for safety
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
