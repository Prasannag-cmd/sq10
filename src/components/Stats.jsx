/* ============================================================
   STATS — Animated Number Counters
   ============================================================ */
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { target: 10, suffix: '+', label: 'Years of Excellence' },
  { target: 250, suffix: '+', label: 'Projects Completed' },
  { target: 180, suffix: '+', label: 'Happy Clients' },
  { target: 50, suffix: '+', label: 'Team Members' },
];

function StatItem({ target, suffix, label }) {
  const numberRef = useRef(null);

  useEffect(() => {
    if (!numberRef.current) return;
    const el = numberRef.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          const counter = { value: 0 };
          gsap.to(counter, {
            value: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.innerHTML = Math.round(counter.value) +
                `<span class="stat-item__suffix">${suffix}</span>`;
            },
          });
        },
      });
    });

    return () => ctx.revert();
  }, [target, suffix]);

  return (
    <div className="stat-item" data-animate="fade-up">
      <div
        className="stat-item__number"
        ref={numberRef}
        data-target={target}
        data-suffix={suffix}
      >
        0{suffix}
      </div>
      <div className="stat-item__label">{label}</div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);

  // Fade-up animation for stat items
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current.querySelectorAll('.stat-item');
      gsap.fromTo(items,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section stats" id="stats" ref={sectionRef}>
      <div className="container">
        <div className="stats__grid">
          {stats.map(s => (
            <StatItem key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
