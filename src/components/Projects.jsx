import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Platform (ongoing)",
      description:
        "Full-stack MERN e-commerce platform with secure authentication, role-based admin dashboard, and multi-gateway payment integration.",
      highlights: [
        "Implemented JWT authentication with role-based access control (RBAC)",
        "Integrated Stripe & Razorpay with secure webhook verification",
        "Designed RESTful APIs using MVC architecture",
        "Built cart, wishlist, and order management system",
        "Optimized MongoDB queries with indexing & pagination",
      ],
      techStack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Stripe",
        "Razorpay",
        "JWT",
        "Tailwind CSS",
      ],
      github: "https://github.com/intensity4143/E-Commerce-",
      demo: "#",
    },
    {
      title: "Task Management Web App",
      description:
        "Full-stack task management application with secure authentication, task filtering, and user profile management.",
      highlights: [
        "Implemented JWT-based authentication with protected routes",
        "Developed task CRUD operations with filtering, prioritization, and status tracking",
        "Integrated Cloudinary for secure image upload and profile picture management",
        "Designed standardized API responses with validation middleware",
        "Built user profile management with password and display picture update",
      ],

      techStack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Multer",
        "Tailwind CSS",
      ],
      github: "https://github.com/intensity4143/Task-Manager",
      demo: "https://task-manager-rfo2.onrender.com",
    },
    {
      title: "Weather Web App",
      description:
        "Responsive weather application integrating real-time API data and geolocation services.",
      highlights: [
        "Integrated browser Geolocation API with fallback support",
        "Connected third-party Weather API with async handling",
        "Implemented error handling & loading states",
        "Integrated Google Maps API for location search",
        "Optimized API calls with caching strategy",
      ],
      techStack: ["React", "Google Maps API", "Weather API", "Tailwind CSS"],
      github: "https://github.com/intensity4143/weather-app-built-using-HTML-CSS-and-JS",
      demo: "https://intensity4143.github.io/weather-app-built-using-HTML-CSS-and-JS/",
    },
  ];

  return (
    <section id="projects" className="bg-dark-secondary/50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center mb-16">
            Featured Projects
          </h2>

          <div className="space-y-16">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className="bg-dark border border-gray-800 rounded-2xl p-8 hover:border-primary/40 transition"
              >
                {/* Title */}
                <h3 className="text-2xl font-bold mb-3 text-white">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-gray-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-6">
                  {project.highlights.map((point, i) => (
                    <li
                      key={i}
                      className="text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-primary mt-1.5">▹</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm border border-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center gap-2"
                  >
                    <FiGithub />
                    View Code
                  </a>

                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                  >
                    <FiExternalLink />
                    Live Demo
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
