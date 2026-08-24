import { useEffect, useState } from 'react';
import api from '../../api/axios';

const AdminResume = () => {
  const [resumeUrl, setResumeUrl] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const load = () => api.get('/api/resume').then(r => setResumeUrl(r.data.resumeUrl || ''));
  useEffect(() => { load(); }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('resume', file);
      const r = await api.post('/api/resume', fd);
      setResumeUrl(r.data.resumeUrl);
      setSuccess('Resume uploaded successfully');
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Delete the current resume?')) return;
    setDeleting(true); setError(''); setSuccess('');
    try {
      await api.delete('/api/resume');
      setResumeUrl('');
      setSuccess('Resume deleted');
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Documents</p>
      <h1 className="admin-page-title">Resume</h1>

      {error && <div className="border border-red-500/30 bg-red-500/5 text-red-400 px-4 py-3 text-sm mb-6">{error}</div>}
      {success && <div className="border border-accent/30 bg-accent/5 text-accent px-4 py-3 text-sm mb-6">{success}</div>}

      <div className="admin-card">
        <h2 className="admin-section-title">Current Resume</h2>
        {resumeUrl ? (
          <div className="flex items-center gap-3 flex-wrap">
            <a href={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/resume/view`} target="_blank" rel="noopener noreferrer"
              className="admin-btn-ghost text-sm">
              View Resume ↗
            </a>
            <button onClick={handleDelete} disabled={deleting} className="admin-btn-danger text-sm disabled:opacity-50">
              {deleting ? 'Deleting...' : 'Delete Resume'}
            </button>
            <p className="font-mono text-xs text-text-muted break-all">{resumeUrl}</p>
          </div>
        ) : (
          <p className="text-text-muted text-sm">No resume uploaded yet.</p>
        )}
      </div>

      <div className="admin-card">
        <h2 className="admin-section-title">{resumeUrl ? 'Replace Resume' : 'Upload Resume'}</h2>
        <p className="text-sm text-text-secondary mb-5">Upload a PDF. The old resume will be deleted from Cloudinary automatically.</p>
        <form onSubmit={handleUpload} className="flex items-center gap-4 flex-wrap">
          <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])}
            className="text-sm text-text-secondary file:mr-3 file:bg-surface-2 file:border file:border-border file:text-text-secondary file:px-3 file:py-1.5 file:text-xs file:cursor-pointer" required />
          <button type="submit" disabled={uploading || !file} className="admin-btn-primary disabled:opacity-50">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResume;
