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
      <h1 className="text-2xl font-bold text-white mb-6">Resume</h1>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {/* Current Resume */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-white mb-3">Current Resume</h2>
        {resumeUrl ? (
          <div className="flex items-center gap-4 flex-wrap">
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
              📄 View / Download Resume
            </a>
            <button onClick={handleDelete} disabled={deleting}
              className="bg-red-600/20 hover:bg-red-600/40 text-red-400 px-4 py-2 rounded text-sm disabled:opacity-50">
              {deleting ? 'Deleting...' : '🗑 Delete Resume'}
            </button>
            <p className="text-xs text-gray-500 break-all">{resumeUrl}</p>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">No resume uploaded yet.</p>
        )}
      </div>

      {/* Upload New */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h2 className="font-semibold text-white mb-3">{resumeUrl ? 'Replace Resume' : 'Upload Resume'}</h2>
        <p className="text-sm text-gray-400 mb-4">Upload a PDF file. The old resume will be deleted from Cloudinary automatically.</p>
        <form onSubmit={handleUpload} className="flex items-center gap-4 flex-wrap">
          <input type="file" accept=".pdf" onChange={e => setFile(e.target.files[0])} className="text-sm text-gray-300" required />
          <button type="submit" disabled={uploading || !file}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-5 py-2 rounded text-sm">
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminResume;
