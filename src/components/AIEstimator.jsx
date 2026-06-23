/* ============================================================
   AI COST ESTIMATOR — Interactive Construction Estimator Modal
   Full 5-step wizard with rate calculations
   ============================================================ */
import { useState, useCallback, useRef } from 'react';
import gsap from 'gsap';

// Rate tables
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

const projectTypes = [
  { type: 'residential', icon: '🏠', name: 'Residential' },
  { type: 'commercial', icon: '🏢', name: 'Commercial' },
  { type: 'villa', icon: '🏡', name: 'Villa' },
  { type: 'renovation', icon: '🔧', name: 'Renovation' },
  { type: 'interior', icon: '🎨', name: 'Interior' },
  { type: 'turnkey', icon: '🔑', name: 'Turnkey' },
];

const interiorOptions = [
  { key: 'basic', name: 'Basic', desc: 'Standard finishes' },
  { key: 'premium', name: 'Premium', desc: 'Enhanced materials' },
  { key: 'luxury', name: 'Ultra-Luxury', desc: 'Bespoke everything' },
];

export default function AIEstimator({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [plotSize, setPlotSize] = useState(1500);
  const [projectType, setProjectType] = useState('residential');
  const [floors, setFloors] = useState(2);
  const [interior, setInterior] = useState('premium');
  const [results, setResults] = useState(null);
  const estimatorRef = useRef(null);
  const costRef = useRef(null);
  const totalSteps = 5;

  const openModal = useCallback(() => {
    setCurrentStep(0);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    onClose();
    document.body.style.overflow = '';
  }, [onClose]);

  // Calculate results
  const computeResults = useCallback(() => {
    const baseRate = rates.base[projectType] || 1800;
    const floorMult = rates.floorMultiplier[floors] || 1;
    const intMult = rates.interiorMultiplier[interior] || 1;

    const ratePerSqft = Math.round(baseRate * floorMult * intMult);
    const totalCost = Math.round(plotSize * ratePerSqft);
    const timelineMonths = Math.round((rates.timelineBase[projectType] || 8) * floorMult);
    const pkg = rates.packages[interior] || rates.packages.premium;

    setResults({ totalCost, ratePerSqft, timelineMonths, pkg });

    // Animate cost number
    setTimeout(() => {
      if (costRef.current) {
        const counter = { value: 0 };
        gsap.to(counter, {
          value: totalCost,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => {
            const val = Math.round(counter.value);
            if (val >= 10000000) {
              costRef.current.textContent = '₹' + (val / 10000000).toFixed(2) + ' Cr';
            } else {
              costRef.current.textContent = '₹' + (val / 100000).toFixed(1) + ' Lakhs';
            }
          },
        });
      }
    }, 100);
  }, [plotSize, projectType, floors, interior]);

  const goNext = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // If reaching results step, compute
      if (nextStep === 4) {
        computeResults();
      }
    }
  }, [currentStep, computeResults]);

  const goPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  // Scroll estimator to top when changing steps
  const scrollEstimatorTop = useCallback(() => {
    if (estimatorRef.current) {
      estimatorRef.current.scrollTop = 0;
    }
  }, []);

  if (!isOpen) return null;

  const breakdownKeys = Object.keys(rates.breakdown);

  return (
    <div className="estimator-modal is-open" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="estimator" ref={estimatorRef}>
        <div className="estimator__header">
          <h2 className="estimator__title">AI Cost Estimator</h2>
          <button type="button" className="estimator__close" onClick={closeModal}>✕</button>
        </div>

        <div className="estimator__progress">
          {[...Array(totalSteps)].map((_, i) => (
            <div
              key={i}
              className={`estimator__progress-step ${i === currentStep ? 'is-active' : ''} ${i < currentStep ? 'is-done' : ''}`}
            />
          ))}
        </div>

        <div className="estimator__body">
          {/* Step 1: Plot Size */}
          <div className={`estimator__step ${currentStep === 0 ? 'is-active' : ''}`}>
            <div className="estimator__step-label">Step 1 of 5</div>
            <div className="estimator__step-title">What's your plot size?</div>
            <div className="estimator__slider-group">
              <div className="estimator__slider-header">
                <span className="estimator__slider-label">Plot Area</span>
                <span className="estimator__slider-value">{plotSize.toLocaleString()} sq.ft.</span>
              </div>
              <input
                type="range"
                className="estimator__slider"
                min="500"
                max="10000"
                value={plotSize}
                step="100"
                onChange={(e) => setPlotSize(parseInt(e.target.value))}
              />
            </div>
            <div className="estimator__nav">
              <button type="button" className="btn btn--outline estimator__prev" style={{ visibility: 'hidden' }}>← Back</button>
              <button type="button" className="btn btn--primary estimator__next" onClick={goNext}>Next →</button>
            </div>
          </div>

          {/* Step 2: Project Type */}
          <div className={`estimator__step ${currentStep === 1 ? 'is-active' : ''}`}>
            <div className="estimator__step-label">Step 2 of 5</div>
            <div className="estimator__step-title">What type of project?</div>
            <div className="estimator__cards">
              {projectTypes.map(pt => (
                <div
                  key={pt.type}
                  className={`estimator__card ${projectType === pt.type ? 'is-selected' : ''}`}
                  onClick={() => setProjectType(pt.type)}
                >
                  <div className="estimator__card-icon">{pt.icon}</div>
                  <div className="estimator__card-name">{pt.name}</div>
                </div>
              ))}
            </div>
            <div className="estimator__nav">
              <button type="button" className="btn btn--outline estimator__prev" onClick={goPrev}>← Back</button>
              <button type="button" className="btn btn--primary estimator__next" onClick={goNext}>Next →</button>
            </div>
          </div>

          {/* Step 3: Floors */}
          <div className={`estimator__step ${currentStep === 2 ? 'is-active' : ''}`}>
            <div className="estimator__step-label">Step 3 of 5</div>
            <div className="estimator__step-title">Number of floors?</div>
            <div className="estimator__counter">
              <button
                type="button"
                className="estimator__counter-btn"
                onClick={() => setFloors(Math.max(1, floors - 1))}
              >−</button>
              <div className="estimator__counter-value">{floors}</div>
              <button
                type="button"
                className="estimator__counter-btn"
                onClick={() => setFloors(Math.min(5, floors + 1))}
              >+</button>
            </div>
            <div className="estimator__nav">
              <button type="button" className="btn btn--outline estimator__prev" onClick={goPrev}>← Back</button>
              <button type="button" className="btn btn--primary estimator__next" onClick={goNext}>Next →</button>
            </div>
          </div>

          {/* Step 4: Interior */}
          <div className={`estimator__step ${currentStep === 3 ? 'is-active' : ''}`}>
            <div className="estimator__step-label">Step 4 of 5</div>
            <div className="estimator__step-title">Interior requirements?</div>
            <div className="estimator__toggles">
              {interiorOptions.map(opt => (
                <div
                  key={opt.key}
                  className={`estimator__toggle ${interior === opt.key ? 'is-selected' : ''}`}
                  onClick={() => setInterior(opt.key)}
                >
                  <div className="estimator__toggle-name">{opt.name}</div>
                  <div className="estimator__toggle-desc">{opt.desc}</div>
                </div>
              ))}
            </div>
            <div className="estimator__nav">
              <button type="button" className="btn btn--outline estimator__prev" onClick={goPrev}>← Back</button>
              <button type="button" className="btn btn--primary estimator__next" onClick={goNext}>Calculate</button>
            </div>
          </div>

          {/* Step 5: Results */}
          <div className={`estimator__step estimator__step--results ${currentStep === 4 ? 'is-active' : ''}`}>
            <div className="estimator__results">
              <div className="estimator__results-title">Your Estimate</div>
              <div className="estimator__results-grid">
                <div className="result-card">
                  <div className="result-card__label">Estimated Cost</div>
                  <div className="result-card__value" ref={costRef}>
                    {results ? (results.totalCost >= 10000000
                      ? '₹' + (results.totalCost / 10000000).toFixed(2) + ' Cr'
                      : '₹' + (results.totalCost / 100000).toFixed(1) + ' Lakhs') : '--'}
                  </div>
                </div>
                <div className="result-card">
                  <div className="result-card__label">Timeline</div>
                  <div className="result-card__value">{results ? results.timelineMonths + ' Months' : '--'}</div>
                </div>
                <div className="result-card">
                  <div className="result-card__label">Recommended Package</div>
                  <div className="result-card__value">{results ? results.pkg.name : '--'}</div>
                  <div className="result-card__detail">{results ? results.pkg.desc : ''}</div>
                </div>
                <div className="result-card">
                  <div className="result-card__label">Price Per Sq.Ft.</div>
                  <div className="result-card__value">{results ? '₹' + results.ratePerSqft.toLocaleString() + '/sq.ft.' : '--'}</div>
                </div>
              </div>

              <div className="estimator__breakdown">
                <h4 style={{ marginBottom: 'var(--space-lg)', color: 'var(--color-text)' }}>Budget Breakdown</h4>
                {breakdownKeys.map((key, i) => {
                  const pct = rates.breakdown[key];
                  const amount = results ? Math.round((results.totalCost * pct) / 100) : 0;
                  return (
                    <div className="breakdown-item" key={key}>
                      <div className="breakdown-item__header">
                        <span className="breakdown-item__name">{key}</span>
                        <span className="breakdown-item__percent">
                          {results ? '₹' + (amount / 100000).toFixed(1) + 'L (' + pct + '%)' : pct + '%'}
                        </span>
                      </div>
                      <div className="breakdown-item__bar">
                        <div
                          className="breakdown-item__fill"
                          style={{ width: results ? pct + '%' : '0%', transition: `width 0.5s ease ${i * 0.1}s` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href="#contact"
                className="btn btn--primary"
                onClick={() => { closeModal(); }}
              >
                Book Free Consultation
              </a>
            </div>
            <div className="estimator__nav" style={{ marginTop: 'var(--space-lg)' }}>
              <button type="button" className="btn btn--outline estimator__prev" onClick={goPrev}>← Modify</button>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
