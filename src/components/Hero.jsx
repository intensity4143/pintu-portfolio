import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef } from 'react-icons/si';
import profileImg from "../assets/profile.jpg";


const Hero = () => {
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/assets/Pintu_Kumar_Resume.pdf';
    link.download = 'Pintu_Kumar_Resume.pdf';
    link.click();
  };

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com/intensity4143', name: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com/in/intensity4143', name: 'LinkedIn' },
    { icon: SiLeetcode, url: 'https://leetcode.com/pintu_sharma', name: 'LeetCode' },
    { icon: SiGeeksforgeeks, url: 'https://auth.geeksforgeeks.org/user/intensity4143', name: 'GeeksforGeeks' },
    { icon: SiCodeforces, url: 'https://codeforces.com/profile/ipintu4143', name: 'Codeforces' },
    { icon: SiCodechef, url: 'https://www.codechef.com/users/intens', name: 'CodeChef' },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              Pintu Kumar
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-primary font-semibold mb-6"
            >
              Full Stack Developer | MERN Stack | Strong in Data Structures & Algorithms
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-gray-300 text-lg leading-relaxed mb-8"
            >
              Computer Science undergraduate focused on building scalable full-stack applications 
              with secure authentication, RESTful APIs, and clean architecture principles. 
              Solved 900+ Data Structures & Algorithms problems across multiple platforms, 
              strengthening problem-solving depth and system-level thinking.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a href="#projects" className="btn-primary flex items-center gap-2">
                View Projects
                <FiArrowRight />
              </a>
              <button onClick={handleDownloadResume} className="btn-outline flex items-center gap-2">
                <FiDownload />
                Download Resume
              </button>
            </motion.div>

            {/* Platform Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <p className="text-gray-400 text-sm mb-3 font-medium">CONNECT WITH ME</p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-dark-secondary p-3 rounded-lg hover:bg-primary transition-all duration-300"
                    title={social.name}
                  >
                    <social.icon className="text-2xl" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center"
          >
            <div className="relative float-animation">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
              <img
                src={profileImg}
                alt="Pintu Kumar"
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full object-cover shadow-2xl border-4 border-primary/30"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;