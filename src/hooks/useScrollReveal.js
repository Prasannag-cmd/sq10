/* ============================================================
   useScrollReveal — ScrollTrigger-based reveal animations
   Replaces data-animate attribute system
   ============================================================ */
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Apply scroll-triggered reveal animation to an element
 * @param {string} animationType - 'fade-up' | 'fade-left' | 'fade-right' | 'scale-in' | 'clip-reveal' | 'stagger-children'
 */
export function useScrollReveal(animationType = 'fade-up') {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    let ctx;

    const animationMap = {
      'fade-up': {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
      },
      'fade-left': {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' },
      },
      'fade-right': {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out' },
      },
      'scale-in': {
        from: { opacity: 0, scale: 0.85 },
        to: { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out' },
      },
      'clip-reveal': {
        from: { clipPath: 'inset(100% 0% 0% 0%)' },
        to: { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut' },
      },
    };

    ctx = gsap.context(() => {
      if (animationType === 'stagger-children') {
        gsap.fromTo(el.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      } else {
        const config = animationMap[animationType];
        if (config) {
          gsap.fromTo(el, config.from, {
            ...config.to,
            scrollTrigger: {
              trigger: el,
              start: animationType === 'clip-reveal' ? 'top 80%' : 'top 85%',
              toggleActions: 'play none none none',
            },
          });
        }
      }
    }, el);

    return () => ctx.revert();
  }, [animationType]);

  return ref;
}

/**
 * Apply scroll reveal to section labels
 */
export function useSectionLabelReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref.current);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Apply scroll reveal to section titles
 */
export function useSectionTitleReveal() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref.current);

    return () => ctx.revert();
  }, []);

  return ref;
}

/**
 * Batch apply scroll reveals to all data-animate elements within a container
 */
export function useScrollRevealBatch(containerRef) {
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    const ctx = gsap.context(() => {
      // Fade Up
      container.querySelectorAll('[data-animate="fade-up"]').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      // Fade Left
      container.querySelectorAll('[data-animate="fade-left"]').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      // Fade Right
      container.querySelectorAll('[data-animate="fade-right"]').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, x: 60 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      // Scale In
      container.querySelectorAll('[data-animate="scale-in"]').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      // Stagger Children
      container.querySelectorAll('[data-animate="stagger-children"]').forEach(parent => {
        gsap.fromTo(parent.children,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'expo.out',
            scrollTrigger: { trigger: parent, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });

      // Clip Reveal
      container.querySelectorAll('[data-animate="clip-reveal"]').forEach(el => {
        gsap.fromTo(el,
          { clipPath: 'inset(100% 0% 0% 0%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'expo.inOut',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' } }
        );
      });

      // Line Expand
      container.querySelectorAll('[data-animate="line-expand"]').forEach(el => {
        gsap.fromTo(el,
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 1, ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' } }
        );
      });

      // Section Labels
      container.querySelectorAll('.section__label').forEach(label => {
        gsap.fromTo(label,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: label, start: 'top 90%', toggleActions: 'play none none none' } }
        );
      });

      // Section Titles
      container.querySelectorAll('.section__title').forEach(title => {
        gsap.fromTo(title,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out',
            scrollTrigger: { trigger: title, start: 'top 85%', toggleActions: 'play none none none' } }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);
}

export default useScrollReveal;
