/* ============================================================
   JOURNEY TIMELINE — Interactive Company Milestones
   ============================================================ */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const milestoneData = [
  { year: '2014', title: 'Foundation', desc: 'Squaareten Construction Pvt Ltd is established in Madurai, specializing in custom residential designs.' },
  { year: '2017', title: 'Turnkey Villas', desc: 'Launches full-scale design-and-build turnkey villa services, expanding operations to Coimbatore.' },
  { year: '2020', title: 'Chennai Office', desc: 'Establishes a corporate division in Chennai to spearhead premium commercial buildings and luxury apartments.' },
  { year: '2023', title: '500+ Handovers', desc: 'Achieves a landmark milestone of delivering over 500 projects across Tamil Nadu with 100% quality retention.' },
  { year: '2026', title: 'Future Smart Villas', desc: 'Introduces VR design reviews, BIM workflows, and zero-carbon building frameworks.' }
];

export default function JourneyTimeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const line = containerRef.current.querySelector('.journey-line-path');
      const nodes = containerRef.current.querySelectorAll('.journey-node-circle');
      const milestones = containerRef.current.querySelectorAll('.journey-milestone');

      // Scroll drawing path timeline
      gsap.fromTo(line, 
        { strokeDasharray: 800, strokeDashoffset: 800 },
        {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1.5
          }
        }
      );

      // Node pulses and milestones slides
      milestones.forEach((milestone, idx) => {
        gsap.fromTo(milestone,
          { opacity: 0, x: idx % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: milestone,
              start: 'top 80%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        if (nodes[idx]) {
          gsap.fromTo(nodes[idx],
            { scale: 0, fill: '#0a0a0a' },
            {
              scale: 1,
              fill: 'var(--color-accent)',
              scrollTrigger: {
                trigger: milestone,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="journey-section" ref={containerRef}>
      <div className="journey-container">
        <h2 className="journey-title">
          Our Journey
        </h2>

        <div className="journey-timeline-wrapper">
          {/* Central Vertical SVG path line */}
          <div className="journey-line-container">
            <svg className="journey-line-svg" viewBox="0 0 4 800" preserveAspectRatio="none">
              <line className="journey-line-path" x1="2" y1="0" x2="2" y2="800" stroke="var(--color-accent)" strokeWidth="2" strokeDasharray="800" strokeDashoffset="800" fill="none" />
            </svg>
          </div>

          {milestoneData.map((milestone, idx) => {
            const isLeft = idx % 2 === 0;
            const milestoneClass = `journey-milestone ${isLeft ? 'journey-milestone--left' : 'journey-milestone--right'}`;
            return (
              <div key={idx} className={milestoneClass}>
                {/* Node Circle */}
                <div className="journey-node-container">
                  <svg className="journey-node-svg">
                    <circle className="journey-node-circle" cx="10" cy="10" r="6" stroke="var(--color-accent)" strokeWidth="2" fill="#0a0a0a" style={{ transformOrigin: 'center', willChange: 'transform, fill' }} />
                  </svg>
                </div>

                {/* Milestone Detail Card */}
                <div className="journey-card">
                  <span className="journey-card__year">
                    {milestone.year}
                  </span>
                  <h4 className="journey-card__title">
                    {milestone.title}
                  </h4>
                  <p className="journey-card__desc">
                    {milestone.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
