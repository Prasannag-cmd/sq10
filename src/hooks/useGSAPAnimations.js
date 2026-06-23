/* ============================================================
   useGSAPAnimations — GSAP + ScrollTrigger integration for React
   ============================================================ */
import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Creates a GSAP timeline scoped to a container ref.
 * Auto-cleans up on unmount.
 */
export function useGSAPTimeline(containerRef, timelineConfig = {}, deps = []) {
  const tlRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      tlRef.current = gsap.timeline(timelineConfig);
    }, containerRef);

    return () => ctx.revert();
  }, deps);

  return tlRef;
}

/**
 * Hero entrance animations
 */
export function useHeroAnimation(heroRef, isReady) {
  useEffect(() => {
    if (!heroRef.current || !isReady) return;

    const hero = heroRef.current;
    const bg = hero.querySelector('.hero__bg');
    const label = hero.querySelector('.hero__label');
    const title = hero.querySelector('.hero__title');
    const desc = hero.querySelector('.hero__description');
    const actions = hero.querySelector('.hero__actions');
    const scroll = hero.querySelector('.hero__scroll');
    const shapes = hero.querySelectorAll('.hero__shape');

    const ctx = gsap.context(() => {
      // Text Entrance Timeline
      const tl = gsap.timeline({ delay: 0.3 });

      // Label slides in
      tl.to(label, {
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      });

      // Title — split into lines and reveal
      if (title) {
        const titleLines = title.querySelectorAll('.split-line__inner');
        if (titleLines.length) {
          tl.to(titleLines, {
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'expo.out',
          }, '-=0.3');
        } else {
          tl.fromTo(title,
            { opacity: 0, y: 60 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' },
            '-=0.3'
          );
        }
      }

      // Description fades in
      tl.to(desc, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4');

      // CTA buttons
      tl.to(actions, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');

      // Scroll indicator
      if (scroll) {
        tl.to(scroll, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
        }, '-=0.2');
      }

      // Floating shapes
      if (shapes.length) {
        tl.to(shapes, {
          opacity: 0.15,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        }, '-=0.6');

        // Continuous subtle float
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: `${15 + i * 5}`,
            rotation: `+=${5 + i * 3}`,
            duration: 3 + i,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });
        });
      }

      // Background Parallax
      if (bg) {
        gsap.to(bg, {
          y: '-20%',
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }

      // Hero content parallax on scroll
      const content = hero.querySelector('.hero__content');
      if (content) {
        gsap.to(content, {
          y: 100,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'center center',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, hero);

    return () => ctx.revert();
  }, [isReady]);
}

/**
 * Onboarding cinematic animation
 * Returns a promise that resolves when animation completes
 */
export function useOnboardingAnimation(onboardingRef, onExitStart, onComplete) {
  useEffect(() => {
    if (!onboardingRef.current) return;

    const el = onboardingRef.current;
    const logo = el.querySelector('.onboarding__logo');
    const glow = el.querySelector('.onboarding__glow');
    const name = el.querySelector('.onboarding__name');
    const tagline = el.querySelector('.onboarding__tagline');
    const progressBar = el.querySelector('.onboarding__progress-bar');
    const corners = el.querySelectorAll('.onboarding__corner');
    const particles = el.querySelectorAll('.onboarding__particle');

    document.documentElement.classList.add('is-loading');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        }
      });

      // Phase 1: Ambient Particles
      tl.to(particles, {
        opacity: (i) => 0.2 + Math.random() * 0.5,
        x: () => (Math.random() - 0.5) * 300,
        y: () => (Math.random() - 0.5) * 300,
        duration: 1.5,
        stagger: 0.05,
        ease: 'power2.out',
      }, 0);

      // Progress bar fills
      tl.to(progressBar, {
        width: '100%',
        duration: 3.2,
        ease: 'power1.inOut',
      }, 0);

      // Phase 2: Corner decorations
      tl.to(corners, {
        opacity: 0.3,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      }, 0.3);

      // Phase 3: Golden glow pulse
      tl.to(glow, {
        opacity: 0.6,
        scale: 1.2,
        duration: 1.5,
        ease: 'power2.inOut',
      }, 0.5);

      tl.to(glow, {
        opacity: 0.3,
        scale: 1,
        duration: 1,
        ease: 'power2.inOut',
      }, 2);

      // Phase 4: Logo reveal
      tl.to(logo, {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.2,
        ease: 'expo.out',
      }, 0.8);

      // Phase 5: Company name
      tl.to(name, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'expo.out',
      }, 1.8);

      // Phase 6: Tagline
      tl.to(tagline, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
      }, 2.3);

      // Phase 7: Exit
      tl.to(el, {
        y: '-100%',
        duration: 0.8,
        ease: 'expo.inOut',
        delay: 0.2,
        onStart: () => {
          document.documentElement.classList.remove('is-loading');
          onExitStart?.();
        }
      }, 3.2);
    }, el);

    return () => ctx.revert();
  }, []);
}

export { gsap, ScrollTrigger };
