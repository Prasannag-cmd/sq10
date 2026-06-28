/* ============================================================
   ADMIN BOOKINGS — CRUD Booking Records Management
   ============================================================ */
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import AdminLayout from '../../components/admin/AdminLayout';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editBooking, setEditBooking] = useState(null);
  const [toast, setToast] = useState('');
  const [form, setForm] = useState({
    customer_name: '',
    mobile: '',
    plot_number: '',
    phase: 1,
    plot_size: '',
    booking_status: 'reserved',
    notes: '',
  });

  const fetchData = async () => {
    const [bookingsRes, plotsRes] = await Promise.all([
      supabase.from('bookings').select('*').order('created_at', { ascending: false }),
      supabase.from('plots').select('*').order('id'),
    ]);
    if (bookingsRes.data) setBookings(bookingsRes.data);
    if (plotsRes.data) setPlots(plotsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    const channel = supabase
      .channel('admin-bookings')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'bookings' }, () => { fetchData(); })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000); };

  const openAdd = () => {
    setEditBooking(null);
    setForm({ customer_name: '', mobile: '', plot_number: '', phase: 1, plot_size: '', booking_status: 'reserved', notes: '' });
    setShowForm(true);
  };

  const openEdit = (b) => {
    setEditBooking(b);
    setForm({
      customer_name: b.customer_name,
      mobile: b.mobile,
      plot_number: b.plot_number,
      phase: b.phase,
      plot_size: b.plot_size || '',
      booking_status: b.booking_status,
      notes: b.notes || '',
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.customer_name || !form.mobile || !form.plot_number) {
      showToast('Please fill required fields: Name, Mobile, Plot Number');
      return;
    }

    // Find matching plot to get plot_id
    const matchedPlot = plots.find(p => p.plot_number === form.plot_number && p.phase === Number(form.phase));

    if (editBooking) {
      // 1. If previous booking was pointing to a plot, reset it to available first
      if (editBooking.plot_id) {
        await supabase.from('plots').update({ status: 'available' }).eq('id', editBooking.plot_id);
      }

      // 2. Save the updated booking
      const { error } = await supabase.from('bookings').update({
        ...form,
        phase: Number(form.phase),
        plot_id: matchedPlot?.id || null,
      }).eq('id', editBooking.id);
      if (error) { showToast('Error: ' + error.message); return; }

      // 3. Update the new matched plot status
      if (matchedPlot) {
        const plotStatus = form.booking_status === 'cancelled' ? 'available' : form.booking_status;
        await supabase.from('plots').update({ status: plotStatus }).eq('id', matchedPlot.id);
      }

      showToast('Booking updated successfully!');
    } else {
      // Insert new booking
      const { error } = await supabase.from('bookings').insert({
        ...form,
        phase: Number(form.phase),
        plot_id: matchedPlot?.id || null,
      });
      if (error) { showToast('Error: ' + error.message); return; }

      // Auto-update plot status if matched
      if (matchedPlot) {
        const plotStatus = form.booking_status === 'cancelled' ? 'available' : form.booking_status;
        await supabase.from('plots').update({ status: plotStatus }).eq('id', matchedPlot.id);
      }

      showToast('Booking added successfully!');
    }
    setShowForm(false);
    fetchData();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    
    // Find the booking details first to reset the corresponding plot status to available
    const bookingToDelete = bookings.find(b => b.id === id);
    if (bookingToDelete && bookingToDelete.plot_id) {
      await supabase.from('plots').update({ status: 'available' }).eq('id', bookingToDelete.plot_id);
    }

    const { error } = await supabase.from('bookings').delete().eq('id', id);
    if (error) { showToast('Error: ' + error.message); return; }
    showToast('Booking deleted');
    fetchData();
  };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    return (
      b.customer_name.toLowerCase().includes(q) ||
      b.mobile.includes(q) ||
      b.plot_number.toLowerCase().includes(q)
    );
  });

  return (
    <AdminLayout>
      <div className="admin-page">
        <div className="admin-page__header">
          <div>
            <h2 className="admin-page__title">Bookings</h2>
            <p className="admin-page__subtitle">Manage customer plot bookings</p>
          </div>
          <button className="admin-btn admin-btn--primary" onClick={openAdd}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Add Booking
          </button>
        </div>

        {toast && <div className="admin-toast">{toast}</div>}

        {/* Search */}
        <div className="admin-search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className="admin-search__input"
            placeholder="Search by name, mobile, or plot number..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="admin-loading"><div className="admin-loading__spinner" /><p>Loading bookings...</p></div>
        ) : (
          <div className="admin-table-card">
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Mobile</th>
                    <th>Plot #</th>
                    <th>Phase</th>
                    <th>Plot Size</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem', color: '#888' }}>No bookings found</td></tr>
                  ) : (
                    filtered.map(b => (
                      <tr key={b.id}>
                        <td><strong>{b.customer_name}</strong></td>
                        <td>{b.mobile}</td>
                        <td>{b.plot_number}</td>
                        <td>Phase {b.phase}</td>
                        <td>{b.plot_size || '—'}</td>
                        <td>
                          <span className={`admin-status admin-status--${b.booking_status}`}>
                            {b.booking_status.charAt(0).toUpperCase() + b.booking_status.slice(1)}
                          </span>
                        </td>
                        <td>{new Date(b.created_at).toLocaleDateString('en-IN')}</td>
                        <td>
                          <div className="admin-actions">
                            <button className="admin-btn admin-btn--sm" onClick={() => openEdit(b)}>Edit</button>
                            <button className="admin-btn admin-btn--sm admin-btn--danger" onClick={() => handleDelete(b.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Booking Modal */}
        {showForm && (
          <div className="admin-modal-overlay" onClick={() => setShowForm(false)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <div className="admin-modal__header">
                <h3>{editBooking ? 'Edit Booking' : 'Add New Booking'}</h3>
                <button className="admin-modal__close" onClick={() => setShowForm(false)}>✕</button>
              </div>
              <div className="admin-modal__body">
                <div className="admin-form-group">
                  <label>Customer Name *</label>
                  <input className="admin-input" value={form.customer_name} onChange={e => setForm({ ...form, customer_name: e.target.value })} placeholder="Full Name" />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Mobile Number *</label>
                    <input className="admin-input" value={form.mobile} onChange={e => setForm({ ...form, mobile: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="admin-form-group">
                    <label>Plot Number *</label>
                    <input className="admin-input" value={form.plot_number} onChange={e => setForm({ ...form, plot_number: e.target.value })} placeholder="e.g. 17" />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label>Phase</label>
                    <select className="admin-input" value={form.phase} onChange={e => setForm({ ...form, phase: e.target.value })}>
                      <option value={1}>Phase 1</option>
                      <option value={2}>Phase 2</option>
                    </select>
                  </div>
                  <div className="admin-form-group">
                    <label>Plot Size</label>
                    <input className="admin-input" value={form.plot_size} onChange={e => setForm({ ...form, plot_size: e.target.value })} placeholder="e.g. 2359 sq.ft" />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label>Booking Status</label>
                  <select className="admin-input" value={form.booking_status} onChange={e => setForm({ ...form, booking_status: e.target.value })}>
                    <option value="reserved">Reserved</option>
                    <option value="sold">Sold</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>Notes</label>
                  <textarea className="admin-input admin-textarea" rows="2" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Optional notes..." />
                </div>
              </div>
              <div className="admin-modal__footer">
                <button className="admin-btn admin-btn--outline" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="admin-btn admin-btn--primary" onClick={handleSave}>
                  {editBooking ? 'Update Booking' : 'Add Booking'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
