import { useEffect, useState } from 'react';
import api from '../../api/axios';

const Overview = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/api/projects'),
      api.get('/api/skills'),
      api.get('/api/experience'),
      api.get('/api/achievements'),
      api.get('/api/education'),
    ]).then(([p, s, e, a, edu]) => {
      setCounts({
        projects: p.data.length,
        skills: s.data.length,
        experience: e.data.length,
        achievements: a.data.length,
        education: edu.data.length,
      });
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Projects', value: counts.projects, emoji: '🗂' },
    { label: 'Skills', value: counts.skills, emoji: '⚡' },
    { label: 'Experience', value: counts.experience, emoji: '💼' },
    { label: 'Achievements', value: counts.achievements, emoji: '🏆' },
    { label: 'Education', value: counts.education, emoji: '🎓' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Overview</h1>
      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {cards.map(c => (
            <div key={c.label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 text-center">
              <div className="text-3xl mb-2">{c.emoji}</div>
              <div className="text-2xl font-bold text-blue-400">{c.value ?? '—'}</div>
              <div className="text-sm text-gray-400 mt-1">{c.label}</div>
            </div>
          ))}
        </div>
      )}
      <div className="mt-8 bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-white mb-3">Quick Links</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {[
            ['/admin/profile', '👤 Edit Profile'],
            ['/admin/projects', '🗂 Manage Projects'],
            ['/admin/skills', '⚡ Manage Skills'],
            ['/admin/resume', '📄 Update Resume'],
            ['/admin/settings', '⚙️ Settings'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="bg-gray-800 hover:bg-gray-700 text-gray-300 px-4 py-2 rounded transition-colors">
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
