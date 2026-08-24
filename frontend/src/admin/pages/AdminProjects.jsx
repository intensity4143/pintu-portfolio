import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { broadcastSync } from '../../hooks/useSync';

const emptyForm = {
  title: '', description: '', fullDescription: '',
  highlights: '', techStack: '', github: '', demo: '',
  featured: false, order: 0,
};

const Field = ({ label, value, onChange, required, textarea, rows = 3, type = 'text' }) => (
  <div>
    <label className="admin-label">{label}</label>
    {textarea
      ? <textarea value={value} onChange={e => onChange(e.target.value)} required={required} rows={rows} className="admin-textarea" />
      : <input type={type} value={value} onChange={e => onChange(e.target.value)} required={required} className="admin-input" />
    }
  </div>
);

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

  const load = () => { setLoading(true); api.get('/api/projects').then(r => setProjects(r.data)).finally(() => setLoading(false)); };
  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setImageFile(null); setImagePreview(''); setError(''); setSuccess(''); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ title: p.title, description: p.description, fullDescription: p.fullDescription || '', highlights: (p.highlights || []).join('\n'), techStack: (p.techStack || []).join(', '), github: p.github || '', demo: p.demo || '', featured: p.featured || false, order: p.order || 0 });
    setEditId(p._id); setImageFile(null); setImagePreview(p.image || ''); setError(''); setSuccess(''); setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    try { await api.delete(`/api/projects/${id}`); broadcastSync('projects'); setSuccess('Project deleted'); load(); }
    catch (err) { setError(err.response?.data?.message || 'Delete failed'); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setSaving(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('title', form.title); fd.append('description', form.description); fd.append('fullDescription', form.fullDescription);
      fd.append('highlights', JSON.stringify(form.highlights.split('\n').filter(Boolean)));
      fd.append('techStack', JSON.stringify(form.techStack.split(',').map(s => s.trim()).filter(Boolean)));
      fd.append('github', form.github); fd.append('demo', form.demo); fd.append('featured', form.featured); fd.append('order', form.order);
      if (imageFile) fd.append('image', imageFile);
      if (editId) { await api.put(`/api/projects/${editId}`, fd); setSuccess('Project updated'); }
      else { await api.post('/api/projects', fd); setSuccess('Project created'); }
      broadcastSync('projects'); setShowForm(false); load();
    } catch (err) { setError(err.response?.data?.message || 'Save failed'); }
    finally { setSaving(false); }
  };

  return (
    <div>
      <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Portfolio</p>
      <div className="flex items-center justify-between mb-10">
        <h1 className="admin-page-title mb-0">Projects</h1>
        <button onClick={openAdd} className="admin-btn-primary">+ Add Project</button>
      </div>

      {error && <div className="border border-red-500/30 bg-red-500/5 text-red-400 px-4 py-3 text-sm mb-6">{error}</div>}
      {success && <div className="border border-accent/30 bg-accent/5 text-accent px-4 py-3 text-sm mb-6">{success}</div>}

      {showForm && (
        <div className="admin-card">
          <h2 className="admin-section-title">{editId ? 'Edit Project' : 'New Project'}</h2>
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
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(p => ({ ...p, featured: e.target.checked }))} className="w-4 h-4 accent-accent" />
              <label htmlFor="featured" className="text-sm text-text-secondary">Featured project</label>
            </div>
            <div>
              <label className="admin-label">Project Image</label>
              <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; setImageFile(f); if (f) setImagePreview(URL.createObjectURL(f)); }}
                className="text-sm text-text-secondary file:mr-3 file:bg-surface-2 file:border file:border-border file:text-text-secondary file:px-3 file:py-1.5 file:text-xs file:cursor-pointer" />
              {imagePreview && <img src={imagePreview} alt="preview" className="mt-3 h-32 object-cover border border-border" />}
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={saving} className="admin-btn-primary disabled:opacity-50">{saving ? 'Saving...' : editId ? 'Update' : 'Create'}</button>
              <button type="button" onClick={() => setShowForm(false)} className="admin-btn-ghost">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {loading ? <p className="text-text-muted text-sm">Loading...</p> : projects.length === 0 ? <p className="text-text-muted text-sm">No projects yet.</p> : (
        <div className="space-y-3">
          {projects.map(p => (
            <div key={p._id} className="border border-border p-4 flex items-start gap-4 hover:border-text-muted transition-colors">
              {p.image && <img src={p.image} alt={p.title} className="w-14 h-14 object-cover border border-border shrink-0" />}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-text-primary text-sm">{p.title}</h3>
                  {p.featured && <span className="font-mono text-xs text-accent">featured</span>}
                  <span className="font-mono text-xs text-text-muted">#{p.order}</span>
                </div>
                <p className="text-sm text-text-secondary mt-1 truncate">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(p.techStack || []).slice(0, 5).map(t => <span key={t} className="font-mono text-xs text-text-muted border border-border px-1.5 py-0.5">{t}</span>)}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => openEdit(p)} className="admin-btn-ghost text-xs">Edit</button>
                <button onClick={() => handleDelete(p._id)} className="admin-btn-danger text-xs">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
