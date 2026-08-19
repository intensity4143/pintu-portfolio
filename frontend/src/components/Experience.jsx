import { useEffect, useState } from 'react';
import api from '../api/axios';

const Experience = () => {
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/experience').then(r => setExperience(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (!loading && experience.length === 0) return null;

  return (
    <section id="experience" className="border-t border-border">
      <div className="section-wrap">
        <p className="section-label">Experience</p>
        <h2 className="section-heading">Work History</h2>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : (
          <div className="space-y-0">
            {experience.map((item, i) => (
              <article key={item._id} className="grid md:grid-cols-4 gap-4 md:gap-8 border-t border-border py-8 first:border-t-0 first:pt-0">
                {/* Date column */}
                <div className="md:col-span-1">
                  <p className="font-mono text-xs text-text-muted leading-relaxed">
                    {item.startDate} — {item.current ? 'Present' : item.endDate}
                  </p>
                </div>

                {/* Content column */}
                <div className="md:col-span-3">
                  <h3 className="text-base font-semibold text-text-primary">{item.role}</h3>
                  <p className="text-sm text-accent mb-3">{item.company}</p>

                  {item.description && (
                    <p className="text-sm text-text-secondary leading-relaxed mb-4">{item.description}</p>
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
