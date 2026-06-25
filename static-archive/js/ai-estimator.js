/* ============================================================
   AI COST ESTIMATOR — Interactive Construction Estimator
   Client-side calculation with rate tables
   v3 — Full rewrite with direct listeners + debugging
   ============================================================ */

export function initEstimator() {
  console.log('[Estimator] initEstimator() called');

  const modal = document.querySelector('.estimator-modal');
  if (!modal) {
    console.warn('[Estimator] .estimator-modal not found in DOM');
    return;
  }

  // ── Gather ALL elements ──
  const triggers = document.querySelectorAll('[data-open-estimator]');
  const closeBtn = modal.querySelector('.estimator__close');
  const steps = modal.querySelectorAll('.estimator__step');
  const progressSteps = modal.querySelectorAll('.estimator__progress-step');
  const nextBtns = modal.querySelectorAll('.estimator__next');
  const prevBtns = modal.querySelectorAll('.estimator__prev');
  const typeCards = modal.querySelectorAll('.estimator__card[data-type]');
  const interiorToggles = modal.querySelectorAll('.estimator__toggle[data-interior]');

  console.log('[Estimator] Found:', {
    steps: steps.length,
    progressSteps: progressSteps.length,
    nextBtns: nextBtns.length,
    prevBtns: prevBtns.length,
    typeCards: typeCards.length,
    interiorToggles: interiorToggles.length,
    triggers: triggers.length
  });

  let currentStep = 0;
  const totalSteps = steps.length;

  // ── State ──
  const estimatorData = {
    plotSize: 1500,
    projectType: 'residential',
    floors: 2,
    interior: 'premium',
  };

  // ── Rate Tables ──
  const rates = {
    base: { residential: 1800, commercial: 2200, villa: 2500, renovation: 1400, interior: 1600, turnkey: 2100 },
    floorMultiplier: { 1: 1.0, 2: 1.15, 3: 1.3, 4: 1.45, 5: 1.6 },
    interiorMultiplier: { basic: 0.8, premium: 1.0, luxury: 1.35 },
    timelineBase: { residential: 8, commercial: 14, villa: 12, renovation: 4, interior: 3, turnkey: 10 },
    breakdown: {
      'Foundation & Structure': 30,
      'Walls & Masonry': 15,
      'Electrical & Plumbing': 12,
      'Interior Finishing': 20,
      'Exterior & Landscaping': 10,
      'Contingency & Permits': 13,
    },
    packages: {
      basic: { name: 'Essential Build', desc: 'Quality construction with standard specifications' },
      premium: { name: 'Premium Plus', desc: 'Enhanced materials with modern design elements' },
      luxury: { name: 'Luxury Signature', desc: 'Ultra-premium finishes with bespoke craftsmanship' },
    },
  };

  // ══════════════════════════════════════════════════════════
  //  STEP NAVIGATION — updateWizard()
  // ══════════════════════════════════════════════════════════
  function updateWizard() {
    console.log('[Estimator] updateWizard() — currentStep:', currentStep);

    // Update step visibility
    steps.forEach((step, index) => {
      step.classList.remove('is-active');
    });
    if (steps[currentStep]) {
      steps[currentStep].classList.add('is-active');
    }

    // Update progress bar
    progressSteps.forEach((step, index) => {
      step.classList.remove('is-active', 'is-done');
      if (index < currentStep) {
        step.classList.add('is-done');
      }
      if (index === currentStep) {
        step.classList.add('is-active');
      }
    });

    // Scroll the estimator container to top when changing steps
    const estimatorEl = modal.querySelector('.estimator');
    if (estimatorEl) {
      estimatorEl.scrollTop = 0;
    }

    // If we landed on the results step, calculate
    if (steps[currentStep] && steps[currentStep].classList.contains('estimator__step--results')) {
      console.log('[Estimator] Results step reached — computing...');
      showResults();
    }

    console.log('[Estimator] updateWizard() done — step', currentStep, 'is now active');
  }

  // ══════════════════════════════════════════════════════════
  //  OPEN / CLOSE
  // ══════════════════════════════════════════════════════════
  function openModal() {
    console.log('[Estimator] Opening modal');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    currentStep = 0;
    updateWizard();
  }

  function closeModal() {
    console.log('[Estimator] Closing modal');
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  // Trigger buttons (e.g. "Estimate Cost" in hero)
  triggers.forEach(t => {
    t.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  // Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }

  // Click on backdrop to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // ══════════════════════════════════════════════════════════
  //  NEXT BUTTONS — direct listener on each
  // ══════════════════════════════════════════════════════════
  nextBtns.forEach((btn, btnIndex) => {
    console.log('[Estimator] Attaching NEXT listener to button', btnIndex, '— text:', btn.textContent.trim());
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('[Estimator] ▶ NEXT clicked — btnIndex:', btnIndex, '— currentStep BEFORE:', currentStep);
      console.log('[Estimator]   Selected project:', estimatorData.projectType);

      if (currentStep < totalSteps - 1) {
        currentStep++;
        console.log('[Estimator]   currentStep AFTER:', currentStep);
        updateWizard();
      } else {
        console.log('[Estimator]   Already at last step, not advancing');
      }
    });
  });

  // ══════════════════════════════════════════════════════════
  //  PREV BUTTONS — direct listener on each
  // ══════════════════════════════════════════════════════════
  prevBtns.forEach((btn, btnIndex) => {
    console.log('[Estimator] Attaching PREV listener to button', btnIndex, '— text:', btn.textContent.trim());
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      console.log('[Estimator] ◀ PREV clicked — btnIndex:', btnIndex, '— currentStep BEFORE:', currentStep);

      if (currentStep > 0) {
        currentStep--;
        console.log('[Estimator]   currentStep AFTER:', currentStep);
        updateWizard();
      } else {
        console.log('[Estimator]   Already at first step, not going back');
      }
    });
  });

  // ══════════════════════════════════════════════════════════
  //  PROJECT TYPE CARDS (Step 2)
  // ══════════════════════════════════════════════════════════
  typeCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.stopPropagation();

      // Deselect all, select clicked
      typeCards.forEach(c => c.classList.remove('is-selected'));
      card.classList.add('is-selected');
      estimatorData.projectType = card.dataset.type;

      console.log('[Estimator] Project selected:', estimatorData.projectType);
    });
  });

  // ══════════════════════════════════════════════════════════
  //  SLIDER: Plot Size (Step 1)
  // ══════════════════════════════════════════════════════════
  const plotSlider = modal.querySelector('#est-plot-size');
  const plotValueEl = modal.querySelector('#est-plot-value');
  if (plotSlider) {
    plotSlider.addEventListener('input', () => {
      estimatorData.plotSize = parseInt(plotSlider.value);
      if (plotValueEl) plotValueEl.textContent = estimatorData.plotSize.toLocaleString() + ' sq.ft.';
    });
  }

  // ══════════════════════════════════════════════════════════
  //  COUNTER: Floors (Step 3)
  // ══════════════════════════════════════════════════════════
  const floorMinus = modal.querySelector('#est-floor-minus');
  const floorPlus = modal.querySelector('#est-floor-plus');
  const floorValueEl = modal.querySelector('#est-floor-value');

  if (floorMinus) {
    floorMinus.addEventListener('click', (e) => {
      e.stopPropagation();
      estimatorData.floors = Math.max(1, estimatorData.floors - 1);
      if (floorValueEl) floorValueEl.textContent = estimatorData.floors;
      console.log('[Estimator] Floors:', estimatorData.floors);
    });
  }
  if (floorPlus) {
    floorPlus.addEventListener('click', (e) => {
      e.stopPropagation();
      estimatorData.floors = Math.min(5, estimatorData.floors + 1);
      if (floorValueEl) floorValueEl.textContent = estimatorData.floors;
      console.log('[Estimator] Floors:', estimatorData.floors);
    });
  }

  // ══════════════════════════════════════════════════════════
  //  TOGGLES: Interior (Step 4)
  // ══════════════════════════════════════════════════════════
  interiorToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      interiorToggles.forEach(t => t.classList.remove('is-selected'));
      toggle.classList.add('is-selected');
      estimatorData.interior = toggle.dataset.interior;
      console.log('[Estimator] Interior:', estimatorData.interior);
    });
  });

  // ══════════════════════════════════════════════════════════
  //  CALCULATE RESULTS (Step 5)
  // ══════════════════════════════════════════════════════════
  function showResults() {
    const baseRate = rates.base[estimatorData.projectType] || 1800;
    const floorMult = rates.floorMultiplier[estimatorData.floors] || 1;
    const intMult = rates.interiorMultiplier[estimatorData.interior] || 1;

    const ratePerSqft = Math.round(baseRate * floorMult * intMult);
    const totalCost = Math.round(estimatorData.plotSize * ratePerSqft);
    const timelineMonths = Math.round((rates.timelineBase[estimatorData.projectType] || 8) * floorMult);
    const pkg = rates.packages[estimatorData.interior] || rates.packages.premium;

    console.log('[Estimator] Results:', { totalCost, ratePerSqft, timelineMonths, pkg: pkg.name });

    const costEl = modal.querySelector('#result-cost');
    const timelineEl = modal.querySelector('#result-timeline');
    const packageEl = modal.querySelector('#result-package');
    const packageDescEl = modal.querySelector('#result-package-desc');
    const rateEl = modal.querySelector('#result-rate');

    if (costEl) animateNumber(costEl, totalCost, '₹', '');
    if (timelineEl) timelineEl.textContent = timelineMonths + ' Months';
    if (packageEl) packageEl.textContent = pkg.name;
    if (packageDescEl) packageDescEl.textContent = pkg.desc;
    if (rateEl) rateEl.textContent = '₹' + ratePerSqft.toLocaleString() + '/sq.ft.';

    // Breakdown bars
    const breakdownBars = modal.querySelectorAll('.breakdown-item__fill');
    const breakdownPercents = modal.querySelectorAll('.breakdown-item__percent');
    const keys = Object.keys(rates.breakdown);
    breakdownBars.forEach((bar, i) => {
      const pct = rates.breakdown[keys[i]] || 0;
      const amount = Math.round((totalCost * pct) / 100);
      setTimeout(() => {
        bar.style.width = pct + '%';
      }, 100 + i * 100);
      if (breakdownPercents[i]) {
        breakdownPercents[i].textContent = '₹' + (amount / 100000).toFixed(1) + 'L (' + pct + '%)';
      }
    });
  }

  function animateNumber(el, target, prefix, suffix) {
    const counter = { value: 0 };
    gsap.to(counter, {
      value: target,
      duration: 1.5,
      ease: 'power2.out',
      onUpdate: () => {
        const val = Math.round(counter.value);
        if (val >= 10000000) {
          el.textContent = prefix + (val / 10000000).toFixed(2) + ' Cr' + suffix;
        } else {
          el.textContent = prefix + (val / 100000).toFixed(1) + ' Lakhs' + suffix;
        }
      },
    });
  }

  console.log('[Estimator] ✅ Initialization complete — totalSteps:', totalSteps);
}
