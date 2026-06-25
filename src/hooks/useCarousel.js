/* ============================================================
   useCarousel — GSAP-Powered Auto-Carousel Hook (Fixed)
   ============================================================ */
import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export function useCarousel(totalSlides, autoPlayDelay = 4000) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef(null);
  const progressBarRef = useRef(null);
  const carouselRef = useRef(null);
  const isAnimatingRef = useRef(false);
  const autoPlayRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentIndexRef = useRef(0);
  const dragThreshold = 80;

  // Keep ref in sync with state
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Animate to a specific slide
  const animateToSlide = useCallback((newIndex) => {
    const track = trackRef.current;
    if (!track || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const cur = currentIndexRef.current;
    const currentContent = track.children[cur]?.querySelector('.carousel__slide-content');
    const nextContent = track.children[newIndex]?.querySelector('.carousel__slide-content');

    if (currentContent) {
      gsap.to(currentContent, { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
    }

    gsap.to(track, {
      x: `-${newIndex * 100}%`,
      duration: 0.8,
      ease: 'expo.inOut',
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    if (nextContent) {
      gsap.fromTo(nextContent,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.3 }
      );
    }

    setCurrentIndex(newIndex);
  }, []);

  // Progress bar
  useEffect(() => {
    const bar = progressBarRef.current;
    if (!bar) return;
    gsap.killTweensOf(bar);
    gsap.fromTo(bar,
      { width: '0%' },
      { width: '100%', duration: autoPlayDelay / 1000, ease: 'none' }
    );
  }, [currentIndex, autoPlayDelay]);

  // Initialize track
  useEffect(() => {
    const track = trackRef.current;
    if (track) {
      gsap.set(track, { x: '0%' });
    }
  }, []);

  // Auto-advance effect — single interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimatingRef.current) {
        const next = (currentIndexRef.current + 1) % totalSlides;
        animateToSlide(next);
      }
    }, autoPlayDelay);

    autoPlayRef.current = interval;
    return () => clearInterval(interval);
  }, [totalSlides, autoPlayDelay, animateToSlide]);

  // Stop autoplay helper
  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // Restart autoplay helper
  const restartAutoPlay = useCallback(() => {
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      if (!isAnimatingRef.current) {
        const next = (currentIndexRef.current + 1) % totalSlides;
        animateToSlide(next);
      }
    }, autoPlayDelay);
  }, [totalSlides, autoPlayDelay, animateToSlide, stopAutoPlay]);

  // Public navigation
  const goNext = useCallback(() => {
    stopAutoPlay();
    const next = (currentIndexRef.current + 1) % totalSlides;
    animateToSlide(next);
    setTimeout(restartAutoPlay, 100);
  }, [totalSlides, animateToSlide, stopAutoPlay, restartAutoPlay]);

  const goPrev = useCallback(() => {
    stopAutoPlay();
    const prev = (currentIndexRef.current - 1 + totalSlides) % totalSlides;
    animateToSlide(prev);
    setTimeout(restartAutoPlay, 100);
  }, [totalSlides, animateToSlide, stopAutoPlay, restartAutoPlay]);

  const goToDot = useCallback((index) => {
    if (index === currentIndexRef.current) return;
    stopAutoPlay();
    animateToSlide(index);
    setTimeout(restartAutoPlay, 100);
  }, [animateToSlide, stopAutoPlay, restartAutoPlay]);

  // Drag/swipe handlers
  const onDragStart = useCallback((e) => {
    isDraggingRef.current = true;
    startXRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    stopAutoPlay();
  }, [stopAutoPlay]);

  const onDragEnd = useCallback((e) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    const endX = e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const diff = startXRef.current - endX;
    if (Math.abs(diff) > dragThreshold) {
      if (diff > 0) goNext();
      else goPrev();
    } else {
      restartAutoPlay();
    }
  }, [goNext, goPrev, restartAutoPlay]);

  // Pause on hover
  const onMouseEnter = useCallback(() => stopAutoPlay(), [stopAutoPlay]);
  const onMouseLeave = useCallback(() => restartAutoPlay(), [restartAutoPlay]);

  return {
    currentIndex,
    trackRef,
    progressBarRef,
    carouselRef,
    goNext,
    goPrev,
    goToDot,
    onDragStart,
    onDragEnd,
    onMouseEnter,
    onMouseLeave,
  };
}

export default useCarousel;
