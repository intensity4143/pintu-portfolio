import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiDownload, FiArrowRight } from 'react-icons/fi';
import { SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef } from 'react-icons/si';
import profileImgFallback from '../assets/profile.jpg';
import api from '../api/axios';

const ICON_MAP = { FiGithub, FiLinkedin, SiLeetcode, SiGeeksforgeeks, SiCodeforces, SiCodechef };

const SOCIAL_ICON_KEYS = [
  { key: 'github', icon: FiGithub, name: 'GitHub' },
  { key: 'linkedin', icon: FiLinkedin, name: 'LinkedIn' },
  { key: 'leetcode', icon: SiLeetcode, name: 'LeetCode' },
  { key: 'geeksforgeeks', icon: SiGeeksforgeeks, name: 'GeeksforGeeks' },
  { key: 'codeforces', icon: SiCodeforces, name: 'Codeforces' },
  { key: 'codechef', icon: SiCodechef, name: 'CodeChef' },
];

const Hero = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(console.error);
  }, []);

  const name = profile?.name || 'Pintu Kumar';
  const title = profile?.title || 'Full Stack Developer | MERN Stack | Strong in Data Structures & Algorithms';
  const intro = profile?.intro || '';
  const profileImage = profile?.profileImage || profileImgFallback;
  const resumeUrl = profile?.resumeUrl || '/Pintu_Kumar_Resume.pdf';
  const socialLinks = profile?.socialLinks || {};

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Pintu_Kumar_Resume.pdf';
    link.target = '_blank';
    link.click();
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-3 md:px-6 w-full">
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
              {name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-xl md:text-2xl text-primary font-semibold mb-6"
            >
              {title}
            </motion.h2>

            {intro && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-gray-300 text-lg leading-relaxed mb-8"
              >
                {intro}
              </motion.p>
            )}

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
                {SOCIAL_ICON_KEYS.filter(s => socialLinks[s.key]).map((social) => (
                  <motion.a
                    key={social.key}
                    href={socialLinks[social.key]}
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
                src={profileImage}
                alt={name}
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
