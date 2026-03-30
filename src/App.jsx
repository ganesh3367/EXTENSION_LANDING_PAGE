import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/Auth/PrivateRoute';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './hooks/useAuth';
import { ThemeProvider } from './hooks/useTheme';
import Features from './components/Features';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = lazy(() => import('./components/Hero'));
const FoldMarqueeSection = lazy(() => import('./components/FoldMarqueeSection'));
const HowItWorks = lazy(() => import('./components/HowItWorks'));
const LiveTransformation = lazy(() => import('./components/LiveTransformation'));
const BenefitsStory = lazy(() => import('./components/BenefitsStory'));
const IntegrationSection = lazy(() => import('./components/VSCodeIntegration'));
const CTA = lazy(() => import('./components/CTA'));
const Footer = lazy(() => import('./components/Footer'));
const Aboutit = lazy(() => import('./components/Aboutit'));
const Login = lazy(() => import('./components/Auth/Login'));
const Signup = lazy(() => import('./components/Auth/Signup'));
const Profile = lazy(() => import('./components/Profile/Profile'));

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    ScrollTrigger.refresh();

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

const AppLoadingState = () => (
  <div
    className="loading-screen"
    style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--text-primary)',
    }}
  >
    Loading...
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <div className="app-main">
            <Navbar />
            <ErrorBoundary>
              <Suspense fallback={<AppLoadingState />}>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <>
                        <Hero />
                        <FoldMarqueeSection />
                        <Features />
                        <HowItWorks />
                        <LiveTransformation />
                        <BenefitsStory />
                        <IntegrationSection />
                        <CTA />
                        <Footer />
                      </>
                    }
                  />
                  <Route path="/about" element={<Aboutit />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
