/* ============================================================
   NAVBAR — Scroll-Aware Navigation
   ============================================================ */

export function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  const hamburger = navbar.querySelector('.navbar__hamburger');
  const mobileMenu = document.querySelector('.navbar__mobile-menu');
  const mobileLinks = document.querySelectorAll('.navbar__mobile-link');

  let lastScrollY = 0;
  let scrollThreshold = 50;
  let ticking = false;

  // ── Show navbar after onboarding ──
  gsap.to(navbar, {
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power3.out',
    delay: 0.2,
  });
  navbar.classList.add('is-visible');

  // ── Scroll behavior ──
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for background
        if (currentScrollY > scrollThreshold) {
          navbar.classList.add('is-scrolled');
        } else {
          navbar.classList.remove('is-scrolled');
        }

        // Hide on scroll down, show on scroll up
        if (currentScrollY > lastScrollY && currentScrollY > 300) {
          navbar.classList.add('is-hidden');
        } else {
          navbar.classList.remove('is-hidden');
        }

        lastScrollY = currentScrollY;
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Mobile menu toggle ──
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.contains('is-open');

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close on link click
    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  function openMobileMenu() {
    hamburger.classList.add('is-active');
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Animate links in
    gsap.fromTo(mobileLinks, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, y: 0, 
        duration: 0.5, 
        stagger: 0.08, 
        ease: 'expo.out',
        delay: 0.15 
      }
    );
  }

  function closeMobileMenu() {
    hamburger.classList.remove('is-active');
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';

    // Reset link states
    gsap.set(mobileLinks, { opacity: 0, y: 30 });
  }

  // ── Active section tracking ──
  const sections = document.querySelectorAll('.section[id]');
  const navLinks = navbar.querySelectorAll('.navbar__link');

  if (sections.length && navLinks.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => observer.observe(section));
  }
}
