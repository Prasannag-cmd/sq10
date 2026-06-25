/* ============================================================
   BEFORE & AFTER SHOWCASE — Interactive Image Comparison
   ============================================================ */
import { useRef, useState, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BeforeAfterShowcase() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [position, setPosition] = useState(50);
  const isDragging = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const onPointerDown = useCallback((e) => {
    isDragging.current = true;
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    updatePosition(e.clientX);
  }, [updatePosition]);

  const onPointerUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.ba-slider',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: { trigger: '.ba-slider', start: 'top 85%' },
        }
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section className="about-section before-after" ref={sectionRef}>
      <div className="container">
        <div className="before-after__header">
          <span className="about-section__label">Transformations</span>
          <h2 className="about-section__title">Before & After</h2>
          <p className="about-section__subtitle" style={{ margin: '0 auto' }}>
            Witness the power of premium construction — drag to reveal the transformation.
          </p>
        </div>

        <div
          className="ba-slider"
          ref={sliderRef}
          onPointerDown={onPointerDown}
        >
          {/* After image (full background) */}
          <div className="ba-slider__after">
            <img src="/assets/images/after-construction.jpg" alt="Completed construction" />
          </div>

          {/* Before image (clipped) */}
          <div
            className="ba-slider__before"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img src="/assets/images/before-construction.jpg" alt="Design visualization" />
          </div>

          {/* Handle */}
          <div
            className="ba-slider__handle"
            style={{ left: `${position}%` }}
          />

          <span className="ba-slider__label ba-slider__label--before">Before</span>
          <span className="ba-slider__label ba-slider__label--after">After</span>
        </div>
      </div>
    </section>
  );
}
