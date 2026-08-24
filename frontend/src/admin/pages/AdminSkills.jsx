import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { broadcastSync } from '../../hooks/useSync';

const CATEGORIES = ['Languages', 'Frontend', 'Backend', 'Databases', 'DevOps', 'Tools', 'Core CS', 'Other'];
const emptyForm = { name: '', category: 'Languages', icon: '', order: 0 };

const AdminSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = () => { setLoading(true); api.get('/api/skills').then(r => setSkills(r.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setSuccess(''); setShowForm(true); };
  const openEdit = (s) => { setForm({ name: s.name, category: s.category, icon: s.icon || '', order: s.order || 0 }); setEditId(s._id); setError(''); setSuccess(''); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try { await api.delete(`/api/skills/${id}`); broadcastSync('skills'); setSuccess('Skill deleted'); load(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setSuccess('');
    try {
      if (editId) { await api.put(`/api/skills/${editId}`, form); setSuccess('Skill updated'); }
      else { await api.post('/api/skills', form); setSuccess('Skill added'); }
      broadcastSync('skills'); setShowForm(false); load();
    } catch (err) { setError(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const grouped = CATEGORIES.reduce((acc, cat) => { acc[cat] = skills.filter(s => s.category === cat); return acc; }, {});

  return (
    <div>
      <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Portfolio</p>
      <div className="flex items-center justify-between mb-10">
        <h1 className="admin-page-title mb-0">Skills</h1>
        <button onClick={openAdd} className="admin-btn-primary">+ Add Skill</button>
      </div>

      {error && <div className="border border-red-500/30 bg-red-500/5 text-red-400 px-4 py-3 text-sm mb-6">{error}</div>}
      {success && <div className="border border-accent/30 bg-accent/5 text-accent px-4 py-3 text-sm mb-6">{success}</div>}

      {showForm && (
        <div className="admin-card">
          <h2 className="admin-section-title">{editId ? 'Edit Skill' : 'New Skill'}</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="admin-label">Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Category *</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="admin-input">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="admin-label">Icon key (e.g. SiReact)</label>
              <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))} className="admin-input" />
            </div>
            <div>
              <label className="admin-label">Order</label>
              <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))} className="admin-input" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-50">{saving ? 'Saving...' : editId ? 'Update' : 'Add'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="admin-btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-text-muted text-sm">Loading...</p> : (
        <div className="space-y-6">
          {CATEGORIES.map(cat => grouped[cat]?.length > 0 && (
            <div key={cat}>
              <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-2">{cat}</p>
              <div className="border border-border">
                {grouped[cat].map((s, i) => (
                  <div key={s._id} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-border' : ''}`}>
                    <div>
                      <span className="text-text-primary text-sm">{s.name}</span>
                      {s.icon && <span className="font-mono text-xs text-text-muted ml-2">{s.icon}</span>}
                      <span className="font-mono text-xs text-text-muted ml-2">#{s.order}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="admin-btn-ghost text-xs">Edit</button>
                      <button onClick={() => handleDelete(s._id)} className="admin-btn-danger text-xs">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminSkills;
