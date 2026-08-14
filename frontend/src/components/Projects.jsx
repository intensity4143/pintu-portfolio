import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import api from '../api/axios';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/projects')
      .then(r => setProjects(r.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="bg-dark-secondary/50 py-20">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">Featured Projects</h2>

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center text-gray-400 py-12">No projects yet.</div>
          ) : (
            <div className="space-y-16">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="bg-dark border border-gray-800 rounded-2xl p-8 hover:border-primary/40 transition"
                >
                  {project.image && (
                    <img src={project.image} alt={project.title} className="w-full h-48 object-cover rounded-xl mb-6" />
                  )}

                  <h3 className="text-2xl font-bold mb-3 text-white">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                  {project.highlights?.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {project.highlights.map((point, i) => (
                        <li key={i} className="text-gray-300 flex items-start gap-2">
                          <span className="text-primary mt-1.5">▹</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {project.techStack?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/30">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-4">
                    {project.github && project.github !== '#' && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer"
                        className="btn-outline w-full sm:w-auto flex items-center justify-center gap-2">
                        <FiGithub /> View Code
                      </a>
                    )}
                    {project.demo && project.demo !== '#' && (
                      <a href={project.demo} target="_blank" rel="noopener noreferrer"
                        className="btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                        <FiExternalLink /> Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
