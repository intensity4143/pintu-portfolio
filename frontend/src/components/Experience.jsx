import { useEffect, useState } from 'react';
import api from '../api/axios';
import useFadeUp from '../hooks/useFadeUp';

const ExperienceItem = ({ item, index }) => {
  const ref = useFadeUp(index * 80);
  return (
    <article ref={ref} className="fade-up grid md:grid-cols-4 gap-4 md:gap-8 border-t border-border py-8">
      <div className="md:col-span-1">
        <p className="font-mono text-xs text-text-muted leading-relaxed">
          {item.startDate ? new Date(item.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
          {' — '}
          {item.current ? 'Present' : item.endDate ? new Date(item.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : ''}
        </p>
      </div>
      <div className="md:col-span-3">
        <h3 className="text-base font-semibold text-text-primary">{item.position}</h3>
        <p className="text-sm text-accent mb-3">{item.company}</p>
        {item.description && (
          <p className="text-sm text-text-secondary leading-relaxed mb-4" style={{ lineHeight: '1.75' }}>
            {item.description}
          </p>
        )}
        {item.technologies?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, j) => (
              <span key={j} className="tag">{tech}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading]       = useState(true);
  const refHead = useFadeUp(0);

  useEffect(() => {
    api.get('/api/experience').then(r => setExperience(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (!loading && experience.length === 0) return null;

  return (
    <section id="experience" className="border-t border-border">
      <div className="section-wrap">
        <div ref={refHead} className="fade-up">
          <p className="section-label">Experience</p>
          <h2 className="section-heading">Work History</h2>
        </div>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : (
          <div>
            {experience.map((item, i) => (
              <ExperienceItem key={item._id} item={item} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
