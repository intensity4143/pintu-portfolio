import { useEffect, useState } from 'react';
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef } from 'react-icons/si';
import api from '../api/axios';

const PLATFORMS = [
  { key: 'leetcode', Icon: SiLeetcode, label: 'LeetCode' },
  { key: 'geeksforgeeks', Icon: SiGeeksforgeeks, label: 'GeeksforGeeks' },
  { key: 'codeforces', Icon: SiCodeforces, label: 'Codeforces' },
  { key: 'codechef', Icon: SiCodechef, label: 'CodeChef' },
];

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/api/achievements'), api.get('/api/profile')])
      .then(([a, p]) => { setAchievements(a.data); setProfile(p.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const socialLinks = profile?.socialLinks || {};
  const activePlatforms = PLATFORMS.filter(p => socialLinks[p.key]);

  return (
    <section id="achievements" className="border-t border-border">
      <div className="section-wrap">
        <p className="section-label">Achievements</p>
        <h2 className="section-heading">Recognition & Competitive Programming</h2>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : (
          <>
            {achievements.length > 0 && (
              <div className="space-y-0 mb-12">
                {achievements.map((item) => (
                  <div key={item._id} className="border-t border-border py-6 first:border-t-0 first:pt-0">
                    <div className="grid md:grid-cols-4 gap-4 md:gap-8">
                      <div className="md:col-span-1">
                        {item.highlight && (
                          <p className="font-mono text-xs text-accent">{item.highlight}</p>
                        )}
                      </div>
                      <div className="md:col-span-3">
                        <h3 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h3>
                        {item.description && (
                          <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activePlatforms.length > 0 && (
              <div className="border-t border-border pt-8">
                <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">Competitive Programming</p>
                <div className="flex flex-wrap gap-6">
                  {activePlatforms.map(({ key, Icon, label }) => (
                    <a
                      key={key}
                      href={socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors group"
                    >
                      <Icon size={15} className="text-text-muted group-hover:text-accent transition-colors" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Achievements;
