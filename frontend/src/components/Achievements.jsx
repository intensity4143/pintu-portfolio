import { useEffect, useState } from 'react';
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef } from 'react-icons/si';
import api from '../api/axios';
import useFadeUp from '../hooks/useFadeUp';

const PLATFORMS = [
  { key: 'leetcode',      Icon: SiLeetcode,      label: 'LeetCode' },
  { key: 'geeksforgeeks', Icon: SiGeeksforgeeks,  label: 'GeeksforGeeks' },
  { key: 'codeforces',    Icon: SiCodeforces,     label: 'Codeforces' },
  { key: 'codechef',      Icon: SiCodechef,       label: 'CodeChef' },
];

const AchievementRow = ({ item, index }) => {
  const ref = useFadeUp(index * 70);
  return (
    <div ref={ref} className="fade-up border-t border-border py-6">
      <div className="grid md:grid-cols-4 gap-4 md:gap-8">
        <div className="md:col-span-1">
          {item.highlight && (
            <p className="font-mono text-xs text-accent">{item.highlight}</p>
          )}
        </div>
        <div className="md:col-span-3">
          <h3 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h3>
          {item.description && (
            <p className="text-sm text-text-secondary leading-relaxed" style={{ lineHeight: '1.75' }}>
              {item.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [profile, setProfile]           = useState(null);
  const [loading, setLoading]           = useState(true);
  const refHead = useFadeUp(0);

  useEffect(() => {
    Promise.all([api.get('/api/achievements'), api.get('/api/profile')])
      .then(([a, p]) => { setAchievements(a.data); setProfile(p.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="achievements" className="border-t border-border">
      <div className="section-wrap">
        <div ref={refHead} className="fade-up">
          <p className="section-label">Achievements</p>
          <h2 className="section-heading">Recognition & Competitive Programming</h2>
        </div>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : (
          <>
            {achievements.length > 0 && (
              <div className="mb-12">
                {achievements.map((item, i) => (
                  <AchievementRow key={item._id} item={item} index={i} />
                ))}
              </div>
            )}

            {profile?.socialLinks && PLATFORMS.filter(pl => profile.socialLinks[pl.key]).length > 0 && (
              <div className="border-t border-border pt-8">
                <p className="font-mono text-xs text-text-muted uppercase tracking-wider mb-6">
                  Competitive Programming
                </p>
                <div className="flex flex-wrap gap-6">
                  {PLATFORMS.filter(pl => profile.socialLinks[pl.key]).map(({ key, Icon, label }) => (
                    <a
                      key={key}
                      href={profile.socialLinks[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 group"
                    >
                      <Icon size={15} className="text-[#aaaaaa] group-hover:text-accent transition-colors duration-150" />
                      <span className="text-sm text-[#aaaaaa] group-hover:text-white transition-colors duration-150">{label}</span>
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
