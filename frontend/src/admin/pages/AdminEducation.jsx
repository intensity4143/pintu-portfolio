import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = { institution: '', degree: '', fieldOfStudy: '', startYear: '', endYear: '', grade: '', description: '', order: 0 };

const AdminEducation = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = () => { setLoading(true); api.get('/api/education').then(r => setItems(r.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setError(''); setSuccess(''); setShowForm(true); };
  const openEdit = (item) => { setForm({ institution: item.institution, degree: item.degree, fieldOfStudy: item.fieldOfStudy || '', startYear: item.startYear || '', endYear: item.endYear || '', grade: item.grade || '', description: item.description || '', order: item.order || 0 }); setEditId(item._id); setError(''); setSuccess(''); setShowForm(true); };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await api.delete(`/api/education/${id}`); setSuccess('Deleted'); load(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setSuccess('');
    try {
      if (editId) { await api.put(`/api/education/${editId}`, form); setSuccess('Updated'); }
      else { await api.post('/api/education', form); setSuccess('Created'); }
      setShowForm(false); load();
    } catch (err) { setError(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  const F = ({ k, label, required }) => (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}{required ? ' *' : ''}</label>
      <input value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} required={required}
        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Education</h1>
        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">+ Add Education</button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">{editId ? 'Edit Education' : 'New Education'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <F k="institution" label="Institution" required />
              <F k="degree" label="Degree" required />
              <F k="fieldOfStudy" label="Field of Study" />
              <F k="grade" label="Grade / CGPA" />
              <F k="startYear" label="Start Year" />
              <F k="endYear" label="End Year (or Expected)" />
              <F k="order" label="Order" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3}
                className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 resize-y" />
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

      {loading ? <p className="text-gray-400">Loading...</p> : items.length === 0 ? <p className="text-gray-400">No education entries yet.</p> : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-white">{item.degree}{item.fieldOfStudy ? ` in ${item.fieldOfStudy}` : ''}</h3>
                <p className="text-sm text-gray-400">{item.institution}</p>
                <p className="text-sm text-gray-500">{item.startYear}{item.endYear ? ` – ${item.endYear}` : ''}{item.grade ? ` · ${item.grade}` : ''}</p>
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

export default AdminEducation;
