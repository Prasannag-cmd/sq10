/* ============================================================
   HERO — Parallax & Text Reveal Animations
   ============================================================ */

export function initHero() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const bg = hero.querySelector('.hero__bg');
  const label = hero.querySelector('.hero__label');
  const title = hero.querySelector('.hero__title');
  const desc = hero.querySelector('.hero__description');
  const actions = hero.querySelector('.hero__actions');
  const scroll = hero.querySelector('.hero__scroll');
  const shapes = hero.querySelectorAll('.hero__shape');

  // ── Text Entrance Timeline ──
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

  // ── Background Parallax ──
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

  // ── Hero content parallax on scroll ──
  gsap.to(hero.querySelector('.hero__content'), {
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
