/* ============================================================
   PROJECT OVERVIEW — Glassmorphism cards with stats
   ============================================================ */
import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { icon: '📍', label: 'Location', value: 'Kovilpapakudi, Madurai' },
  { icon: '📐', label: 'Total Area', value: '2+ Acres' },
  { icon: '🏗️', label: 'Developer', value: 'Squareten Constructions' },
  { icon: '📋', label: 'Approval', value: 'DTCP Approved' },
  { icon: '🛣️', label: 'Road Width', value: '30 & 40 ft Roads' },
  { icon: '💧', label: 'Amenities', value: 'Water, Electricity, Drainage' },
];

const highlights = [
  { title: 'Prime Location', desc: 'Located in the rapidly growing Kovilpapakudi area with excellent connectivity to Madurai city center.' },
  { title: 'Legal Assurance', desc: 'DTCP approved layout with clear title deeds and hassle-free registration process.' },
  { title: 'Modern Infrastructure', desc: 'Well-planned roads, underground drainage, street lighting, and landscaped common areas.' },
  { title: 'Investment Value', desc: 'Property values in this corridor have shown consistent appreciation year over year.' },
];

export default function ProjectOverview() {
  useEffect(() => {
    gsap.utils.toArray('.kn-overview__card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    });
    gsap.utils.toArray('.kn-highlight__card').forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
        {
          opacity: 1, x: 0, duration: 0.7, delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
        }
      );
    });
  }, []);

  return (
    <section className="kn-overview" id="kn-overview">
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Project Details</span>
          <h2 className="kn-section-title">About This Project</h2>
          <p className="kn-section-desc">
            Karuppiah Nagar is a premium residential plot development offering thoughtfully planned plots with modern infrastructure and excellent connectivity.
          </p>
        </div>

        <div className="kn-overview__grid">
          {stats.map((s, i) => (
            <div className="kn-overview__card" key={i}>
              <span className="kn-overview__icon">{s.icon}</span>
              <span className="kn-overview__label">{s.label}</span>
              <span className="kn-overview__value">{s.value}</span>
            </div>
          ))}
        </div>

        <div className="kn-highlight__grid">
          {highlights.map((h, i) => (
            <div className="kn-highlight__card" key={i}>
              <div className="kn-highlight__number">0{i + 1}</div>
              <h3 className="kn-highlight__title">{h.title}</h3>
              <p className="kn-highlight__desc">{h.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
