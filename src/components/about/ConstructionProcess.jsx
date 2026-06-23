/* ============================================================
   CONSTRUCTION PROCESS — Interactive Step Wizard
   ============================================================ */
import { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: '01', title: 'Consultation',
    desc: 'Every masterpiece begins with a conversation. We listen deeply to understand your vision, budget, lifestyle, and timeline — then craft a roadmap to bring it to life.',
    features: ['Free site visit & evaluation', 'Budget planning & feasibility study', 'Personalized project roadmap', 'Transparent cost breakdown'],
    image: '/assets/images/project-residential.png',
  },
  {
    num: '02', title: 'Design',
    desc: 'Our architects translate your dreams into detailed blueprints using cutting-edge 3D visualization, ensuring every space is optimized for beauty, function, and flow.',
    features: ['3D architectural visualization', 'Interior design concepts', 'Material selection guidance', 'Multiple revision rounds'],
    image: '/assets/images/project-interior.png',
  },
  {
    num: '03', title: 'Planning',
    desc: 'Meticulous planning ensures flawless execution. We handle permits, procurement, scheduling, and logistics so you can relax while we prepare every detail.',
    features: ['Government permits & approvals', 'Material procurement & quality testing', 'Detailed construction timeline', 'Safety & compliance checks'],
    image: '/assets/images/project-commercial.png',
  },
  {
    num: '04', title: 'Construction',
    desc: 'Watch your vision take shape. Our expert teams execute with precision, using premium materials and proven techniques under constant quality supervision.',
    features: ['Weekly progress reports', 'On-site quality inspections', 'Real-time project tracking', 'Premium material sourcing'],
    image: '/assets/images/project-turnkey.png',
  },
  {
    num: '05', title: 'Delivery',
    desc: 'The moment you\'ve been waiting for. A thorough quality audit, detailed walkthrough, and complete documentation ensure a seamless handover of your dream space.',
    features: ['Comprehensive quality audit', 'Final walkthrough & snag fixing', 'Documentation & warranty handover', 'Post-construction support'],
    image: '/assets/images/project-villa.png',
  },
];

export default function ConstructionProcess() {
  const sectionRef = useRef(null);
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef(null);

  const switchStep = useCallback((idx) => {
    if (idx === activeStep) return;

    // Animate out
    const tl = gsap.timeline();
    if (contentRef.current) {
      tl.to(contentRef.current, { opacity: 0, y: -15, duration: 0.25, ease: 'power2.in' });
      tl.call(() => setActiveStep(idx));
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'expo.out' }
      );
    } else {
      setActiveStep(idx);
    }
  }, [activeStep]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.process__steps',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.process__steps', start: 'top 85%' },
        }
      );

      gsap.fromTo('.process__content',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.process__content', start: 'top 85%' },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  const step = steps[activeStep];

  return (
    <section className="about-section process" ref={sectionRef}>
      <div className="container">
        <div className="process__header">
          <span className="about-section__label">How We Work</span>
          <h2 className="about-section__title">Our Construction Process</h2>
          <p className="about-section__subtitle" style={{ margin: '0 auto' }}>
            A proven 5-step methodology that transforms your vision into reality with precision and care.
          </p>
        </div>

        <div className="process__steps">
          {steps.map((s, i) => (
            <button
              key={i}
              className={`process__step-btn ${activeStep === i ? 'is-active' : ''}`}
              onClick={() => switchStep(i)}
            >
              <span className="process__step-num">{s.num}</span>
              {s.title}
            </button>
          ))}
        </div>

        <div className="process__content" ref={contentRef}>
          <div className="process__text">
            <h3 className="process__step-title">
              Step {step.num} — {step.title}
            </h3>
            <p className="process__step-desc">{step.desc}</p>
            <div className="process__features">
              {step.features.map((f, fi) => (
                <div className="process__feature" key={fi}>{f}</div>
              ))}
            </div>
          </div>
          <div className="process__visual">
            <img className="process__visual-img" src={step.image} alt={step.title} />
          </div>
        </div>
      </div>
    </section>
  );
}
