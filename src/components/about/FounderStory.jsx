/* ============================================================
   FOUNDER STORY — Pinned Editorial Storytelling Section
   Height: 300vh, ScrollTrigger Pinning, Cinematic Fades
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Ambient dust particles
const ambientParticlesData = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  size: Math.random() * 2.5 + 1,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: Math.random() * 10 + 7,
  delay: Math.random() * -12,
}));

export default function FounderStory() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const blueprintRef = useRef(null);
  const portraitRef = useRef(null);

  // Split start text into individual characters for letter-by-letter reveal
  const startText = "Every legacy begins with a vision.";
  const startTextChars = Array.from(startText);

  useEffect(() => {
    if (!containerRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      // Master timeline synced to the scroll duration of the pin
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: '+=200%', // Scroll travel of 300vh total
          scrub: true,
          invalidateOnRefresh: true,
        }
      });

      // --- STAGE 1 (0.0 to 0.15): Character Reveal & Blueprint Draw ---
      tlScroll.fromTo('.start-text-char',
        { opacity: 0, filter: 'blur(10px)', y: 15 },
        {
          opacity: 1,
          filter: 'blur(0px)',
          y: 0,
          stagger: 0.03,
          duration: 1.5,
          ease: 'power2.out',
        },
        0
      );

      // Draw blueprints simultaneously
      tlScroll.fromTo('.blueprint-line',
        { strokeDashoffset: 900 },
        { strokeDashoffset: 0, duration: 1.8, ease: 'none', stagger: 0.02 },
        0
      );

      // --- STAGE 2 (0.15 to 0.20): Fade out Start text ---
      tlScroll.to('.story-content--start', {
        opacity: 0,
        filter: 'blur(15px)',
        y: -40,
        duration: 0.5,
        ease: 'power2.inOut',
      }, 1.5);

      // --- STAGE 3 (0.20 to 0.52): Massive Phrases Cycle ---
      // Phrase 1: "One Architect."
      tlScroll.fromTo('.phrase--1',
        { opacity: 0, filter: 'blur(10px)', scale: 0.9, y: 30 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        2.0
      );
      tlScroll.to('.phrase--1', {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.05,
        y: -30,
        duration: 0.6,
        ease: 'power3.in'
      }, 2.8);

      // Phrase 2: "One Vision."
      tlScroll.fromTo('.phrase--2',
        { opacity: 0, filter: 'blur(10px)', scale: 0.9, y: 30 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        3.4
      );
      tlScroll.to('.phrase--2', {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.05,
        y: -30,
        duration: 0.6,
        ease: 'power3.in'
      }, 4.2);

      // Phrase 3: "One Dream."
      tlScroll.fromTo('.phrase--3',
        { opacity: 0, filter: 'blur(10px)', scale: 0.9, y: 30 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        4.8
      );
      tlScroll.to('.phrase--3', {
        opacity: 0,
        filter: 'blur(10px)',
        scale: 1.05,
        y: -30,
        duration: 0.6,
        ease: 'power3.in'
      }, 5.6);

      // Phrase 4: "Thousands Inspired."
      tlScroll.fromTo('.phrase--4',
        { opacity: 0, filter: 'blur(10px)', scale: 0.9, y: 30 },
        { opacity: 1, filter: 'blur(0px)', scale: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        6.2
      );
      tlScroll.to('.phrase--4', {
        opacity: 0,
        filter: 'blur(15px)',
        scale: 1.1,
        y: -40,
        duration: 0.8,
        ease: 'power3.inOut'
      }, 7.0);

      // --- STAGE 4 (0.52 to 0.70): Blueprint Fades, Portrait Emerges ---
      // Blueprint out, real visuals in
      tlScroll.to(blueprintRef.current, {
        opacity: 0,
        filter: 'blur(25px)',
        scale: 0.9,
        duration: 1.2,
        ease: 'power2.inOut',
      }, 7.2);

      tlScroll.fromTo('.story-bg--real',
        { opacity: 0, filter: 'blur(15px)', scale: 1.15 },
        { opacity: 0.5, filter: 'blur(0px)', scale: 1.05, duration: 1.5, ease: 'power2.out' },
        7.4
      );

      // Portrait emerges from darkness
      tlScroll.fromTo('.founder-portrait__wrap',
        { opacity: 0, filter: 'brightness(0) blur(10px)', scale: 1.02, y: 50 },
        {
          opacity: 1,
          filter: 'brightness(1) blur(0px)',
          scale: 1.05,
          y: 0,
          duration: 1.8,
          ease: 'power3.out',
        },
        7.6
      );

      // Portrait continuous slow scaling (simulates parallax zoom)
      tlScroll.to('.founder-portrait__img', {
        scale: 1.12,
        y: -20,
        duration: 3.5,
        ease: 'none',
      }, 7.6);

      // Diagonal Light Sweep animation across portrait
      tlScroll.fromTo('.founder-portrait__sweep',
        { left: '-100%' },
        { left: '200%', duration: 2.0, ease: 'power2.inOut' },
        8.0
      );

      // --- STAGE 5 (0.70 to 0.95): Story Revealed Line-by-Line ---
      tlScroll.fromTo('.story-content--founder',
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        8.4
      );

      const storyLines = document.querySelectorAll('.narrative-line');
      storyLines.forEach((line, idx) => {
        tlScroll.fromTo(line,
          { y: '110%', opacity: 0, filter: 'blur(6px)' },
          {
            y: '0%',
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'power3.out',
          },
          8.8 + idx * 0.9 // sequential reveals
        );
      });

      // Signature reveal
      tlScroll.fromTo('.narrative__signature',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power2.out' },
        12.2
      );

      // --- STAGE 6 (0.95 to 1.0): Pinned stage fade to release scroll ---
      tlScroll.to('.story-content--founder, .story-bg--real', {
        opacity: 0,
        y: -50,
        duration: 0.8,
        ease: 'power2.inOut',
      }, 13.5);

    }, containerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="founder-story-container" ref={containerRef}>
      <div className="founder-story-pin" ref={pinRef}>
        {/* Background 1: Architectural Blueprint Sketch */}
        <div className="story-bg story-bg--blueprint" ref={blueprintRef}>
          <svg viewBox="0 0 1000 600" className="blueprint-svg">
            {/* Grid markings */}
            <line x1="50" y1="50" x2="950" y2="50" className="blueprint-line" style={{ strokeDasharray: 900 }} />
            <line x1="50" y1="150" x2="950" y2="150" className="blueprint-line" style={{ strokeDasharray: 900 }} />
            <line x1="50" y1="250" x2="950" y2="250" className="blueprint-line" style={{ strokeDasharray: 900 }} />
            <line x1="50" y1="350" x2="950" y2="350" className="blueprint-line" style={{ strokeDasharray: 900 }} />
            <line x1="50" y1="450" x2="950" y2="450" className="blueprint-line" style={{ strokeDasharray: 900 }} />
            <line x1="50" y1="550" x2="950" y2="550" className="blueprint-line" style={{ strokeDasharray: 900 }} />
            
            <line x1="100" y1="50" x2="100" y2="550" className="blueprint-line" style={{ strokeDasharray: 500 }} />
            <line x1="250" y1="50" x2="250" y2="550" className="blueprint-line" style={{ strokeDasharray: 500 }} />
            <line x1="400" y1="50" x2="400" y2="550" className="blueprint-line" style={{ strokeDasharray: 500 }} />
            <line x1="550" y1="50" x2="550" y2="550" className="blueprint-line" style={{ strokeDasharray: 500 }} />
            <line x1="700" y1="50" x2="700" y2="550" className="blueprint-line" style={{ strokeDasharray: 500 }} />
            <line x1="850" y1="50" x2="850" y2="550" className="blueprint-line" style={{ strokeDasharray: 500 }} />

            {/* Architectural Layout walls drafting themselves */}
            <rect x="180" y="110" width="640" height="380" className="blueprint-line" style={{ strokeDasharray: 2100 }} />
            <line x1="480" y1="110" x2="480" y2="490" className="blueprint-line" style={{ strokeDasharray: 380 }} />
            <line x1="480" y1="300" x2="820" y2="300" className="blueprint-line" style={{ strokeDasharray: 340 }} />
            <line x1="180" y1="340" x2="480" y2="340" className="blueprint-line" style={{ strokeDasharray: 300 }} />

            {/* Pillars */}
            <rect x="175" y="105" width="10" height="10" className="blueprint-line" style={{ strokeDasharray: 40 }} />
            <rect x="475" y="105" width="10" height="10" className="blueprint-line" style={{ strokeDasharray: 40 }} />
            <rect x="815" y="105" width="10" height="10" className="blueprint-line" style={{ strokeDasharray: 40 }} />
            <rect x="175" y="485" width="10" height="10" className="blueprint-line" style={{ strokeDasharray: 40 }} />
            <rect x="475" y="485" width="10" height="10" className="blueprint-line" style={{ strokeDasharray: 40 }} />
            <rect x="815" y="485" width="10" height="10" className="blueprint-line" style={{ strokeDasharray: 40 }} />

            {/* Door swing arcs */}
            <path d="M 480,210 A 45,45 0 0,1 525,255" className="blueprint-line" style={{ strokeDasharray: 80 }} />
            <path d="M 380,340 A 45,45 0 0,1 425,295" className="blueprint-line" style={{ strokeDasharray: 80 }} />

            {/* Dimension Lines */}
            <line x1="180" y1="90" x2="820" y2="90" className="blueprint-line" style={{ strokeDasharray: 640 }} />
            <path d="M 180,85 L 180,95 M 820,85 L 820,95" className="blueprint-line" style={{ strokeDasharray: 30 }} />
          </svg>
        </div>

        {/* Background 2: Real Construction Visuals */}
        <div className="story-bg story-bg--real">
          <img src="/assets/images/hero-bg.png" alt="Real architectural project visual backdrop" />
        </div>

        {/* Soft Moving Ambient Light Rays */}
        <div className="story-bg__light-rays" />

        {/* Cinematic Darkness Filter Overlay */}
        <div className="story-bg__overlay" />

        {/* Floating Ambient particles (Gold dust) */}
        <div className="story-bg__ambient-particles">
          {ambientParticlesData.map((p) => (
            <div
              key={p.id}
              className="ambient-particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                top: `${p.top}%`,
                '--duration': `${p.duration}s`,
                '--delay': `${p.delay}s`,
              }}
            />
          ))}
        </div>

        {/* ── START SCREEN ── */}
        <div className="story-content story-content--start">
          <h2 className="start-text">
            {startTextChars.map((char, idx) => (
              <span
                key={idx}
                className="start-text-char"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>
        </div>

        {/* ── PHASE 1 PHRASES ── */}
        <div className="story-content story-content--phrases">
          <h2 className="massive-phrase phrase--1">One Architect.</h2>
          <h2 className="massive-phrase phrase--2">One Vision.</h2>
          <h2 className="massive-phrase phrase--3">One Dream.</h2>
          <h2 className="massive-phrase phrase--4">Thousands Inspired.</h2>
        </div>

        {/* ── PHASE 2 & 3: STORY SPLIT LAYOUT ── */}
        <div className="story-content story-content--founder">
          <div className="founder-grid-container">
            {/* Portrait Column */}
            <div className="founder-portrait__wrap" ref={portraitRef}>
              <img className="founder-portrait__img" src="/assets/images/about-story.jpg" alt="Squaare Ten Constructions Corporate Office Reception" />
              <div className="founder-portrait__sweep" />
              <div className="founder-portrait__frame" />
            </div>

            {/* Narrative Column */}
            <div className="founder-narrative__content">
              <span className="narrative__label">Our Founders</span>
              <div className="narrative-lines">
                <div className="narrative-line-wrap">
                  <p className="narrative-line">
                    Over a decade ago, Srinivasan and Praveen Kumar set out with a singular vision — to redefine what construction means in India.
                  </p>
                </div>
                <div className="narrative-line-wrap">
                  <p className="narrative-line">
                    Armed with architectural and engineering expertise and an unshakable belief in quality, they founded Squaareten.
                  </p>
                </div>
                <div className="narrative-line-wrap">
                  <p className="narrative-line">
                    Today, that dream has materialized into 250+ landmark projects and a team of 50+ dedicated professionals.
                  </p>
                </div>
                <div className="narrative-line-wrap">
                  <p className="narrative-line highlight-conclusion">
                    A reputation built on precision, transparency, and excellence.
                  </p>
                </div>
              </div>

              <div className="narrative__signature">
                <span className="signature__name">Srinivasan & Praveen Kumar</span>
                <span className="signature__role">Co-Founders & Directors</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
