import { useEffect, useState } from 'react';
import api from '../api/axios';
import useFadeUp from '../hooks/useFadeUp';

const CATEGORY_ORDER = ['Languages', 'Frontend', 'Backend', 'Databases', 'Core CS', 'DevOps', 'Tools', 'Other'];

const SkillRow = ({ group, index }) => {
  const ref = useFadeUp(index * 60);
  return (
    <div ref={ref} className="fade-up grid md:grid-cols-4 gap-4 md:gap-8 border-t border-border py-6">
      <div className="md:col-span-1">
        <p className="font-mono text-xs text-text-muted uppercase tracking-wider pt-0.5">{group.title}</p>
      </div>
      <div className="md:col-span-3">
        <p className="text-sm text-text-secondary leading-relaxed">
          {group.skills.map(s => s.name).join(' · ')}
        </p>
      </div>
    </div>
  );
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const refHead = useFadeUp(0);

  useEffect(() => {
    api.get('/api/skills').then(r => setSkills(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length > 0) acc.push({ title: cat, skills: catSkills });
    return acc;
  }, []);

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
        <div ref={refHead} className="fade-up">
          <p className="section-label">Skills</p>
          <h2 className="section-heading">Technical Stack</h2>
        </div>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : (
          <div>
            {allGroups.map((group, i) => (
              <SkillRow key={group.title} group={group} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
