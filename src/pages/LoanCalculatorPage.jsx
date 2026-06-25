/* ============================================================
   LOAN EMI CALCULATOR PAGE — Interactive Financing Utility
   ============================================================ */
import { useState, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Formatting Helpers
const formatCurrency = (val) => {
  if (isNaN(val) || val === null || val === undefined) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(val);
};

const formatToWords = (num) => {
  const val = Number(num) || 0;
  if (val <= 0) return '₹0';
  if (val >= 10000000) {
    const cr = val / 10000000;
    return `${cr % 1 === 0 ? cr : cr.toFixed(2)} Crore${cr !== 1 ? 's' : ''}`;
  }
  if (val >= 100000) {
    const lakh = val / 100000;
    return `${lakh % 1 === 0 ? lakh : lakh.toFixed(2)} Lakh${lakh !== 1 ? 's' : ''}`;
  }
  return val.toLocaleString('en-IN');
};

export default function LoanCalculatorPage() {
  const pageRef = useRef(null);
  const emiValRef = useRef(null);

  // --- Core Inputs State ---
  const [loanAmount, setLoanAmount] = useState(5000000); // 50 Lakhs default
  const [interestRate, setInterestRate] = useState(8.5); // 8.5% default
  const [tenureMode, setTenureMode] = useState('years'); // 'years' or 'months'
  const [tenureYears, setTenureYears] = useState(20); // 20 years default
  const [tenureMonths, setTenureMonths] = useState(240); // 240 months default

  // --- Prepayment Simulator State ---
  const [isSimOpen, setIsSimOpen] = useState(false);
  const [prepaymentMonthly, setPrepaymentMonthly] = useState(0);
  const [prepaymentLumpSum, setPrepaymentLumpSum] = useState(0);
  const [prepaymentLumpSumMonth, setPrepaymentLumpSumMonth] = useState(12); // end of year 1 default

  // --- Amortization View State ---
  const [amortMode, setAmortMode] = useState('yearly'); // 'yearly' or 'monthly'
  const [expandedYears, setExpandedYears] = useState({});

  // Reset page scroll and trigger GSAP animations
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.classList.remove('is-loading');

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Slow background zoom
      gsap.fromTo('.calculator-hero__bg img',
        { scale: 1.05 },
        { scale: 1, duration: 3, ease: 'power2.out' }
      );

      // Animation cascade
      tl.fromTo('.calculator-hero__label',
        { opacity: 0, y: 15 },
        { opacity: 0.9, y: 0, duration: 0.5, ease: 'power3.out' }
      )
      .fromTo('.calculator-hero__gold-line',
        { scaleX: 0, transformOrigin: 'center center' },
        { scaleX: 1, duration: 0.6, ease: 'power3.out' },
        '-=0.3'
      )
      .fromTo('.calculator-hero__title',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo('.calculator-hero__desc',
        { opacity: 0, y: 10 },
        { opacity: 0.8, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo('.calc-card',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.3'
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Determine actual months
  const totalMonths = useMemo(() => {
    const years = Number(tenureYears) || 0;
    const months = Number(tenureMonths) || 0;
    return tenureMode === 'years' ? years * 12 : months;
  }, [tenureMode, tenureYears, tenureMonths]);

  // Calculations Engine
  const calcData = useMemo(() => {
    const P = Number(loanAmount) || 0;
    const annualR = Number(interestRate) || 0;
    const r = annualR / 12 / 100;
    const N = Number(totalMonths) || 0;

    // Monthly EMI formula
    let emi = 0;
    if (N > 0) {
      if (r === 0) {
        emi = P / N;
      } else {
        emi = P * r * Math.pow(1 + r, N) / (Math.pow(1 + r, N) - 1);
      }
    }
    const monthlyEMI = Math.round(emi);

    // 1. Generate Base Schedule (Without Prepayment)
    const baseSchedule = [];
    let baseBalance = P;

    for (let m = 1; m <= N; m++) {
      const interestPaid = baseBalance * r;
      let principalPaid;
      let emiPaid;
      let closing;

      if (m === N || baseBalance <= (monthlyEMI - interestPaid)) {
        principalPaid = baseBalance;
        emiPaid = principalPaid + interestPaid;
        closing = 0;
      } else {
        principalPaid = monthlyEMI - interestPaid;
        emiPaid = monthlyEMI;
        closing = baseBalance - principalPaid;
      }

      baseSchedule.push({
        month: m,
        openingBalance: baseBalance,
        emiPaid,
        principalPaid,
        interestPaid,
        prepayment: 0,
        closingBalance: closing
      });

      baseBalance = closing;
      if (baseBalance <= 0) break;
    }

    const finalBaseTotalPayment = Math.round(emi * N);
    const finalBaseTotalInterest = Math.max(0, finalBaseTotalPayment - P);

    // 2. Generate Simulated Schedule (With Prepayments)
    const simSchedule = [];
    let simBalance = P;
    let simTotalInterest = 0;
    let actualTenureMonths = 0;

    for (let m = 1; m <= 360; m++) {
      if (simBalance <= 0) break;

      const interestPaid = simBalance * r;
      let basePrincipalPaid = monthlyEMI - interestPaid;

      // Add Prepayment
      let prepay = Number(prepaymentMonthly) || 0;
      if (m === (Number(prepaymentLumpSumMonth) || 0)) {
        prepay += Number(prepaymentLumpSum) || 0;
      }

      let totalPrincipal = basePrincipalPaid + prepay;
      let principalPaid;
      let emiPaid;
      let closing;

      if (totalPrincipal >= simBalance || m === 360) {
        principalPaid = simBalance;
        prepay = Math.max(0, simBalance - basePrincipalPaid);
        emiPaid = principalPaid + interestPaid;
        closing = 0;
      } else {
        principalPaid = totalPrincipal;
        emiPaid = monthlyEMI + prepay;
        closing = simBalance - principalPaid;
      }

      simTotalInterest += interestPaid;
      actualTenureMonths = m;

      simSchedule.push({
        month: m,
        openingBalance: simBalance,
        emiPaid,
        principalPaid,
        interestPaid,
        prepayment: prepay,
        closingBalance: closing
      });

      simBalance = closing;
    }

    const simTotalPayment = P + simTotalInterest;

    return {
      monthlyEMI,
      base: {
        schedule: baseSchedule,
        totalInterest: finalBaseTotalInterest,
        totalPayment: finalBaseTotalPayment,
        tenureMonths: N
      },
      sim: {
        schedule: simSchedule,
        totalInterest: Math.round(simTotalInterest),
        totalPayment: Math.round(simTotalPayment),
        tenureMonths: actualTenureMonths
      }
    };
  }, [loanAmount, interestRate, totalMonths, prepaymentMonthly, prepaymentLumpSum, prepaymentLumpSumMonth]);

  // Animate monthly EMI numbers on update
  useEffect(() => {
    if (emiValRef.current) {
      const counter = { value: 0 };
      const targetVal = calcData.monthlyEMI;
      gsap.fromTo(counter,
        { value: parseFloat(emiValRef.current.getAttribute('data-value') || 0) },
        {
          value: targetVal,
          duration: 0.2,
          ease: 'power2.out',
          onUpdate: () => {
            if (emiValRef.current) {
              emiValRef.current.textContent = formatCurrency(Math.round(counter.value));
            }
          },
          onComplete: () => {
            if (emiValRef.current) {
              emiValRef.current.setAttribute('data-value', targetVal);
            }
          }
        }
      );
    }
  }, [calcData.monthlyEMI]);

  // Donut Chart calculations
  const chartPercentages = useMemo(() => {
    const total = calcData.base.totalPayment;
    const principal = Number(loanAmount) || 0;
    const principalPct = total > 0 ? (principal / total) * 100 : 0;
    const interestPct = total > 0 ? (calcData.base.totalInterest / total) * 100 : 0;
    return {
      principal: principalPct,
      interest: interestPct
    };
  }, [loanAmount, calcData.base.totalPayment, calcData.base.totalInterest]);

  // SVG parameters
  const radius = 70;
  const strokeWidth = 14;
  const circumference = 2 * Math.PI * radius; // ~439.82
  const principalOffset = circumference - (circumference * chartPercentages.principal) / 100;

  // Toggle year in amortization table
  const toggleYear = (year) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  // Group schedule into years
  const amortizationData = useMemo(() => {
    const activeSchedule = isSimOpen ? calcData.sim.schedule : calcData.base.schedule;
    const years = {};

    activeSchedule.forEach(item => {
      const year = Math.ceil(item.month / 12);
      if (!years[year]) {
        years[year] = {
          year,
          openingBalance: item.openingBalance,
          principalPaid: 0,
          interestPaid: 0,
          prepayment: 0,
          closingBalance: 0,
          months: []
        };
      }
      years[year].principalPaid += item.principalPaid;
      years[year].interestPaid += item.interestPaid;
      years[year].prepayment += item.prepayment;
      years[year].closingBalance = item.closingBalance;
      years[year].months.push(item);
    });

    return Object.values(years);
  }, [calcData, isSimOpen]);

  // Download Amortization Schedule as CSV
  const downloadCSV = () => {
    const activeSchedule = isSimOpen ? calcData.sim.schedule : calcData.base.schedule;
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Month,Opening Balance (INR),Principal Paid (INR),Interest Paid (INR),Prepayment (INR),Closing Balance (INR)\n';

    activeSchedule.forEach(row => {
      csvContent += `${row.month},${row.openingBalance.toFixed(0)},${row.principalPaid.toFixed(0)},${row.interestPaid.toFixed(0)},${row.prepayment.toFixed(0)},${row.closingBalance.toFixed(0)}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Squaareten_Amortization_Schedule.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="calculator-page" ref={pageRef}>
      <Navbar alwaysScrolled />

      <main>
        {/* HERO SECTION */}
        <section className="calculator-hero">
          <div className="calculator-hero__bg">
            <img src="/assets/images/project-villa.png" alt="Squaareten Luxury Project Background" />
          </div>
          <div className="calculator-hero__overlay" />

          <div className="container calculator-hero__content">
            <span className="calculator-hero__label">Financing Tools</span>
            <div className="calculator-hero__gold-line" />
            <h1 className="calculator-hero__title">Loan EMI Calculator</h1>
            <p className="calculator-hero__desc">
              Estimate your monthly construction or home loan repayments. Simulate prepayments to understand how you can save interest and shorten your loan tenure.
            </p>
          </div>
        </section>

        {/* CALCULATOR PANEL */}
        <section className="calc-section">
          <div className="container">
            <div className="calc-grid">
              
              {/* Left Column: Input Panel */}
              <div className="calc-card">
                <div className="calc-card__title">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <line x1="9" y1="9" x2="15" y2="9" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                    <line x1="9" y1="17" x2="15" y2="17" />
                  </svg>
                  Customize Loan Parameters
                </div>

                {/* 1. Loan Amount */}
                <div className="calc-group">
                  <div className="calc-label-row">
                    <label className="calc-label">Loan Amount</label>
                    <span className="calc-label" style={{ color: 'var(--color-premium-gold)', fontWeight: 'bold' }}>
                      {formatToWords(loanAmount)}
                    </span>
                  </div>
                  <div className="calc-input-wrapper">
                    <span className="calc-input-prefix">₹</span>
                    <input
                      type="number"
                      className="calc-text-input"
                      value={loanAmount}
                      min="100000"
                      max="100000000"
                      style={{ paddingLeft: '2.5rem' }}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLoanAmount(val === '' ? '' : Math.max(0, parseInt(val) || 0));
                      }}
                    />
                  </div>
                  <div className="calc-slider-wrapper">
                    <input
                      type="range"
                      className="calc-slider"
                      min="100000"
                      max="100000000"
                      step="100000"
                      value={Number(loanAmount) || 100000}
                      onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                    />
                  </div>
                </div>

                {/* 2. Interest Rate */}
                <div className="calc-group">
                  <div className="calc-label-row">
                    <label className="calc-label">Interest Rate (p.a.)</label>
                    <span className="calc-label" style={{ color: 'var(--color-premium-gold)', fontWeight: 'bold' }}>
                      {interestRate}%
                    </span>
                  </div>
                  <div className="calc-input-wrapper">
                    <input
                      type="number"
                      className="calc-text-input"
                      value={interestRate}
                      min="5"
                      max="20"
                      style={{ paddingRight: '2rem' }}
                      onChange={(e) => {
                        const val = e.target.value;
                        setInterestRate(val === '' ? '' : Math.max(0, parseFloat(val) || 0));
                      }}
                    />
                    <span className="calc-input-suffix">%</span>
                  </div>
                  <div className="calc-slider-wrapper">
                    <input
                      type="range"
                      className="calc-slider"
                      min="5"
                      max="20"
                      step="0.1"
                      value={Number(interestRate) || 5}
                      onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                    />
                  </div>
                </div>

                {/* 3. Tenure Toggle & Slider */}
                <div className="calc-group">
                  <div className="calc-label-row">
                    <label className="calc-label">Loan Tenure</label>
                    <div className="calc-toggle-group">
                      <button
                        type="button"
                        className={`calc-toggle-btn ${tenureMode === 'years' ? 'is-active' : ''}`}
                        onClick={() => setTenureMode('years')}
                      >
                        Years
                      </button>
                      <button
                        type="button"
                        className={`calc-toggle-btn ${tenureMode === 'months' ? 'is-active' : ''}`}
                        onClick={() => setTenureMode('months')}
                      >
                        Months
                      </button>
                    </div>
                  </div>

                  {tenureMode === 'years' ? (
                    <>
                      <div className="calc-input-wrapper">
                        <input
                          type="number"
                          className="calc-text-input"
                          value={tenureYears}
                          min="1"
                          max="30"
                          style={{ paddingRight: '3.5rem' }}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTenureYears(val === '' ? '' : Math.max(1, parseInt(val) || 1));
                          }}
                        />
                        <span className="calc-input-suffix">Years</span>
                      </div>
                      <div className="calc-slider-wrapper">
                        <input
                          type="range"
                          className="calc-slider"
                          min="1"
                          max="30"
                          step="1"
                          value={Number(tenureYears) || 1}
                          onChange={(e) => setTenureYears(parseInt(e.target.value))}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="calc-input-wrapper">
                        <input
                          type="number"
                          className="calc-text-input"
                          value={tenureMonths}
                          min="12"
                          max="360"
                          style={{ paddingRight: '4.5rem' }}
                          onChange={(e) => {
                            const val = e.target.value;
                            setTenureMonths(val === '' ? '' : Math.max(12, parseInt(val) || 12));
                          }}
                        />
                        <span className="calc-input-suffix">Months</span>
                      </div>
                      <div className="calc-slider-wrapper">
                        <input
                          type="range"
                          className="calc-slider"
                          min="12"
                          max="360"
                          step="1"
                          value={Number(tenureMonths) || 12}
                          onChange={(e) => setTenureMonths(parseInt(e.target.value))}
                        />
                      </div>
                    </>
                  )}
                </div>

              </div>

              {/* Right Column: Output Summary & Visual Donut Chart */}
              <div className="calc-card">
                <div className="calc-result-header">
                  <div className="calc-result-lbl">Monthly Payment (EMI)</div>
                  <div className="calc-result-emi" ref={emiValRef} data-value="0">
                    {formatCurrency(calcData.monthlyEMI)}
                  </div>
                  <div className="calc-result-subtext">calculated for your tenure</div>
                </div>

                {/* SVG Donut Chart */}
                <div className="calc-chart-container">
                  <svg className="calc-donut-svg" width="180" height="180" viewBox="0 0 160 160">
                    {/* Background Ring */}
                    <circle
                      className="calc-donut-bg"
                      cx="80"
                      cy="80"
                      r={radius}
                      strokeWidth={strokeWidth}
                    />
                    {/* Interest Segment (Gray) */}
                    <circle
                      className="calc-donut-interest"
                      cx="80"
                      cy="80"
                      r={radius}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={0}
                    />
                    {/* Principal Segment (Gold) */}
                    <circle
                      className="calc-donut-principal"
                      cx="80"
                      cy="80"
                      r={radius}
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={principalOffset}
                    />
                  </svg>
                  <div className="calc-chart-overlay">
                    <span className="calc-chart-overlay-val">
                      {chartPercentages.principal.toFixed(0)}%
                    </span>
                    <span className="calc-chart-overlay-lbl">Principal</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="calc-legend">
                  <div className="calc-legend-item">
                    <div className="calc-legend-dot-wrapper">
                      <span className="calc-legend-dot calc-legend-dot--principal" />
                      <span>Principal Amount</span>
                    </div>
                    <span className="calc-legend-val">{formatCurrency(loanAmount)}</span>
                  </div>
                  <div className="calc-legend-item">
                    <div className="calc-legend-dot-wrapper">
                      <span className="calc-legend-dot calc-legend-dot--interest" />
                      <span>Interest Payable</span>
                    </div>
                    <span className="calc-legend-val">{formatCurrency(calcData.base.totalInterest)}</span>
                  </div>
                </div>

                <div className="calc-summary-divider" />

                {/* Summary Metrics */}
                <div className="calc-summary-row">
                  <span className="calc-summary-lbl">Total Amount Payable</span>
                  <span className="calc-summary-val">{formatCurrency(calcData.base.totalPayment)}</span>
                </div>
                <div className="calc-summary-row">
                  <span className="calc-summary-lbl">Loan Tenure</span>
                  <span className="calc-summary-val">
                    {tenureMode === 'years' ? `${tenureYears} Years` : `${tenureMonths} Months`}
                  </span>
                </div>
              </div>

              {/* Prepayment Simulator Card (Spans both columns) */}
              <div className="calc-card calc-simulator-card">
                <div className="simulator-header" onClick={() => setIsSimOpen(prev => !prev)}>
                  <div className="calc-card__title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    Interactive Prepayment Simulator
                  </div>
                  <span className={`simulator-toggle-icon ${isSimOpen ? 'is-open' : ''}`}>▼</span>
                </div>

                {isSimOpen && (
                  <div className="simulator-body">
                    {/* Inputs */}
                    <div className="simulator-inputs">
                      <p className="calc-result-subtext" style={{ marginBottom: 'var(--space-sm)' }}>
                        Making extra payments towards your principal helps you pay off your loan much faster and saves massive amounts in interest.
                      </p>

                      <div className="calc-group">
                        <label className="calc-label">Monthly Extra Prepayment</label>
                        <div className="calc-input-wrapper" style={{ marginTop: '4px' }}>
                          <span className="calc-input-prefix">₹</span>
                          <input
                            type="number"
                            className="calc-text-input"
                            value={prepaymentMonthly}
                            min="0"
                            style={{ paddingLeft: '2.5rem' }}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPrepaymentMonthly(val === '' ? '' : Math.max(0, parseInt(val) || 0));
                            }}
                          />
                        </div>
                      </div>

                      <div className="calc-group">
                        <label className="calc-label">One-Time Lump-Sum Prepayment</label>
                        <div className="calc-input-wrapper" style={{ marginTop: '4px' }}>
                          <span className="calc-input-prefix">₹</span>
                          <input
                            type="number"
                            className="calc-text-input"
                            value={prepaymentLumpSum}
                            min="0"
                            style={{ paddingLeft: '2.5rem' }}
                            onChange={(e) => {
                              const val = e.target.value;
                              setPrepaymentLumpSum(val === '' ? '' : Math.max(0, parseInt(val) || 0));
                            }}
                          />
                        </div>
                      </div>

                      {(Number(prepaymentLumpSum) || 0) > 0 && (
                        <div className="calc-group">
                          <label className="calc-label">Paid in Month (1 to {totalMonths})</label>
                          <div className="calc-input-wrapper" style={{ marginTop: '4px' }}>
                            <input
                              type="number"
                              className="calc-text-input"
                              value={prepaymentLumpSumMonth}
                              min="1"
                              max={totalMonths}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPrepaymentLumpSumMonth(val === '' ? '' : Math.min(totalMonths, Math.max(1, parseInt(val) || 1)));
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Savings Results */}
                    <div className="simulator-results">
                      <div className="sim-saving-badge">
                        <span className="sim-saving-icon">💰</span>
                        <div className="sim-saving-details">
                          <h4>Interest Saved</h4>
                          <p>
                            {formatCurrency(Math.max(0, calcData.base.totalInterest - calcData.sim.totalInterest))}
                          </p>
                        </div>
                      </div>

                      <div className="sim-saving-badge">
                        <span className="sim-saving-icon">📅</span>
                        <div className="sim-saving-details">
                          <h4>Tenure Reduction</h4>
                          <p>
                            {calcData.base.tenureMonths - calcData.sim.tenureMonths > 0 ? (
                              tenureMode === 'years' 
                                ? `${((calcData.base.tenureMonths - calcData.sim.tenureMonths) / 12).toFixed(1)} Years`
                                : `${calcData.base.tenureMonths - calcData.sim.tenureMonths} Months`
                            ) : (
                              'No change'
                            )}
                          </p>
                        </div>
                      </div>

                      <div className="sim-saving-badge" style={{ backgroundColor: 'rgba(52, 199, 89, 0.05)', borderColor: 'rgba(52, 199, 89, 0.1)' }}>
                        <span className="sim-saving-icon">🏆</span>
                        <div className="sim-saving-details">
                          <h4>New Total Interest</h4>
                          <p style={{ color: '#34c759' }}>{formatCurrency(calcData.sim.totalInterest)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Amortization Table (Spans both columns) */}
              <div className="calc-card amort-card">
                <div className="amort-header-row">
                  <div className="calc-card__title" style={{ borderBottom: 'none', marginBottom: 0, paddingBottom: 0 }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 20h9M3 20v-8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v8M3 20h18M14 20v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
                    </svg>
                    Payment Schedule (Amortization)
                  </div>
                  
                  <div className="amort-actions">
                    <div className="calc-toggle-group">
                      <button
                        type="button"
                        className={`calc-toggle-btn ${amortMode === 'yearly' ? 'is-active' : ''}`}
                        onClick={() => setAmortMode('yearly')}
                      >
                        Yearly
                      </button>
                      <button
                        type="button"
                        className={`calc-toggle-btn ${amortMode === 'monthly' ? 'is-active' : ''}`}
                        onClick={() => setAmortMode('monthly')}
                      >
                        Monthly
                      </button>
                    </div>

                    <button type="button" className="btn-csv" onClick={downloadCSV}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                      </svg>
                      Download CSV
                    </button>
                  </div>
                </div>

                <div className="amort-table-wrapper">
                  <table className="amort-table">
                    <thead>
                      <tr>
                        <th>{amortMode === 'yearly' ? 'Year' : 'Month'}</th>
                        <th>Opening Balance</th>
                        <th>Principal Paid</th>
                        <th>Interest Paid</th>
                        {isSimOpen && <th>Prepayment</th>}
                        <th>Closing Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortMode === 'yearly' ? (
                        amortizationData.map((y) => {
                          const isOpen = !!expandedYears[y.year];
                          return (
                            <optgroup key={y.year} style={{ border: 'none' }}>
                              <tr className="amort-year-header" onClick={() => toggleYear(y.year)}>
                                <td>
                                  <div className="amort-year-label">
                                    <span className={`amort-chevron ${isOpen ? 'is-open' : ''}`}>▶</span>
                                    Year {y.year}
                                  </div>
                                </td>
                                <td>{formatCurrency(y.openingBalance)}</td>
                                <td>{formatCurrency(y.principalPaid)}</td>
                                <td>{formatCurrency(y.interestPaid)}</td>
                                {isSimOpen && <td className="prepayment-cell">{formatCurrency(y.prepayment)}</td>}
                                <td>{formatCurrency(y.closingBalance)}</td>
                              </tr>
                              {isOpen && y.months.map((m) => (
                                <tr key={m.month} className="amort-monthly-row">
                                  <td style={{ paddingLeft: '2.5rem' }}>Month {m.month}</td>
                                  <td>{formatCurrency(m.openingBalance)}</td>
                                  <td>{formatCurrency(m.principalPaid)}</td>
                                  <td>{formatCurrency(m.interestPaid)}</td>
                                  {isSimOpen && <td className="prepayment-cell">{formatCurrency(m.prepayment)}</td>}
                                  <td>{formatCurrency(m.closingBalance)}</td>
                                </tr>
                              ))}
                            </optgroup>
                          );
                        })
                      ) : (
                        (isSimOpen ? calcData.sim.schedule : calcData.base.schedule).map((m) => (
                          <tr key={m.month}>
                            <td>Month {m.month}</td>
                            <td>{formatCurrency(m.openingBalance)}</td>
                            <td>{formatCurrency(m.principalPaid)}</td>
                            <td>{formatCurrency(m.interestPaid)}</td>
                            {isSimOpen && <td className="prepayment-cell">{formatCurrency(m.prepayment)}</td>}
                            <td>{formatCurrency(m.closingBalance)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* WEEKLY SALARY ACCOUNT STATEMENT DOWNLOAD CARD */}
            <div className="calc-card" style={{ marginTop: '40px', padding: '30px', textAlign: 'center', background: 'rgba(201, 169, 110, 0.05)', border: '1px solid rgba(201, 169, 110, 0.15)' }}>
              <div className="calc-card__title" style={{ justifyContent: 'center', borderBottom: 'none', marginBottom: '10px' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-premium-gold)" strokeWidth="2" style={{ color: '#C9A96E' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Weekly Salary Account Statement Template
              </div>
              <p className="calc-result-subtext" style={{ maxWidth: '600px', margin: '0 auto 20px auto', fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                Download our standardized Weekly Salary Account Statement spreadsheet template. Designed for builders, contractors, and customers to coordinate weekly project work, materials, issued advances, and balance tracking.
              </p>
              <a 
                href="/assets/weekly-salary-template.xlsx" 
                download="Weekly_Salary_Statement_Template.xlsx" 
                className="btn btn--outline"
                style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download Excel Template
              </a>
            </div>

            {/* CTA BLOCK */}
            <div className="calculator-cta">
              <h2 className="calculator-cta__title">Ready to Finance Your Build?</h2>
              <p className="calculator-cta__desc">
                Financing a project can be complicated, but our construction experts and partner banks are here to help. Get premium construction loans with minimal paperwork and attractive interest rates.
              </p>
              <a href="/#contact" className="btn btn--primary" style={{ textDecoration: 'none' }}>
                Discuss Financing Options
              </a>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
