/* ============================================================
   CORE VALUES — Animated Icon Cards
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const values = [
  { icon: '💎', title: 'Excellence', desc: 'We pursue perfection in every detail — from foundation to finishing. Our work speaks louder than words.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparent pricing, honest timelines, and ethical practices form the bedrock of every client relationship.' },
  { icon: '💡', title: 'Innovation', desc: 'We embrace cutting-edge construction technologies, sustainable materials, and AI-driven design to stay ahead.' },
  { icon: '🌿', title: 'Sustainability', desc: 'Green building practices, energy efficiency, and environmentally conscious design are core to our approach.' },
  { icon: '👥', title: 'Client First', desc: 'Your vision drives our work. We listen, collaborate, and deliver spaces that exceed your expectations.' },
  { icon: '🏗️', title: 'Quality Craftsmanship', desc: 'Premium materials, skilled artisans, and rigorous quality checks ensure structures built to last generations.' },
];

export default function CoreValues() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const cards = sectionRef.current.querySelectorAll('.value-card');
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.core-values__grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section core-values" ref={sectionRef}>
      <div className="container">
        <div className="core-values__header">
          <span className="about-section__label">Our Values</span>
          <h2 className="about-section__title">What We Stand For</h2>
          <p className="about-section__subtitle" style={{ margin: '0 auto' }}>
            Six pillars that guide every decision, every design, and every structure we create.
          </p>
        </div>

        <div className="core-values__grid">
          {values.map((v, i) => (
            <div className="value-card" key={i}>
              <div className="value-card__icon">{v.icon}</div>
              <h3 className="value-card__title">{v.title}</h3>
              <p className="value-card__desc">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
