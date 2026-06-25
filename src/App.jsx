/* ============================================================
   APP ENTRY — Routing & Global Elements
   ============================================================ */
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import CareersPage from './pages/CareersPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import KaruppiahNagarPage from './pages/KaruppiahNagarPage';
import AbiAndCoPage from './pages/AbiAndCoPage';
import ConsultancyPage from './pages/ConsultancyPage';
import LoanCalculatorPage from './pages/LoanCalculatorPage';
import CustomCursor from './components/CustomCursor';
import WhatsAppFAB from './components/WhatsAppFAB';
import AIAssistant from './components/AIAssistant';
import AIEstimator from './components/AIEstimator';

export default function App() {
  const [isEstimatorOpen, setIsEstimatorOpen] = useState(false);

  useEffect(() => {
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.lenis = lenis;

    // Connect Lenis scroll events to ScrollTrigger updates
    lenis.on('scroll', ScrollTrigger.update);

    // Sync GSAP ticker to run Lenis raf (requestAnimationFrame) loop
    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(tickerCallback);
    };
  }, []);

  return (
    <Router>
      {/* Premium Custom Cursor (Desktop only) */}
      <CustomCursor />

      {/* Floating Action Buttons */}
      <WhatsAppFAB />
      <AIAssistant onOpenEstimator={() => setIsEstimatorOpen(true)} />

      {/* Routes */}
      <Routes>
        <Route path="/" element={
              <HomePage
                isEstimatorOpen={isEstimatorOpen}
                setIsEstimatorOpen={setIsEstimatorOpen}
              />
            } />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/residential" element={<ProjectsPage category="residential" />} />
          <Route path="/projects/residential/:status" element={<ProjectsPage category="residential" />} />
          <Route path="/projects/commercial" element={<ProjectsPage category="commercial" />} />
          <Route path="/projects/commercial/:status" element={<ProjectsPage category="commercial" />} />
          <Route path="/projects/interiors" element={<ProjectsPage category="interiors" />} />
          <Route path="/projects/interiors/:status" element={<ProjectsPage category="interiors" />} />
          <Route path="/projects/consulting" element={<ProjectsPage category="consulting" />} />
          <Route path="/projects/consulting/:status" element={<ProjectsPage category="consulting" />} />
          <Route path="/projects/plots" element={<ProjectsPage category="plots" />} />
          <Route path="/projects/plots/:status" element={<ProjectsPage category="plots" />} />
          <Route path="/projects/karuppiah-nagar" element={<KaruppiahNagarPage />} />
          <Route path="/projects/abi-and-co-home-appliances" element={<AbiAndCoPage />} />
          <Route path="/projects/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/consultancy" element={<ConsultancyPage />} />
          <Route path="/loan-emi-calculator" element={<LoanCalculatorPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Global AI Cost Estimator Modal */}
      <AIEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </Router>
  );
}
