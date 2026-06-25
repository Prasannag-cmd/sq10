/* ============================================================
   ABOUT PAGE — Premium Cinematic Storytelling Experience
   ============================================================ */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';

gsap.registerPlugin(ScrollTrigger);
import Footer from '../components/Footer';
import HeroSection from '../components/about/HeroSection';
import FounderStory from '../components/about/FounderStory';
import JourneyTimeline from '../components/about/JourneyTimeline';
import MissionVision from '../components/about/MissionVision';
import CoreValues from '../components/about/CoreValues';
import WhyChooseUs from '../components/about/WhyChooseUs';
import LeadershipTeam from '../components/about/LeadershipTeam';
import AwardsMarquee from '../components/about/AwardsMarquee';
import BeforeAfterShowcase from '../components/about/BeforeAfterShowcase';
import ConstructionProcess from '../components/about/ConstructionProcess';
import FinalCTA from '../components/about/FinalCTA';

export default function AboutPage() {
  // Scroll to top on mount and unlock scrolling if deep linked
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');

    // Refresh ScrollTrigger after DOM has settled to ensure correct trigger positions
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 250);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="about-page app-layout is-ready">
      <Navbar alwaysScrolled />

      <main>
        <HeroSection />
        <FounderStory />
        <JourneyTimeline />
        <MissionVision />
        <CoreValues />
        <WhyChooseUs />
        <LeadershipTeam />
        <AwardsMarquee />
        <BeforeAfterShowcase />
        <ConstructionProcess />
        <FinalCTA />
      </main>

      <Footer />
      {window.myConsoleErrors && window.myConsoleErrors.length > 0 && (
        <div id="crash-debugger" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '30vh', background: 'red', color: 'white', zIndex: 99999, overflow: 'scroll', padding: '20px' }}>
          <h3>CRASH LOGS:</h3>
          {window.myConsoleErrors.map((err, i) => (
            <pre key={i}>{err}</pre>
          ))}
        </div>
      )}
    </div>
  );
}
