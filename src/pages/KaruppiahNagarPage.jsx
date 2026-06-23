/* ============================================================
   KARUPPIAH NAGAR — Premium Available Plots Page
   Dedicated luxury page for the Karuppiah Nagar plot project
   ============================================================ */
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import ProjectOverview from '../components/ProjectOverview';
import ProjectPoster from '../components/ProjectPoster';
import MasterPlan from '../components/MasterPlan';
import PlotsInventory from '../components/PlotsInventory';
import LocationMap from '../components/LocationMap';
import DocumentModal from '../components/DocumentModal';
import CTASection from '../components/CTASection';

export default function KaruppiahNagarPage() {
  const [activePhase, setActivePhase] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');
  }, []);

  return (
    <div className="karuppiah-nagar-page app-layout is-ready">
      <Navbar alwaysScrolled />
      <main>
        <HeroSection />
        <ProjectOverview />
        <ProjectPoster activePhase={activePhase} />
        <MasterPlan activePhase={activePhase} setActivePhase={setActivePhase} />
        <PlotsInventory activePhase={activePhase} />
        <LocationMap />
        <DocumentModal />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

