import { useEffect, useState } from 'react';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import api from '../api/axios';
import useFadeUp from '../hooks/useFadeUp';
import useSync from '../hooks/useSync';

const ProjectItem = ({ project, index }) => {
  const isEven = index % 2 === 0;
  const ref = useFadeUp(index * 80);
  const num = String(index + 1).padStart(2, '0');

  return (
    <article ref={ref} className="fade-up border-t border-border py-10">
      {/* Index + title row */}
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-xs text-text-muted flex-shrink-0">{num}</span>
        <div className="flex-1 flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold text-text-primary leading-tight">{project.title}</h3>
          <div className="flex items-center gap-3 flex-shrink-0">
            {project.github && project.github !== '#' && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                aria-label="GitHub" className="text-text-muted hover:text-text-primary transition-colors">
                <FiGithub size={15} />
              </a>
            )}
            {project.demo && project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer"
                aria-label="Live demo" className="text-text-muted hover:text-text-primary transition-colors">
                <FiExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={`flex flex-col ${project.image ? 'lg:flex-row' : 'lg:flex-row'} gap-8 lg:gap-12 pl-8 ${!isEven && project.image ? 'lg:flex-row-reverse' : ''}`}>

        {/* Image */}
        {project.image ? (
          <div className="lg:w-2/5 flex-shrink-0">
            <div className="overflow-hidden bg-surface-2 border border-border aspect-video">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        ) : (
          /* No-image fallback: accent left border gives visual structure */
          <div className="hidden lg:block lg:w-2/5 flex-shrink-0 border-l-2 border-accent/30 pl-6">
            {project.techStack?.length > 0 && (
              <div className="space-y-2">
                {project.techStack.map((tech, i) => (
                  <p key={i} className="font-mono text-xs text-text-muted">{tech}</p>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-text-secondary leading-relaxed mb-5" style={{ lineHeight: '1.75' }}>
            {project.description}
          </p>

          {project.highlights?.length > 0 && (
            <ul className="space-y-1.5 mb-5">
              {project.highlights.map((point, i) => (
                <li key={i} className="text-sm text-text-secondary flex items-start gap-2">
                  <span className="text-accent mt-1.5 flex-shrink-0 leading-none">—</span>
                  <span style={{ lineHeight: '1.6' }}>{point}</span>
                </li>
              ))}
            </ul>
          )}

          {project.techStack?.length > 0 && (
            <div className="flex flex-wrap gap-2 lg:hidden">
              {project.techStack.map((tech, i) => (
                <span key={i} className="tag">{tech}</span>
              ))}
            </div>
          )}

          {project.image && project.techStack?.length > 0 && (
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
  const [loading, setLoading]   = useState(true);
  const refHead = useFadeUp(0);

  const load = () => api.get('/api/projects').then(r => setProjects(r.data)).catch(() => {}).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
  useSync('projects', load);

  return (
    <section id="projects" className="border-t border-border">
      <div className="section-wrap">
        <div ref={refHead} className="fade-up">
          <p className="section-label">Projects</p>
          <h2 className="section-heading">Selected Work</h2>
        </div>

        {loading ? (
          <div className="space-y-0">
            {[0,1,2].map(i => (
              <div key={i} className="border-t border-border py-10 space-y-4">
                <div className="flex items-baseline gap-4">
                  <div className="skeleton h-3 w-6" />
                  <div className="skeleton h-5 w-48" />
                </div>
                <div className="pl-8 space-y-2">
                  <div className="skeleton h-3.5 w-full" />
                  <div className="skeleton h-3.5 w-5/6" />
                  <div className="skeleton h-3.5 w-4/5" />
                </div>
              </div>
            ))}
          </div>
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
