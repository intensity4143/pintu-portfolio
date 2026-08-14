import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = { title: '', description: '', highlight: '', organization: '', url: '', order: 0 };

const AdminAchievements = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = () => { setLoading(true); api.get('/api/achievements').then(r => setItems(r.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview(''); setError(''); setSuccess(''); setShowForm(true); };
  const openEdit = (item) => {
    setForm({ title: item.title, description: item.description || '', highlight: item.highlight || '', organization: item.organization || '', url: item.url || '', order: item.order || 0 });
    setEditId(item._id); setImageFile(null); setImagePreview(item.image || ''); setError(''); setSuccess(''); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete?')) return;
    try { await api.delete(`/api/achievements/${id}`); setSuccess('Deleted'); load(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);
      if (editId) { await api.put(`/api/achievements/${editId}`, fd); setSuccess('Updated'); }
      else { await api.post('/api/achievements', fd); setSuccess('Created'); }
      setShowForm(false); load();
    } catch (err) { setError(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Achievements</h1>
        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">+ Add Achievement</button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">{editId ? 'Edit Achievement' : 'New Achievement'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {[['title','Title',true],['organization','Organization'],['url','URL'],['order','Order']].map(([k,l,r]) => (
                <div key={k}>
                  <label className="block text-sm text-gray-400 mb-1">{l}{r ? ' *' : ''}</label>
                  <input value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} required={r}
                    className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
                </div>
              ))}
            </div>
            {[['description','Description',3],['highlight','Highlight / Tagline',2]].map(([k,l,rows]) => (
              <div key={k}>
                <label className="block text-sm text-gray-400 mb-1">{l}</label>
                <textarea value={form[k]} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} rows={rows}
                  className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 resize-y" />
              </div>
            ))}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Image (optional)</label>
              <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; setImageFile(f); if(f) setImagePreview(URL.createObjectURL(f)); }} className="text-sm text-gray-300" />
              {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-24 rounded object-cover" />}
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

      {loading ? <p className="text-gray-400">Loading...</p> : items.length === 0 ? <p className="text-gray-400">No achievements yet.</p> : (
        <div className="grid md:grid-cols-2 gap-3">
          {items.map(item => (
            <div key={item._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  {item.organization && <p className="text-xs text-gray-500 mt-0.5">{item.organization}</p>}
                  {item.highlight && <p className="text-xs text-blue-400 mt-1">{item.highlight}</p>}
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => openEdit(item)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded">Edit</button>
                  <button onClick={() => handleDelete(item._id)} className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-2 py-1 rounded">Del</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAchievements;
