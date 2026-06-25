/* ============================================================
   SCROLL ANIMATIONS — Generic ScrollTrigger Reveals
   data-animate attribute system
   ============================================================ */

export function initScrollAnimations() {
  // ── Fade Up ──
  const fadeUpEls = document.querySelectorAll('[data-animate="fade-up"]');
  fadeUpEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Fade Left ──
  const fadeLeftEls = document.querySelectorAll('[data-animate="fade-left"]');
  fadeLeftEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -60 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Fade Right ──
  const fadeRightEls = document.querySelectorAll('[data-animate="fade-right"]');
  fadeRightEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: 60 },
      {
        opacity: 1, x: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Scale In ──
  const scaleInEls = document.querySelectorAll('[data-animate="scale-in"]');
  scaleInEls.forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, scale: 0.85 },
      {
        opacity: 1, scale: 1,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Stagger Children ──
  const staggerParents = document.querySelectorAll('[data-animate="stagger-children"]');
  staggerParents.forEach(parent => {
    const children = parent.children;
    gsap.fromTo(children,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: parent,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Image Reveal with Clip Path ──
  const clipEls = document.querySelectorAll('[data-animate="clip-reveal"]');
  clipEls.forEach(el => {
    gsap.fromTo(el,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'expo.inOut',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Line Expand (for dividers/decorative lines) ──
  const lineEls = document.querySelectorAll('[data-animate="line-expand"]');
  lineEls.forEach(el => {
    gsap.fromTo(el,
      { scaleX: 0, transformOrigin: 'left center' },
      {
        scaleX: 1,
        duration: 1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Section Labels ──
  const labels = document.querySelectorAll('.section__label');
  labels.forEach(label => {
    gsap.fromTo(label,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: label,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // ── Section Titles ──
  const titles = document.querySelectorAll('.section__title');
  titles.forEach(title => {
    gsap.fromTo(title,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });
}
