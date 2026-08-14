import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = {
  company: '', position: '', employmentType: '', location: '',
  startDate: '', endDate: '', current: false,
  description: '', responsibilities: '', technologies: '', order: 0,
};

const AdminExperience = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/api/experience').then(r => setItems(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const toDateInput = (d) => d ? new Date(d).toISOString().split('T')[0] : '';

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setSuccess(''); setShowForm(true); };
  const openEdit = (item) => {
    setForm({
      company: item.company, position: item.position,
      employmentType: item.employmentType || '', location: item.location || '',
      startDate: toDateInput(item.startDate), endDate: toDateInput(item.endDate),
      current: item.current || false, description: item.description || '',
      responsibilities: (item.responsibilities || []).join('\n'),
      technologies: (item.technologies || []).join(', '),
      order: item.order || 0,
    });
    setEditId(item._id); setError(''); setSuccess(''); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    try { await api.delete(`/api/experience/${id}`); setSuccess('Deleted'); load(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const payload = {
        ...form,
        responsibilities: JSON.stringify(form.responsibilities.split('\n').filter(Boolean)),
        technologies: JSON.stringify(form.technologies.split(',').map(s => s.trim()).filter(Boolean)),
      };
      if (editId) { await api.put(`/api/experience/${editId}`, payload); setSuccess('Updated'); }
      else { await api.post('/api/experience', payload); setSuccess('Created'); }
      setShowForm(false); load();
    } catch (err) { setError(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const f = (key, label, type = 'text', required = false) => (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}{required ? ' *' : ''}</label>
      <input type={type} value={form[key]} onChange={e => setForm(p => ({ ...p, [key]: e.target.value }))} required={required}
        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Experience</h1>
        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">+ Add Experience</button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">{editId ? 'Edit Experience' : 'New Experience'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {f('company', 'Company', 'text', true)}
              {f('position', 'Position / Title', 'text', true)}
              {f('employmentType', 'Employment Type (e.g. Internship)')}
              {f('location', 'Location')}
              {f('startDate', 'Start Date', 'date', true)}
              {f('endDate', 'End Date', 'date')}
              {f('order', 'Order', 'number')}
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="current" checked={form.current} onChange={e => setForm(p => ({ ...p, current: e.target.checked }))} className="w-4 h-4" />
              <label htmlFor="current" className="text-sm text-gray-300">Currently working here</label>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 resize-y" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Responsibilities (one per line)</label>
              <textarea value={form.responsibilities} onChange={e => setForm(p => ({ ...p, responsibilities: e.target.value }))} rows={4}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 resize-y" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Technologies (comma separated)</label>
              <input value={form.technologies} onChange={e => setForm(p => ({ ...p, technologies: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded text-sm">
                {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-gray-400">Loading...</p> : items.length === 0 ? <p className="text-gray-400">No experience entries yet.</p> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white">{item.position} <span className="text-gray-400">@ {item.company}</span></h3>
                <p className="text-sm text-gray-500 mt-1">
                  {item.startDate ? new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                  {' – '}
                  {item.current ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
                  {item.location && ` · ${item.location}`}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(item)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded">Edit</button>
                <button onClick={() => handleDelete(item._id)} className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperience;
