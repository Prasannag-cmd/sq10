/* ============================================================
   ONBOARDING — Cinematic Logo Reveal Timeline
   GSAP-powered splash screen animation
   ============================================================ */

export function initOnboarding() {
  return new Promise((resolve) => {
    const onboarding = document.querySelector('.onboarding');
    if (!onboarding) { resolve(); return; }

    const logo = onboarding.querySelector('.onboarding__logo');
    const glow = onboarding.querySelector('.onboarding__glow');
    const name = onboarding.querySelector('.onboarding__name');
    const tagline = onboarding.querySelector('.onboarding__tagline');
    const progressBar = onboarding.querySelector('.onboarding__progress-bar');
    const corners = onboarding.querySelectorAll('.onboarding__corner');
    const particles = onboarding.querySelectorAll('.onboarding__particle');

    // Lock scroll
    document.documentElement.classList.add('is-loading');

    // Create master timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Unlock scroll and remove onboarding
        document.documentElement.classList.remove('is-loading');
        onboarding.remove();
        resolve();
      }
    });

    // ── Phase 1: Ambient Particles (0s - 0.8s) ──
    tl.to(particles, {
      opacity: (i) => 0.2 + Math.random() * 0.5,
      x: () => (Math.random() - 0.5) * 300,
      y: () => (Math.random() - 0.5) * 300,
      duration: 1.5,
      stagger: 0.05,
      ease: 'power2.out',
    }, 0);

    // Progress bar fills across the entire duration
    tl.to(progressBar, {
      width: '100%',
      duration: 3.2,
      ease: 'power1.inOut',
    }, 0);

    // ── Phase 2: Corner decorations appear ──
    tl.to(corners, {
      opacity: 0.3,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    }, 0.3);

    // ── Phase 3: Golden glow pulse (0.5s) ──
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

    // ── Phase 4: Logo reveal (0.8s - 1.8s) ──
    tl.to(logo, {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: 'expo.out',
    }, 0.8);

    // ── Phase 5: Company name (1.8s - 2.5s) ──
    tl.to(name, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'expo.out',
    }, 1.8);

    // ── Phase 6: Tagline (2.3s - 2.8s) ──
    tl.to(tagline, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power3.out',
    }, 2.3);

    // ── Phase 7: Exit — everything slides up (3.2s) ──
    tl.to(onboarding, {
      y: '-100%',
      duration: 0.8,
      ease: 'expo.inOut',
      delay: 0.2,
    }, 3.2);
  });
}
