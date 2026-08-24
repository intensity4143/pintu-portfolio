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

  const load = () => {
    setLoading(true);
    api.get('/api/skills').then(r => setSkills(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setSuccess(''); setShowForm(true); };
  const openEdit = (s) => { setForm({ name: s.name, category: s.category, icon: s.icon || '', order: s.order || 0 }); setEditId(s._id); setError(''); setSuccess(''); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    try {
      await api.delete(`/api/skills/${id}`);
      setSuccess('Skill deleted');
      broadcastSync('skills');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      if (editId) {
        await api.put(`/api/skills/${editId}`, form);
        setSuccess('Skill updated');
      } else {
        await api.post('/api/skills', form);
        setSuccess('Skill added');
      }
      broadcastSync('skills');
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = skills.filter(s => s.category === cat);
    return acc;
  }, {});

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Skills</h1>
        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">+ Add Skill</button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">{editId ? 'Edit Skill' : 'New Skill'}</h2>
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name *</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Category *</label>
              <select value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Icon key (e.g. SiReact)</label>
              <input value={form.icon} onChange={e => setForm(p => ({ ...p, icon: e.target.value }))}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Order</label>
              <input type="number" value={form.order} onChange={e => setForm(p => ({ ...p, order: Number(e.target.value) }))}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
            </div>
            <div className="md:col-span-2 flex gap-3">
              <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded text-sm">
                {saving ? 'Saving...' : editId ? 'Update' : 'Add'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-gray-400">Loading...</p> : (
        <div className="space-y-6">
          {CATEGORIES.map(cat => grouped[cat]?.length > 0 && (
            <div key={cat}>
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">{cat}</h2>
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                {grouped[cat].map((s, i) => (
                  <div key={s._id} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-gray-800' : ''}`}>
                    <div>
                      <span className="text-white text-sm font-medium">{s.name}</span>
                      {s.icon && <span className="text-xs text-gray-500 ml-2">{s.icon}</span>}
                      <span className="text-xs text-gray-600 ml-2">#{s.order}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => openEdit(s)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded">Edit</button>
                      <button onClick={() => handleDelete(s._id)} className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1 rounded">Delete</button>
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
