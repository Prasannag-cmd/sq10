/* ============================================================
   CAROUSEL — GSAP-Powered Auto-Carousel
   ============================================================ */

export function initCarousel() {
  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel__track');
  const slides = carousel.querySelectorAll('.carousel__slide');
  const dots = carousel.querySelectorAll('.carousel__dot');
  const progressBar = carousel.querySelector('.carousel__progress-bar');
  const prevBtn = carousel.querySelector('.carousel__arrow--prev');
  const nextBtn = carousel.querySelector('.carousel__arrow--next');
  const counterCurrent = carousel.closest('.projects')?.querySelector('.carousel__counter-current');

  if (!slides.length) return;

  let currentIndex = 0;
  const totalSlides = slides.length;
  let autoPlayInterval;
  let autoPlayDelay = 4000; // 4 seconds per slide
  let isAnimating = false;
  let isDragging = false;
  let startX = 0;
  let dragThreshold = 80;

  // ── Initialize ──
  function init() {
    updateSlide(0, false);
    startAutoPlay();
    setupDrag();
  }

  // ── Go to Slide ──
  function goToSlide(index, animate = true) {
    if (isAnimating || index === currentIndex) return;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    isAnimating = true;
    const direction = index > currentIndex ? 1 : -1;

    // Animate track
    gsap.to(track, {
      x: `-${index * 100}%`,
      duration: animate ? 0.8 : 0,
      ease: 'expo.inOut',
      onComplete: () => {
        isAnimating = false;
      }
    });

    // Animate slide content
    const currentContent = slides[currentIndex].querySelector('.carousel__slide-content');
    const nextContent = slides[index].querySelector('.carousel__slide-content');

    if (animate && currentContent && nextContent) {
      // Fade out current
      gsap.to(currentContent, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
      });

      // Fade in next
      gsap.fromTo(nextContent,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0,
          duration: 0.6,
          ease: 'expo.out',
          delay: 0.3,
        }
      );
    }

    currentIndex = index;
    updateDots();
    updateCounter();
    resetProgressBar();
  }

  // ── Update without animation (init) ──
  function updateSlide(index, animate = true) {
    gsap.set(track, { x: `-${index * 100}%` });
    currentIndex = index;
    updateDots();
    updateCounter();
    resetProgressBar();
  }

  // ── Dots ──
  function updateDots() {
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
    });
  }

  // ── Counter ──
  function updateCounter() {
    if (counterCurrent) {
      counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
    }
  }

  // ── Progress Bar ──
  function resetProgressBar() {
    if (!progressBar) return;
    gsap.killTweensOf(progressBar);
    gsap.fromTo(progressBar,
      { width: '0%' },
      { width: '100%', duration: autoPlayDelay / 1000, ease: 'none' }
    );
  }

  // ── Auto-Play ──
  function startAutoPlay() {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, autoPlayDelay);
  }

  function stopAutoPlay() {
    if (autoPlayInterval) {
      clearInterval(autoPlayInterval);
      autoPlayInterval = null;
    }
  }

  // ── Drag/Swipe Support ──
  function setupDrag() {
    track.addEventListener('mousedown', onDragStart);
    track.addEventListener('touchstart', onDragStart, { passive: true });
    
    window.addEventListener('mouseup', onDragEnd);
    window.addEventListener('touchend', onDragEnd);
    
    track.addEventListener('mousemove', onDragMove);
    track.addEventListener('touchmove', onDragMove, { passive: true });
  }

  function onDragStart(e) {
    isDragging = true;
    startX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    stopAutoPlay();
  }

  function onDragMove(e) {
    if (!isDragging) return;
    e.preventDefault?.();
  }

  function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) {
        goToSlide(currentIndex + 1);
      } else {
        goToSlide(currentIndex - 1);
      }
    }

    startAutoPlay();
  }

  // ── Event Listeners ──
  // Dots
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goToSlide(i);
      stopAutoPlay();
      startAutoPlay();
    });
  });

  // Arrows
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goToSlide(currentIndex - 1);
      stopAutoPlay();
      startAutoPlay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goToSlide(currentIndex + 1);
      stopAutoPlay();
      startAutoPlay();
    });
  }

  // Pause on hover
  carousel.addEventListener('mouseenter', stopAutoPlay);
  carousel.addEventListener('mouseleave', startAutoPlay);

  // ── ScrollTrigger entrance ──
  gsap.fromTo(carousel,
    { opacity: 0, y: 60 },
    {
      opacity: 1, y: 0,
      duration: 0.8,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: carousel,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    }
  );

  // Init
  init();
}
