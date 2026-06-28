/* ============================================================
   ADMIN PLOTS — SVG Layout Manager + Edit Dialog
   Exact replica of the public MasterPlan SVG layout
   ============================================================ */
import { useState, useEffect, useRef } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminLayout from '../../components/admin/AdminLayout';

const statusColors = {
  available: { fill: 'rgba(72, 187, 120, 0.25)', stroke: '#48bb78', label: 'Available', activeFill: 'rgba(72, 187, 120, 0.55)' },
  sold:      { fill: 'rgba(245, 101, 101, 0.25)', stroke: '#f56565', label: 'Sold',      activeFill: 'rgba(245, 101, 101, 0.55)' },
  reserved:  { fill: 'rgba(237, 187, 69, 0.25)',  stroke: '#edbb45', label: 'Reserved',  activeFill: 'rgba(237, 187, 69, 0.55)' },
};

export default function AdminPlots() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activePhase, setActivePhase] = useState(1);
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [editPlot, setEditPlot] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const tooltipRef = useRef(null);

  const fetchPlots = async () => {
    const { data, error } = await supabase.from('plots').select('*').order('id');
    if (!error && data) setPlots(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlots();
    const channel = supabase
      .channel('admin-plots')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'plots' }, () => { fetchPlots(); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const phasePlots = plots.filter(p => p.phase === activePhase);

  // Open edit dialog
  const openEdit = (plot) => {
    setEditPlot(plot);
    setEditForm({
      plot_number: plot.plot_number,
      total_area: plot.total_area,
      facing: plot.facing,
      price_per_sqft: plot.price_per_sqft,
      status: plot.status,
      notes: plot.notes || '',
    });
  };

  // Save edit
  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('plots')
      .update({
        total_area: Number(editForm.total_area),
        facing: editForm.facing,
        price_per_sqft: Number(editForm.price_per_sqft),
        status: editForm.status,
        notes: editForm.notes,
      })
      .eq('id', editPlot.id);

    if (error) {
      setToast('Error saving: ' + error.message);
    } else {
      setToast(`Plot ${editPlot.plot_number} updated successfully!`);
      setEditPlot(null);
    }
    setSaving(false);
    setTimeout(() => setToast(''), 3000);
  };

  // Print layout
  const handlePrint = () => {
    window.open(`/admin/print?phase=${activePhase}`, '_blank');
  };

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Plot Management</h2>
            <p className="admin-page__subtitle">Click any plot on the layout to edit its details</p>
          </div>
          <button className="admin-btn admin-btn--outline" onClick={handlePrint}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Print Layout
          </button>
        </div>

        {/* Toast notification */}
        {toast && <div className="admin-toast">{toast}</div>}

        {/* Phase Toggle */}
        <div className="admin-phase-toggle">
          <button
            className={`admin-phase-btn ${activePhase === 1 ? 'is-active' : ''}`}
            onClick={() => setActivePhase(1)}
          >
            Phase 1 ({plots.filter(p => p.phase === 1).length} plots)
          </button>
          <button
            className={`admin-phase-btn ${activePhase === 2 ? 'is-active' : ''}`}
            onClick={() => setActivePhase(2)}
          >
            Phase 2 ({plots.filter(p => p.phase === 2).length} plots)
          </button>
        </div>

        {/* Legend */}
        <div className="admin-legend">
          {Object.entries(statusColors).map(([key, val]) => (
            <div className="admin-legend__item" key={key}>
              <span className="admin-legend__dot" style={{ background: val.stroke }} />
              <span>{val.label}</span>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading plots...</p></div>
        ) : (
          <div className="admin-plots-layout">
            {/* SVG Map — exact replica of MasterPlan */}
            <div className="admin-svg-container">
              <svg viewBox="0 0 110 240" className="admin-svg" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <pattern id="admin-available-hatch" width="8" height="8" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="rgba(72, 187, 120, 0.12)" />
                    <line x1="0" y1="0" x2="0" y2="8" stroke="#48bb78" strokeWidth="2" />
                  </pattern>
                </defs>

                {/* Background */}
                <rect x="0" y="0" width="110" height="240" fill="#161616" rx="2" />

                {activePhase === 1 ? (
                  <>
                    {/* Phase 1 roads */}
                    <polygon points="55.30,10 63.30,10 51.00,215 43.00,215" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
                    <text x="53.3" y="110" textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="3.2" fontWeight="600" transform="rotate(-93.4, 53.3, 110)" fontFamily="Outfit, sans-serif">24 FT WIDE ROAD</text>
                    <polygon points="0,215 110,215 110,238 0,238" fill="rgba(201,169,110,0.06)" stroke="rgba(201,169,110,0.12)" strokeWidth="0.2" />
                    <text x="55" y="228" textAnchor="middle" fill="rgba(201,169,110,0.25)" fontSize="2.8" fontWeight="600" fontFamily="Outfit, sans-serif">EXISTING ROAD TO PODUMBU</text>
                    <text x="55" y="7" textAnchor="middle" fill="#C9A86A" fontSize="3.8" fontFamily="Cormorant Garamond, serif" fontWeight="600">KARUPPIAH NAGAR — PHASE 1</text>
                  </>
                ) : (
                  <>
                    {/* Phase 2 roads */}
                    <rect x="50" y="15" width="10" height="190" fill="rgba(201,169,110,0.08)" stroke="rgba(201,169,110,0.15)" strokeWidth="0.2" />
                    <text x="55" y="110" textAnchor="middle" fill="rgba(201,169,110,0.3)" fontSize="3.2" fontWeight="600" transform="rotate(-90, 55, 110)" fontFamily="Outfit, sans-serif">30 FEET WIDE ROAD</text>
                    <rect x="0" y="205" width="110" height="30" fill="rgba(201,169,110,0.06)" stroke="rgba(201,169,110,0.12)" strokeWidth="0.2" />
                    <text x="55" y="222" textAnchor="middle" fill="rgba(201,169,110,0.25)" fontSize="2.5" fontWeight="600" fontFamily="Outfit, sans-serif">SENDHOOR AVENUE (30 FT ROAD)</text>
                    <text x="55" y="7" textAnchor="middle" fill="#C9A86A" fontSize="3.8" fontFamily="Cormorant Garamond, serif" fontWeight="600">KARUPPIAH NAGAR — PHASE 2</text>
                  </>
                )}

                {/* Plot blocks */}
                {phasePlots.map(plot => {
                  const colors = statusColors[plot.status] || statusColors.available;
                  const isHovered = hoveredPlot?.id === plot.id;
                  return (
                    <g
                      key={plot.id}
                      style={{ cursor: 'pointer' }}
                      onClick={() => openEdit(plot)}
                      onMouseEnter={() => setHoveredPlot(plot)}
                      onMouseLeave={() => setHoveredPlot(null)}
                    >
                      <polygon
                        points={plot.points}
                        fill={plot.status === 'available' ? (isHovered ? colors.activeFill : 'url(#admin-available-hatch)') : (isHovered ? colors.activeFill : colors.fill)}
                        stroke={isHovered ? '#fff' : colors.stroke}
                        strokeWidth={isHovered ? 0.8 : 0.3}
                        style={{ transition: 'all 0.3s ease' }}
                      />
                      <text
                        x={plot.label_x}
                        y={plot.plot_number === '35A' ? Number(plot.label_y) + 0.8 : Number(plot.label_y) - 0.8}
                        textAnchor="middle"
                        fill="#fff"
                        fontSize={plot.plot_number === '35A' ? '1.6' : '2.6'}
                        fontFamily="Outfit, sans-serif"
                        fontWeight="600"
                      >
                        {plot.plot_number}
                      </text>
                      {plot.plot_number !== '35A' && (
                        <text
                          x={plot.label_x}
                          y={Number(plot.label_y) + 2}
                          textAnchor="middle"
                          fill="#A8A8A8"
                          fontSize="1.3"
                          fontFamily="Outfit, sans-serif"
                        >
                          {Number(plot.total_area).toLocaleString()}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Hover Tooltip */}
              {hoveredPlot && (
                <div className="admin-tooltip" ref={tooltipRef}>
                  <strong>Plot {hoveredPlot.plot_number}</strong>
                  <span>{Number(hoveredPlot.total_area).toLocaleString()} sq.ft</span>
                  <span className={`admin-status admin-status--${hoveredPlot.status}`}>
                    {statusColors[hoveredPlot.status]?.label}
                  </span>
                </div>
              )}
            </div>

            {/* Plot Table */}
            <div className="admin-table-card admin-plots-table">
              <h3 className="admin-table-card__title">
                Phase {activePhase} — All Plots ({phasePlots.length})
              </h3>
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Plot #</th>
                      <th>Sq.Ft</th>
                      <th>Facing</th>
                      <th>Status</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {phasePlots.map(plot => (
                      <tr key={plot.id}>
                        <td><strong>{plot.plot_number}</strong></td>
                        <td>{Number(plot.total_area).toLocaleString()}</td>
                        <td>{plot.facing}</td>
                        <td>
                          <span className={`admin-status admin-status--${plot.status}`}>
                            {statusColors[plot.status]?.label}
                          </span>
                        </td>
                        <td>₹{(Number(plot.total_area) * Number(plot.price_per_sqft)).toLocaleString('en-IN')}</td>
                        <td>
                          <button className="admin-btn admin-btn--sm" onClick={() => openEdit(plot)}>Edit</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Edit Dialog Modal */}
        {editPlot && (
          <div className="admin-modal-overlay" onClick={() => setEditPlot(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="admin-modal__header">
                <h3>Edit Plot {editPlot.plot_number}</h3>
                <button className="admin-modal__close" onClick={() => setEditPlot(null)}>✕</button>
              </div>

              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label>Plot Number</label>
                  <input type="text" value={editForm.plot_number} disabled className="admin-input" />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Total Sq.Ft</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={editForm.total_area}
                      onChange={e => setEditForm({ ...editForm, total_area: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Facing</label>
                    <select
                      className="admin-input"
                      value={editForm.facing}
                      onChange={e => setEditForm({ ...editForm, facing: e.target.value })}
                    >
                      <option value="East">East</option>
                      <option value="West">West</option>
                      <option value="North">North</option>
                      <option value="South">South</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Price per Sq.Ft (₹)</label>
                    <input
                      type="number"
                      className="admin-input"
                      value={editForm.price_per_sqft}
                      onChange={e => setEditForm({ ...editForm, price_per_sqft: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Status</label>
                    <select
                      className="admin-input admin-input--status"
                      value={editForm.status}
                      onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                      style={{
                        borderColor: statusColors[editForm.status]?.stroke,
                        color: statusColors[editForm.status]?.stroke,
                      }}
                    >
                      <option value="available">Available</option>
                      <option value="reserved">Reserved</option>
                      <option value="sold">Sold</option>
                    </select>
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Total Price</label>
                  <div className="admin-price-display">
                    ₹{(Number(editForm.total_area || 0) * Number(editForm.price_per_sqft || 0)).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="admin-form-group">
                  <label>Notes</label>
                  <textarea
                    className="admin-input admin-textarea"
                    rows="3"
                    value={editForm.notes}
                    onChange={e => setEditForm({ ...editForm, notes: e.target.value })}
                    placeholder="Add any notes about this plot..."
                  />
                </div>
              </div>

              <div className="admin-modal__footer">
                <button className="admin-btn admin-btn--outline" onClick={() => setEditPlot(null)}>Cancel</button>
                <button className="admin-btn admin-btn--primary" onClick={handleSave} disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
