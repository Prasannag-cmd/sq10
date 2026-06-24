import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_DATA = [
  { title: 'Entrance Arch', img: '/assets/images/plots-slide-2.png' },
  { title: 'Internal Roads', img: '/assets/images/plots-slide-3.png' },
  { title: 'Park Area', img: '/assets/images/plots-slide-4.png' },
  { title: 'Development Progress', img: '/assets/images/plots-slide-5.png' },
  { title: 'Aerial View', img: '/assets/images/plots-slide-1.png' }
];

export default function ProjectGallery() {
  const sectionRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo('.kn-gallery__title-main',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      gsap.fromTo('.kn-gallery__card',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 280,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="kn-gallery" id="kn-gallery" ref={sectionRef}>
      <div className="kn-container">
        
        <div className="kn-section-header kn-gallery__title-main" style={{ marginBottom: '3rem' }}>
          <span className="kn-section-tag" style={{ color: 'var(--color-accent)', letterSpacing: '2px' }}>VISUAL SHOWER</span>
          <h2 className="kn-section-title" style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', color: 'var(--color-white)' }}>
            Project Gallery
          </h2>
          <div style={{ width: '40px', height: '1.5px', background: 'var(--color-accent)', marginTop: '15px' }} />
        </div>

        <div className="kn-gallery__slider-container">
          <div className="kn-gallery__slider-inner" ref={scrollContainerRef}>
            {GALLERY_DATA.map((item, idx) => (
              <div className="kn-gallery__card" key={idx}>
                <div className="kn-gallery__card-img">
                  <img src={item.img} alt={item.title} />
                </div>
                <div className="kn-gallery__card-body">
                  <span className="kn-gallery__card-title">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Slider Next Control Button */}
          <div className="kn-gallery__nav-btn" onClick={handleNext}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
}
