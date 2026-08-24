import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { broadcastSync } from '../../hooks/useSync';

const AdminProfile = () => {
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState({});
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingImg, setUploadingImg] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    api.get('/api/profile').then(r => {
      setProfile(r.data);
      const p = r.data;
      setForm({
        name: p.name || '',
        title: p.title || '',
        intro: p.intro || '',
        email: p.email || '',
        phone: p.phone || '',
        location: p.location || '',
        siteTitle: p.siteTitle || '',
        siteDescription: p.siteDescription || '',
        aboutParagraphs: (p.about?.paragraphs || []).join('\n\n'),
        aboutStats: JSON.stringify(p.about?.stats || [], null, 2),
        currentFocus: (p.about?.currentFocus || []).join('\n'),
        heroStats: JSON.stringify(p.heroStats || [], null, 2),
        github: p.socialLinks?.github || '',
        linkedin: p.socialLinks?.linkedin || '',
        leetcode: p.socialLinks?.leetcode || '',
        geeksforgeeks: p.socialLinks?.geeksforgeeks || '',
        codeforces: p.socialLinks?.codeforces || '',
        codechef: p.socialLinks?.codechef || '',
      });
      setImagePreview(p.profileImage || '');
    }).catch(console.error);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true); setError(''); setSuccess('');
    try {
      let aboutStatsArr = [];
      let heroStatsArr = [];
      try { aboutStatsArr = JSON.parse(form.aboutStats); } catch { setError('About Stats JSON is invalid'); setSaving(false); return; }
      try { heroStatsArr = JSON.parse(form.heroStats); } catch { setError('Hero Stats JSON is invalid'); setSaving(false); return; }

      const payload = {
        name: form.name, title: form.title, intro: form.intro,
        email: form.email, phone: form.phone, location: form.location,
        siteTitle: form.siteTitle, siteDescription: form.siteDescription,
        about: {
          paragraphs: form.aboutParagraphs.split('\n\n').map(s => s.trim()).filter(Boolean),
          stats: aboutStatsArr,
          currentFocus: form.currentFocus.split('\n').map(s => s.trim()).filter(Boolean),
        },
        heroStats: heroStatsArr,
        socialLinks: {
          github: form.github, linkedin: form.linkedin, leetcode: form.leetcode,
          geeksforgeeks: form.geeksforgeeks, codeforces: form.codeforces, codechef: form.codechef,
        },
      };
      const r = await api.put('/api/profile', payload);
      setProfile(r.data);
      setSuccess('Profile saved');
      broadcastSync('profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploadingImg(true); setError(''); setSuccess('');
    try {
      const fd = new FormData();
      fd.append('image', imageFile);
      const r = await api.post('/api/profile/image', fd);
      setImagePreview(r.data.profileImage);
      setSuccess('Profile image updated');
      broadcastSync('profile');
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Image upload failed');
    } finally {
      setUploadingImg(false);
    }
  };

  const F = ({ k, label, textarea, rows = 3, placeholder }) => (
    <div>
      <label className="block text-sm text-gray-400 mb-1">{label}</label>
      {textarea ? (
        <textarea value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} rows={rows} placeholder={placeholder}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500 resize-y font-mono" />
      ) : (
        <input value={form[k] || ''} onChange={e => setForm(p => ({ ...p, [k]: e.target.value }))} placeholder={placeholder}
          className="w-full bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500" />
      )}
    </div>
  );

  if (!profile) return <p className="text-gray-400">Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Profile & About</h1>

      {error && <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
      {success && <div className="bg-green-500/10 border border-green-500 text-green-400 p-3 rounded mb-4 text-sm">{success}</div>}

      {/* Profile Image */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="font-semibold text-white mb-4">Profile Image</h2>
        <div className="flex items-start gap-6 flex-wrap">
          {imagePreview && <img src={imagePreview} alt="profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-700" />}
          <div className="flex-1">
            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; setImageFile(f); if(f) setImagePreview(URL.createObjectURL(f)); }} className="text-sm text-gray-300 mb-3 block" />
            <button onClick={handleImageUpload} disabled={uploadingImg || !imageFile}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded text-sm">
              {uploadingImg ? 'Uploading...' : 'Upload Image'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Info */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <F k="name" label="Name *" />
              <F k="title" label="Professional Title *" />
            </div>
            <F k="intro" label="Hero Introduction" textarea rows={4} />

            {/* Hero Stats */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">Hero Stats</label>
              <div className="space-y-2 mb-2">
                {(JSON.parse(form.heroStats || '[]')).map((stat, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <input
                      value={stat.value}
                      onChange={e => {
                        const arr = JSON.parse(form.heroStats);
                        arr[i].value = e.target.value;
                        setForm(p => ({ ...p, heroStats: JSON.stringify(arr) }));
                      }}
                      placeholder="Value (e.g. 1200+)"
                      className="w-32 bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                    <input
                      value={stat.label}
                      onChange={e => {
                        const arr = JSON.parse(form.heroStats);
                        arr[i].label = e.target.value;
                        setForm(p => ({ ...p, heroStats: JSON.stringify(arr) }));
                      }}
                      placeholder="Label (e.g. DSA Problems Solved)"
                      className="flex-1 bg-gray-800 border border-gray-700 text-white px-3 py-2 rounded text-sm focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const arr = JSON.parse(form.heroStats);
                        arr.splice(i, 1);
                        setForm(p => ({ ...p, heroStats: JSON.stringify(arr) }));
                      }}
                      className="text-red-400 hover:text-red-300 px-2 text-lg leading-none"
                    >×</button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => {
                  const arr = JSON.parse(form.heroStats || '[]');
                  arr.push({ value: '', label: '' });
                  setForm(p => ({ ...p, heroStats: JSON.stringify(arr) }));
                }}
                className="text-sm text-blue-400 hover:text-blue-300"
              >+ Add Stat</button>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">About Me</h2>
          <div className="space-y-4">
            <F k="aboutParagraphs" label="About Paragraphs (separate with blank line)" textarea rows={10} placeholder="Paragraph 1&#10;&#10;Paragraph 2&#10;&#10;Paragraph 3" />
            <F k="currentFocus" label="Current Focus (one item per line)" textarea rows={6} placeholder="Backend Engineering&#10;API Design & Security&#10;Database Design" />
          </div>
        </div>

        {/* Contact */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">Contact Info</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <F k="email" label="Email" />
            <F k="phone" label="Phone" />
            <F k="location" label="Location" />
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">Social Links</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <F k="github" label="GitHub URL" />
            <F k="linkedin" label="LinkedIn URL" />
            <F k="leetcode" label="LeetCode URL" />
            <F k="geeksforgeeks" label="GeeksforGeeks URL" />
            <F k="codeforces" label="Codeforces URL" />
            <F k="codechef" label="CodeChef URL" />
          </div>
        </div>

        {/* Site Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
          <h2 className="font-semibold text-white mb-4">Site Settings</h2>
          <div className="space-y-4">
            <F k="siteTitle" label="Site Title" />
            <F k="siteDescription" label="Site Description" textarea rows={2} />
          </div>
        </div>

        <button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-2.5 rounded font-medium">
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
