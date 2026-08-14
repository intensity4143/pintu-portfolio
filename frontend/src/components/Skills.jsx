import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  SiC, SiCplusplus, SiJavascript, SiPython, SiReact, SiTailwindcss,
  SiHtml5, SiCss3, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
} from 'react-icons/si';
import { FaDatabase, FaServer, FaCode } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import api from '../api/axios';

const ICON_MAP = {
  SiC, SiCplusplus, SiJavascript, SiPython, SiReact, SiTailwindcss,
  SiHtml5, SiCss3, SiNodedotjs, SiExpress, SiMongodb, SiMysql,
  FaDatabase, FaServer, FaCode, TbApi,
};

const CATEGORY_ORDER = ['Languages', 'Frontend', 'Backend', 'Databases', 'Core CS', 'DevOps', 'Tools', 'Other'];

const CATEGORY_ICONS = {
  Languages: FaCode, Frontend: FaCode, Backend: FaServer,
  Databases: FaDatabase, 'Core CS': FaCode, DevOps: FaServer, Tools: FaCode, Other: FaCode,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/api/skills').then(r => setSkills(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  // Group by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const catSkills = skills.filter(s => s.category === cat);
    if (catSkills.length > 0) acc.push({ title: cat, skills: catSkills });
    return acc;
  }, []);

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

          {loading ? (
            <div className="text-center text-gray-400 py-12">Loading skills...</div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {grouped.map((category) => {
                const CatIcon = CATEGORY_ICONS[category.title] || FaCode;
                return (
                  <motion.div
                    key={category.title}
                    variants={itemVariants}
                    className="bg-dark-secondary border border-gray-800 rounded-xl p-6 card-hover"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <CatIcon className="text-3xl text-primary" />
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                    </div>

                    <div className="space-y-3">
                      {category.skills.map((skill) => {
                        const SkillIcon = skill.icon ? ICON_MAP[skill.icon] : null;
                        return (
                          <div key={skill._id} className="flex items-center gap-3 bg-dark p-3 rounded-lg hover:bg-dark/70 transition-colors">
                            {SkillIcon ? (
                              <SkillIcon className="text-2xl text-primary" />
                            ) : (
                              <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                                <FaCode className="text-primary text-sm" />
                              </div>
                            )}
                            <span className="text-gray-300 font-medium">{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
