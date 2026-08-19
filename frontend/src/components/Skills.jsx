import { useEffect, useState } from 'react';
import api from '../api/axios';

const CATEGORY_ORDER = ['Languages', 'Frontend', 'Backend', 'Databases', 'Core CS', 'DevOps', 'Tools', 'Other'];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/skills').then(r => setSkills(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length > 0) acc.push({ title: cat, skills: catSkills });
    return acc;
  }, []);

  // Include any categories not in CATEGORY_ORDER
  const extra = skills
    .filter(s => !CATEGORY_ORDER.includes(s.category))
    .reduce((acc, s) => {
      const existing = acc.find(g => g.title === s.category);
      if (existing) existing.skills.push(s);
      else acc.push({ title: s.category, skills: [s] });
      return acc;
    }, []);

  const allGroups = [...grouped, ...extra];

  return (
    <section id="skills" className="border-t border-border">
      <div className="section-wrap">
        <p className="section-label">Skills</p>
        <h2 className="section-heading">Technical Stack</h2>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : (
          <div className="space-y-0">
            {allGroups.map((group) => (
              <div key={group.title} className="grid md:grid-cols-4 gap-4 md:gap-8 border-t border-border py-6 first:border-t-0 first:pt-0">
                <div className="md:col-span-1">
                  <p className="font-mono text-xs text-text-muted uppercase tracking-wider pt-0.5">{group.title}</p>
                </div>
                <div className="md:col-span-3">
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {group.skills.map(s => s.name).join(' · ')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
