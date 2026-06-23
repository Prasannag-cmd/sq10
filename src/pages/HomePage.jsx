/* ============================================================
   HOMEPAGE
   Composes the core sections and manages the onboarding/boot cycle
   ============================================================ */
import { useState } from 'react';
import Onboarding from '../components/Onboarding';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import FutureProjects from '../components/Services';
import PlotsShowcase from '../components/PlotsShowcase';

import TamilNaduExplorer from '../components/TamilNaduExplorer';

import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AIEstimator from '../components/AIEstimator';

export default function HomePage({ isEstimatorOpen, setIsEstimatorOpen }) {
  const [onboardingComplete, setOnboardingComplete] = useState(false);

  return (
    <>
      {/* Onboarding Loader Screen */}
      <Onboarding onComplete={() => setOnboardingComplete(true)} />

      {/* Main Layout */}
      <div className={`app-layout ${onboardingComplete ? 'is-ready' : ''}`}>
        <Navbar isVisible={onboardingComplete} />
        <main>
          <Hero isReady={onboardingComplete} onOpenEstimator={() => setIsEstimatorOpen(true)} />
          <About />
          <FutureProjects />
          <PlotsShowcase />
          <TamilNaduExplorer />


          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Estimator Modal */}
      <AIEstimator isOpen={isEstimatorOpen} onClose={() => setIsEstimatorOpen(false)} />
    </>
  );
}
