import { useEffect, useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import api from '../api/axios';

const ProjectItem = ({ project, index }) => {
  const isEven = index % 2 === 0;

  return (
    <article className="border-t border-border pt-10 pb-10">
      <div className={`flex flex-col ${project.image ? 'lg:flex-row' : ''} gap-8 lg:gap-12 ${!isEven && project.image ? 'lg:flex-row-reverse' : ''}`}>

        {/* Image */}
        {project.image && (
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="overflow-hidden bg-surface-2 border border-border aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h3 className="text-xl font-semibold text-text-primary leading-tight">{project.title}</h3>
            <div className="flex items-center gap-3 flex-shrink-0 mt-0.5">
              {project.github && project.github !== '#' && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  aria-label="GitHub" className="text-text-muted hover:text-text-primary transition-colors">
                  <FiGithub size={16} />
                </a>
              )}
              {project.demo && project.demo !== '#' && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer"
                  aria-label="Live demo" className="text-text-muted hover:text-text-primary transition-colors">
                  <FiExternalLink size={16} />
                </a>
              )}
            </div>
          </div>

          <p className="text-sm text-text-secondary leading-relaxed mb-5">{project.description}</p>

          {project.highlights?.length > 0 && (
            <ul className="space-y-1.5 mb-5">
              {project.highlights.map((point, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1 flex-shrink-0 text-xs">—</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/projects').then(r => setProjects(r.data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="border-t border-border">
      <div className="section-wrap">
        <p className="section-label">Projects</p>
        <h2 className="section-heading">Selected Work</h2>

        {loading ? (
          <p className="text-sm text-text-muted">Loading projects…</p>
        ) : projects.length === 0 ? (
          <p className="text-sm text-text-muted">No projects yet.</p>
        ) : (
          <div>
            {projects.map((project, index) => (
              <ProjectItem key={project._id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
