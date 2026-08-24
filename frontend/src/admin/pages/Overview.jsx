import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
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
      api.get('/api/messages'),
    ]).then(([p, s, e, a, edu, m]) => {
      setCounts({
        projects: p.data.length,
        skills: s.data.length,
        experience: e.data.length,
        achievements: a.data.length,
        education: edu.data.length,
        messages: m.data.length,
        unread: m.data.filter(msg => !msg.read).length,
      });
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Projects',     value: counts.projects,     to: '/admin/projects' },
    { label: 'Skills',       value: counts.skills,       to: '/admin/skills' },
    { label: 'Experience',   value: counts.experience,   to: '/admin/experience' },
    { label: 'Achievements', value: counts.achievements, to: '/admin/achievements' },
    { label: 'Education',    value: counts.education,    to: '/admin/education' },
    { label: 'Messages',     value: counts.messages,     to: '/admin/messages', badge: counts.unread },
  ];

  const quickLinks = [
    ['/admin/profile',  'Edit Profile'],
    ['/admin/projects', 'Manage Projects'],
    ['/admin/skills',   'Manage Skills'],
    ['/admin/resume',   'Update Resume'],
    ['/admin/messages', 'View Messages'],
  ];

  return (
    <div>
      <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-4">Dashboard</p>
      <h1 className="text-2xl font-semibold text-text-primary mb-10" style={{ letterSpacing: '-0.02em' }}>Overview</h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <div key={i} className="bg-surface-2 border border-border h-24" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {cards.map(c => (
            <NavLink key={c.label} to={c.to} className="bg-surface-2 border border-border p-5 hover:border-text-muted transition-colors group">
              <div className="flex items-start justify-between">
                <p className="font-mono text-xs text-text-muted uppercase tracking-wider">{c.label}</p>
                {c.badge > 0 && (
                  <span className="font-mono text-xs bg-accent text-surface px-1.5 py-0.5">{c.badge} new</span>
                )}
              </div>
              <p className="text-3xl font-semibold text-text-primary mt-3 group-hover:text-accent transition-colors" style={{ letterSpacing: '-0.02em' }}>
                {c.value ?? '—'}
              </p>
            </NavLink>
          ))}
        </div>
      )}

      <div className="border-t border-border pt-8">
        <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">Quick Links</p>
        <div className="flex flex-wrap gap-2">
          {quickLinks.map(([href, label]) => (
            <NavLink key={href} to={href} className="border border-border text-text-secondary hover:text-text-primary hover:border-text-muted px-4 py-2 text-sm transition-colors">
              {label}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
