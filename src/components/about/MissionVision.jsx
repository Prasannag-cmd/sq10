/* ============================================================
   MISSION & VISION — Glassmorphism Premium Cards
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MissionVision() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.mv-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1,
          duration: 0.9,
          stagger: 0.2,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.mission-vision__grid',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section mission-vision" ref={sectionRef}>
      <div className="container">
        <div className="mission-vision__header">
          <span className="about-section__label">What Drives Us</span>
          <h2 className="about-section__title">Our Mission & Vision</h2>
        </div>

        <div className="mission-vision__grid">
          <div className="mv-card">
            <span className="mv-card__icon">🎯</span>
            <h3 className="mv-card__title">Our Mission</h3>
            <p className="mv-card__text">
              To deliver construction excellence that transforms communities and creates lasting value.
              We combine innovative engineering, premium materials, and meticulous craftsmanship to build
              structures that inspire confidence and stand the test of time. Every project is a promise —
              of quality, transparency, and exceeding expectations.
            </p>
          </div>

          <div className="mv-card">
            <span className="mv-card__icon">🔭</span>
            <h3 className="mv-card__title">Our Vision</h3>
            <p className="mv-card__text">
              To be the most trusted and innovative construction company in India — setting new standards
              in sustainable design, smart building technologies, and client-centric construction.
              We envision a future where every structure we build becomes a landmark of architectural
              achievement and environmental responsibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
