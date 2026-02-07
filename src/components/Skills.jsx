import { motion } from 'framer-motion';
import {
  SiC,
  SiCplusplus,
  SiJavascript,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
} from 'react-icons/si';
import { FaDatabase, FaServer, FaCode } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: FaCode,
      skills: [
        { name: 'C', icon: SiC },
        { name: 'C++', icon: SiCplusplus },
        { name: 'JavaScript', icon: SiJavascript },
        { name: 'Python', icon: SiPython },
      ],
    },
    {
      title: 'Frontend Development',
      icon: FaCode,
      skills: [
        { name: 'React', icon: SiReact },
        { name: 'Tailwind CSS', icon: SiTailwindcss },
        { name: 'HTML5', icon: SiHtml5 },
        { name: 'CSS3', icon: SiCss3 },
      ],
    },
    {
      title: 'Backend Development',
      icon: FaServer,
      skills: [
        { name: 'Node.js', icon: SiNodedotjs },
        { name: 'Express.js', icon: SiExpress },
        { name: 'REST APIs', icon: TbApi },
        { name: 'JWT Auth', icon: FaServer },
      ],
    },
    {
      title: 'Database',
      icon: FaDatabase,
      skills: [
        { name: 'MongoDB', icon: SiMongodb },
        { name: 'MySQL', icon: SiMysql },
        { name: 'SQL', icon: FaDatabase },
      ],
    },
    {
      title: 'Core Computer Science',
      icon: FaCode,
      skills: [
        { name: 'Data Structures & Algorithms', icon: null },
        { name: 'Object-Oriented Programming', icon: null },
        { name: 'Database Management Systems', icon: null },
        { name: 'Operating Systems', icon: null },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="skills">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mb-12">Technical Skills</h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                variants={itemVariants}
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 card-hover"
              >
                <div className="flex items-center gap-3 mb-6">
                  <category.icon className="text-3xl text-primary" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                <div className="space-y-3">
                  {category.skills.map((skill, skillIndex) => (
                    <div
                      key={skillIndex}
                      className="flex items-center gap-3 bg-dark p-3 rounded-lg hover:bg-dark/70 transition-colors"
                    >
                      {skill.icon ? (
                        <skill.icon className="text-2xl text-primary" />
                      ) : (
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                          <FaCode className="text-primary text-sm" />
                        </div>
                      )}
                      <span className="text-gray-300 font-medium">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;