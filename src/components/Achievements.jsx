import { motion } from 'framer-motion';
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef } from 'react-icons/si';
import { FaTrophy, FaCode, FaBrain, FaChartLine } from 'react-icons/fa';

const Achievements = () => {
  const achievements = [
    {
      icon: FaTrophy,
      title: '900+ Problems Solved',
      description: 'Solved over 900 Data Structures & Algorithms problems across multiple competitive programming platforms',
      highlight: 'Strong foundation in algorithmic thinking',
    },
    {
      icon: SiLeetcode,
      title: 'LeetCode Max Rating: 1709',
      description: 'Achieved a maximum rating of 1709 on LeetCode, demonstrating consistent problem-solving skills',
      highlight: 'Top percentile performer',
    },
    {
      icon: FaBrain,
      title: 'Advanced DSA Expertise',
      description: 'Deep understanding of complex data structures and algorithms including trees, graphs, dynamic programming, and greedy algorithms',
      highlight: 'Strong theoretical and practical knowledge',
    },
    {
      icon: FaChartLine,
      title: 'Complexity Optimization',
      description: 'Focus on time and space complexity optimization, writing efficient solutions that scale',
      highlight: 'Performance-oriented approach',
    },
  ];

  const platformStats = [
    { name: 'LeetCode', icon: SiLeetcode, stats: 'Max Rating: 1709', color: 'text-orange-500' },
    { name: 'GeeksforGeeks', icon: SiGeeksforgeeks, stats: 'Regular Contributor', color: 'text-green-500' },
    { name: 'Codeforces', icon: SiCodeforces, stats: 'Active Profile', color: 'text-blue-400' },
    { name: 'CodeChef', icon: SiCodechef, stats: 'Regular Practice', color: 'text-amber-600' },
  ];

  return (
    <section id="achievements">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mb-12">Achievements & Recognition</h2>

          {/* Main Achievements Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-dark-secondary border border-gray-800 rounded-xl p-6 card-hover"
              >
                <achievement.icon className="text-5xl text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3">{achievement.title}</h3>
                <p className="text-gray-300 mb-3 leading-relaxed">{achievement.description}</p>
                <p className="text-primary font-semibold text-sm">{achievement.highlight}</p>
              </motion.div>
            ))}
          </div>

          {/* Platform Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="bg-dark border border-gray-800 rounded-2xl p-8"
          >
            <h3 className="text-2xl font-bold mb-8 text-center">Competitive Programming Platforms</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {platformStats.map((platform, index) => (
                <div
                  key={index}
                  className="bg-dark-secondary p-6 rounded-xl text-center hover:bg-dark-secondary/70 transition-all"
                >
                  <platform.icon className={`text-5xl mx-auto mb-4 ${platform.color}`} />
                  <h4 className="text-lg font-semibold mb-2">{platform.name}</h4>
                  <p className="text-gray-400 text-sm">{platform.stats}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-12 bg-gradient-to-r from-primary/10 to-transparent border border-primary/30 rounded-2xl p-8"
          >
            <div className="flex items-start gap-4">
              <FaCode className="text-4xl text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-2xl font-bold mb-4">Problem-Solving Philosophy</h3>
                <p className="text-gray-300 leading-relaxed text-lg mb-4">
                  My approach to Data Structures & Algorithms goes beyond solving problems for competitive programming. 
                  I view each problem as an opportunity to strengthen system-level thinking and develop intuition for 
                  efficient algorithm design.
                </p>
                <p className="text-gray-300 leading-relaxed text-lg">
                  This foundation directly translates into my full-stack development work, enabling me to write optimized 
                  database queries, design efficient APIs, and make informed architectural decisions that consider time 
                  and space complexity at scale.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;