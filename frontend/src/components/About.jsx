import { useEffect, useState } from 'react';
import api from '../api/axios';

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(() => {});
  }, []);

  const paragraphs = profile?.about?.paragraphs || [
    "I'm a Full Stack Developer with a strong foundation in Data Structures & Algorithms. Solving 1,200+ problems has strengthened my problem-solving approach and helped me think systematically about performance, scalability, and clean logic.",
    "I apply this algorithmic mindset to building real-world MERN stack applications — designing RESTful APIs, implementing JWT-based authentication, integrating payment gateways, and structuring backend logic with clean, modular architecture.",
    "I'm particularly interested in backend scalability and system design. I focus on writing maintainable code, designing efficient database schemas, and building applications that can evolve with product requirements.",
  ];

  const stats = profile?.about?.stats || [];

  return (
    <section id="about" className="border-t border-border">
      <div className="section-wrap">
        <p className="section-label">About</p>

        <div className="grid md:grid-cols-3 gap-12 md:gap-16">
          <div className="md:col-span-2 space-y-5">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-text-secondary leading-relaxed text-[0.9375rem]">{p}</p>
            ))}
          </div>

          {stats.length > 0 && (
            <div className="space-y-6">
              {stats.map((stat, i) => (
                <div key={i} className="border-l-2 border-accent pl-4">
                  <p className="text-xl font-semibold text-text-primary">{stat.value}</p>
                  <p className="text-xs text-text-secondary mt-0.5 font-mono">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;
