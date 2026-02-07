import { motion } from "framer-motion";

const About = () => {
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
              <p>
                I’m a Full Stack Developer with a strong foundation in
                <span className="text-primary font-semibold">
                  {" "}
                  Data Structures & Algorithms
                </span>
                . Solving 900+ problems has strengthened my problem-solving
                approach and helped me think systematically about performance,
                scalability, and clean logic.
              </p>

              <p>
                I apply this algorithmic mindset to building real-world
                <span className="text-primary font-semibold">
                  {" "}
                  MERN stack applications
                </span>
                . I’ve designed RESTful APIs, implemented JWT-based
                authentication systems, integrated payment gateways, and
                structured backend logic using clean, modular architecture.
              </p>

              <p>
                I’m particularly interested in
                <span className="text-primary font-semibold">
                  {" "}
                  backend scalability and system design
                </span>
                . I focus on writing maintainable code, designing efficient
                database schemas, and building applications that can evolve with
                product requirements.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-gray-800">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="bg-dark-secondary p-6 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">
                    900+
                  </div>
                  <div className="text-gray-400">DSA Problems Solved</div>
                </div>
                <div className="bg-dark-secondary p-6 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">
                    MERN
                  </div>
                  <div className="text-gray-400">Full Stack Development</div>
                </div>
                <div className="bg-dark-secondary p-6 rounded-xl">
                  <div className="text-4xl font-bold text-primary mb-2">
                    2027
                  </div>
                  <div className="text-gray-400">Expected Graduation</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
