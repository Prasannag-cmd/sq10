/* ============================================================
   PLOTS INVENTORY — Searchable grid with filters
   ============================================================ */
import React, { useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { allPlots as phase1Plots, allPlotsPhase2 as phase2Plots } from '../data/karuppiahNagarPlots';

gsap.registerPlugin(ScrollTrigger);

const statusBadge = {
  available: { cls: 'kn-badge--green', text: 'Available' },
  sold: { cls: 'kn-badge--red', text: 'Sold' },
  reserved: { cls: 'kn-badge--yellow', text: 'Reserved' },
};

export default function PlotsInventory({ activePhase = 1 }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const allPlots = activePhase === 2 ? phase2Plots : phase1Plots;

  // Reset filter and search on phase change
  useEffect(() => {
    setStatusFilter('all');
    setSearch('');
  }, [activePhase]);

  const filtered = useMemo(() => {
    return allPlots.filter(p => {
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;
      if (search && !`Plot ${p.id} ${p.areaStr}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [allPlots, statusFilter, search]);

  useEffect(() => {
    gsap.fromTo('.kn-inv__card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.04,
        scrollTrigger: { trigger: '.kn-inv__grid', start: 'top 85%' } }
    );
  }, [activePhase]);

  const availableCount = allPlots.filter(p => p.status === 'available').length;
  const soldCount = allPlots.filter(p => p.status === 'sold').length;
  const reservedCount = allPlots.filter(p => p.status === 'reserved').length;

  return (
    <section className="kn-inventory" id="kn-inventory">
      <div className="kn-container">
        <div className="kn-section-header">
          <span className="kn-section-tag">Plot Inventory (Phase {activePhase})</span>
          <h2 className="kn-section-title">Available Plots</h2>
          <p className="kn-section-desc">Browse our collection of premium plots. Filter by status or search by plot number.</p>
        </div>

        {/* Quick Stats */}
        <div className="kn-inv__quick-stats">
          <div className="kn-inv__qs-item kn-inv__qs--total"><span>{allPlots.length}</span>Total Plots</div>
          <div className="kn-inv__qs-item kn-inv__qs--available"><span>{availableCount}</span>Available</div>
          <div className="kn-inv__qs-item kn-inv__qs--sold"><span>{soldCount}</span>Sold</div>
          <div className="kn-inv__qs-item kn-inv__qs--reserved"><span>{reservedCount}</span>Reserved</div>
        </div>

        {/* Filters */}
        <div className="kn-inv__filters">
          <div className="kn-inv__search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Search by plot number..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="kn-inv__search"
            />
          </div>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="kn-inv__select">
            <option value="all">All Status</option>
            <option value="available">Available</option>
            <option value="sold">Sold</option>
            <option value="reserved">Reserved</option>
          </select>
        </div>

        {/* Results count */}
        <p className="kn-inv__results">{filtered.length} plots found</p>

        {/* Cards Grid */}
        <div className="kn-inv__grid" key={activePhase}>
          {filtered.map(p => (
            <div className={`kn-inv__card ${p.status === 'sold' ? 'kn-inv__card--sold' : ''}`} key={p.id}>
              <div className="kn-inv__card-top">
                <span className="kn-inv__card-id">Plot #{p.id}</span>
                <span className={`kn-badge ${statusBadge[p.status].cls}`}>{statusBadge[p.status].text}</span>
              </div>
              <div className="kn-inv__card-body">
                <div className="kn-inv__card-row"><span>Total Area</span><strong>{p.totalArea.toLocaleString()} sq.ft</strong></div>
                <div className="kn-inv__card-row"><span>Net Plot Area</span><strong>{p.plotArea.toLocaleString()} sq.ft</strong></div>
                {p.roadArea > 0 ? (
                  <div className="kn-inv__card-row"><span>Road Share</span><strong>{p.roadArea.toLocaleString()} sq.ft</strong></div>
                ) : (
                  <div className="kn-inv__card-row"><span>Road Share</span><strong>-</strong></div>
                )}
                <div className="kn-inv__card-row"><span>Land Measure</span><strong>{p.cents}</strong></div>
                <div className="kn-inv__card-row"><span>Dimensions</span><strong>{p.dimensions}</strong></div>
              </div>
              {p.status === 'available' && (
                <a
                  href={`https://wa.me/917540002054?text=I'm interested in Plot %23${p.id} at Karuppiah Nagar Phase ${activePhase} (${p.areaStr})`}
                  className="kn-btn kn-btn--primary kn-inv__card-cta" target="_blank" rel="noopener noreferrer"
                >
                  Enquire Now
                </a>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="kn-inv__empty">
            <p>No plots match your filters. Try adjusting your search criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
}
