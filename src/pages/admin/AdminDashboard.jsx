/* ============================================================
   ADMIN DASHBOARD — Stats Overview with Realtime Updates
   ============================================================ */
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminDashboard() {
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPlots = async () => {
    const { data, error } = await supabase.from('plots').select('*');
    if (!error && data) setPlots(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchPlots();

    // Realtime subscription
    const channel = supabase
      .channel('dashboard-plots')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'plots' }, () => {
        fetchPlots();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const phase1 = plots.filter(p => p.phase === 1);
  const phase2 = plots.filter(p => p.phase === 2);
  const available = plots.filter(p => p.status === 'available');
  const reserved = plots.filter(p => p.status === 'reserved');
  const sold = plots.filter(p => p.status === 'sold');
  const totalSqft = plots.reduce((sum, p) => sum + Number(p.total_area || 0), 0);

  const cards = [
    { label: 'Total Plots', value: plots.length, icon: '🏗️', color: '#C9A86A' },
    { label: 'Available', value: available.length, icon: '✅', color: '#48bb78' },
    { label: 'Reserved', value: reserved.length, icon: '⏳', color: '#edbb45' },
    { label: 'Sold', value: sold.length, icon: '🔴', color: '#f56565' },
    { label: 'Total Sq.Ft', value: totalSqft.toLocaleString('en-IN'), icon: '📐', color: '#9F7AEA' },
    { label: 'Phase 1 Plots', value: phase1.length, icon: '1️⃣', color: '#4299E1' },
    { label: 'Phase 2 Plots', value: phase2.length, icon: '2️⃣', color: '#38B2AC' },
  ];

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <h2 className="admin-page__title">Dashboard</h2>
          <p className="admin-page__subtitle">Overview of Karuppiah Nagar plot inventory</p>
        </div>

        {loading ? (
          <div className="admin-loading">
            <div className="admin-loading__spinner" />
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            <div className="admin-cards">
              {cards.map((card, i) => (
                <div className="admin-card" key={i} style={{ borderTopColor: card.color }}>
                  <div className="admin-card__icon">{card.icon}</div>
                  <div className="admin-card__body">
                    <span className="admin-card__value" style={{ color: card.color }}>{card.value}</span>
                    <span className="admin-card__label">{card.label}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Summary Tables */}
            <div className="admin-dashboard-grid">
              <div className="admin-table-card">
                <h3 className="admin-table-card__title">Phase 1 — Status Breakdown</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Count</th>
                      <th>Total Sq.Ft</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="admin-status admin-status--available">Available</span></td>
                      <td>{phase1.filter(p => p.status === 'available').length}</td>
                      <td>{phase1.filter(p => p.status === 'available').reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td><span className="admin-status admin-status--reserved">Reserved</span></td>
                      <td>{phase1.filter(p => p.status === 'reserved').length}</td>
                      <td>{phase1.filter(p => p.status === 'reserved').reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td><span className="admin-status admin-status--sold">Sold</span></td>
                      <td>{phase1.filter(p => p.status === 'sold').length}</td>
                      <td>{phase1.filter(p => p.status === 'sold').reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="admin-table-card">
                <h3 className="admin-table-card__title">Phase 2 — Status Breakdown</h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Status</th>
                      <th>Count</th>
                      <th>Total Sq.Ft</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><span className="admin-status admin-status--available">Available</span></td>
                      <td>{phase2.filter(p => p.status === 'available').length}</td>
                      <td>{phase2.filter(p => p.status === 'available').reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td><span className="admin-status admin-status--reserved">Reserved</span></td>
                      <td>{phase2.filter(p => p.status === 'reserved').length}</td>
                      <td>{phase2.filter(p => p.status === 'reserved').reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
                    </tr>
                    <tr>
                      <td><span className="admin-status admin-status--sold">Sold</span></td>
                      <td>{phase2.filter(p => p.status === 'sold').length}</td>
                      <td>{phase2.filter(p => p.status === 'sold').reduce((s, p) => s + Number(p.total_area || 0), 0).toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
