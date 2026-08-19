import { useEffect, useState } from 'react';
import api from '../api/axios';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.get('/api/profile')
      .then(r => setProfile(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const paragraphs = profile?.about?.paragraphs || [
    "I'm a Full Stack Developer with a strong foundation in Data Structures & Algorithms. Solving 1,200+ problems has strengthened my problem-solving approach and helped me think systematically about performance, scalability, and clean logic.",
    "I apply this algorithmic mindset to building real-world MERN stack applications — designing RESTful APIs, implementing JWT-based authentication, integrating payment gateways, and structuring backend logic with clean, modular architecture.",
    "I'm particularly interested in backend scalability and system design. I focus on writing maintainable code, designing efficient database schemas, and building applications that can evolve with product requirements.",
  ];

  const currentFocus = profile?.about?.currentFocus || [];

  return (
    <section id="about" className="border-t border-border">
      <div className="section-wrap">
        <p className="section-label">About</p>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="md:col-span-2 space-y-3">
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-5/6" />
              <div className="skeleton h-3.5 w-full mt-4" />
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-4/5" />
            </div>
            <div className="space-y-3">
              <div className="skeleton h-3 w-24 mb-4" />
              {[1,2,3].map(i => <div key={i} className="skeleton h-3.5 w-full" />)}
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-12 md:gap-16">
            <div className="md:col-span-2 space-y-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-text-secondary leading-relaxed" style={{ fontSize: '0.9375rem', lineHeight: '1.8' }}>
                  {p}
                </p>
              ))}
            </div>

            {currentFocus.length > 0 && (
              <div>
                <p className="font-mono text-xs text-text-muted uppercase tracking-widest mb-4">Current Focus</p>
                <ul className="space-y-2">
                  {currentFocus.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                      <span className="text-accent mt-1.5 flex-shrink-0 leading-none">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
