import { useEffect, useState } from 'react';
import api from '../../api/axios';

const emptyForm = {
  title: '', description: '', fullDescription: '',
  highlights: '', techStack: '', github: '', demo: '',
  featured: false, order: 0,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    api.get('/api/projects').then(r => setProjects(r.data)).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview('');
    setError(''); setSuccess(''); setShowForm(true);
  };

  const openEdit = (p) => {
    setForm({
      title: p.title, description: p.description, fullDescription: p.fullDescription || '',
      highlights: (p.highlights || []).join('\n'),
      techStack: (p.techStack || []).join(', '),
      github: p.github || '', demo: p.demo || '',
      featured: p.featured || false, order: p.order || 0,
    });
    setEditId(p._id); setImageFile(null); setImagePreview(p.image || '');
    setError(''); setSuccess(''); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project? This cannot be undone.')) return;
    try {
      await api.delete(`/api/projects/${id}`);
      setSuccess('Project deleted');
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('title', form.title);
      fd.append('description', form.description);
      fd.append('fullDescription', form.fullDescription);
      fd.append('highlights', JSON.stringify(form.highlights.split('\n').filter(Boolean)));
      fd.append('techStack', JSON.stringify(form.techStack.split(',').map(s => s.trim()).filter(Boolean)));
      fd.append('github', form.github);
      fd.append('demo', form.demo);
      fd.append('featured', form.featured);
      fd.append('order', form.order);
      if (imageFile) fd.append('image', imageFile);

      if (editId) {
        await api.put(`/api/projects/${editId}`, fd);
        setSuccess('Project updated');
      } else {
        await api.post('/api/projects', fd);
        setSuccess('Project created');
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button onClick={openAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
          + Add Project
        </button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
          <h2 className="font-semibold text-white mb-4">{editId ? 'Edit Project' : 'New Project'}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="Title *" value={form.title} onChange={v => setForm(p => ({ ...p, title: v }))} required />
              <Field label="Order" type="number" value={form.order} onChange={v => setForm(p => ({ ...p, order: v }))} />
            </div>
            <Field label="Short Description *" value={form.description} onChange={v => setForm(p => ({ ...p, description: v }))} required textarea rows={2} />
            <Field label="Full Description" value={form.fullDescription} onChange={v => setForm(p => ({ ...p, fullDescription: v }))} textarea rows={3} />
            <Field label="Highlights (one per line)" value={form.highlights} onChange={v => setForm(p => ({ ...p, highlights: v }))} textarea rows={4} />
            <Field label="Tech Stack (comma separated)" value={form.techStack} onChange={v => setForm(p => ({ ...p, techStack: v }))} />
            <div className="grid md:grid-cols-2 gap-4">
              <Field label="GitHub URL" value={form.github} onChange={v => setForm(p => ({ ...p, github: v }))} />
              <Field label="Demo URL" value={form.demo} onChange={v => setForm(p => ({ ...p, demo: v }))} />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4" />
              <label htmlFor="featured" className="text-sm text-gray-300">Featured project</label>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Project Image</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="text-sm text-gray-300" />
              {imagePreview && <img src={imagePreview} alt="preview" className="mt-2 h-32 rounded object-cover" />}
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded text-sm">
                {saving ? 'Saving...' : editId ? 'Update' : 'Create'}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-5 py-2 rounded text-sm">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* List */}
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-400">No projects yet.</p>
      ) : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-start gap-4">
              {p.image && <img src={p.image} alt={p.title} className="w-16 h-16 rounded object-cover shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-white">{p.title}</h3>
                  {p.featured && <span className="text-xs bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded">Featured</span>}
                  <span className="text-xs text-gray-500">Order: {p.order}</span>
                </div>
                <p className="text-sm text-gray-400 mt-1 truncate">{p.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {(p.techStack || []).slice(0, 5).map(t => (
                    <span key={t} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(p)} className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="text-xs bg-red-600/20 hover:bg-red-600/40 text-red-400 px-3 py-1.5 rounded">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Field = ({ label, value, onChange, required, textarea, rows = 3, type = 'text' }) => (
  <div>
    <label className="block text-sm text-gray-400 mb-1">{label}</label>
    {textarea ? (
      <textarea
        value={value} onChange={e => onChange(e.target.value)} required={required} rows={rows}
        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 resize-y"
      />
    ) : (
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)} required={required}
        className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500"
      />
    )}
  </div>
);

export default AdminProjects;
