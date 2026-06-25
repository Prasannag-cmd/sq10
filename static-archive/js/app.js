/* ============================================================
   APP — Main Orchestrator
   Initializes all modules in correct sequence
   ============================================================ */

import { initOnboarding } from './onboarding.js';
import { initNavbar } from './navbar.js';
import { initHero } from './hero.js';
import { initScrollAnimations } from './scroll-animations.js';
import { initCarousel } from './carousel.js';
import { initStats } from './stats.js';
import { initCursor } from './cursor.js';
import { initThemeToggle } from './theme-toggle.js';
import { initEstimator } from './ai-estimator.js?v=3';
import { initAssistant } from './ai-assistant.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ── Boot Sequence ──
async function boot() {
  // Phase 0: Initialize theme toggle early to apply correct theme attributes
  initThemeToggle();

  // Phase 1: Onboarding (blocks until complete)
  await initOnboarding();

  // Phase 2: Reveal navbar
  initNavbar();

  // Phase 3: Hero animations
  initHero();

  // Phase 4: Setup all scroll-triggered animations
  initScrollAnimations();

  // Phase 5: Initialize carousel
  initCarousel();

  // Phase 6: Stats counters
  initStats();

  // Phase 7: AI components
  initEstimator();
  initAssistant();

  // Phase 8: Custom cursor (desktop only, non-blocking)
  initCursor();

  // Refresh ScrollTrigger after all DOM manipulations
  ScrollTrigger.refresh();
}

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}

