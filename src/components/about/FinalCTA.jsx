/* ============================================================
   FINAL CTA — Fullscreen Luxury Call To Action
   ============================================================ */
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax background
      gsap.to('.final-cta__bg img', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });

      // Content reveal
      const contentEls = sectionRef.current.querySelectorAll('.final-cta__content > *');
      gsap.fromTo(contentEls,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.final-cta__content',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final-cta" ref={sectionRef}>
      <div className="final-cta__bg">
        <img src="/assets/images/project-villa.png" alt="Luxury construction" />
      </div>
      <div className="final-cta__overlay" />
      <div className="final-cta__glow" />

      <div className="final-cta__content">
        <h2 className="final-cta__title">
          Ready To Shape The<br />Future Together?
        </h2>
        <p className="final-cta__subtitle">
          Let's build spaces that inspire generations. Your vision, our expertise —
          together we create extraordinary.
        </p>
        <div className="final-cta__actions">
          <Link to="/#contact" className="btn--gold">Start Your Project</Link>
          <a href="tel:+919750008484" className="btn--ghost">Contact Us</a>
        </div>
      </div>
    </section>
  );
}
