import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';

const About = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(console.error);
  }, []);

  const paragraphs = profile?.about?.paragraphs || [
    "I'm a Full Stack Developer with a strong foundation in Data Structures & Algorithms. Solving 900+ problems has strengthened my problem-solving approach and helped me think systematically about performance, scalability, and clean logic.",
    "I apply this algorithmic mindset to building real-world MERN stack applications. I've designed RESTful APIs, implemented JWT-based authentication systems, integrated payment gateways, and structured backend logic using clean, modular architecture.",
    "I'm particularly interested in backend scalability and system design. I focus on writing maintainable code, designing efficient database schemas, and building applications that can evolve with product requirements.",
  ];

  const stats = profile?.about?.stats || [
    { label: 'DSA Problems Solved', value: '900+' },
    { label: 'Full Stack Development', value: 'MERN' },
    { label: 'Expected Graduation', value: '2027' },
  ];

  return (
    <section id="about" className="bg-dark-secondary/50">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mb-12">About Me</h2>

          <div className="bg-dark border border-gray-800 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {stats.length > 0 && (
              <div className="mt-10 pt-8 border-t border-gray-800">
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  {stats.map((stat, i) => (
                    <div key={i} className="bg-dark-secondary p-6 rounded-xl">
                      <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                      <div className="text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
