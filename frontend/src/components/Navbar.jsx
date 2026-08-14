import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMenu, FiX } from 'react-icons/fi';
import api from '../api/axios';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/Pintu_Kumar_Resume.pdf');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    api.get('/api/resume').then(r => { if (r.data.resumeUrl) setResumeUrl(r.data.resumeUrl); }).catch(() => {});
  }, []);

  const menuItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-dark/95 backdrop-blur-lg shadow-lg' : 'bg-dark md:bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-2xl font-bold text-white hover:text-primary transition-colors">
            Pintu Kumar
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-300 hover:text-primary transition-colors font-medium">
                {item.name}
              </a>
            ))}
            <a href={resumeUrl} download target="_blank" rel="noopener noreferrer" className="btn-primary flex items-center gap-2">
              <FiDownload /> Download Resume
            </a>
          </div>

          <button className="md:hidden text-white text-2xl" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden mt-4 pb-4 space-y-4">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-primary transition-colors font-medium">
                {item.name}
              </a>
            ))}
            <a href={resumeUrl} download target="_blank" rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-primary flex items-center gap-2 w-full justify-center">
              <FiDownload /> Download Resume
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navbar;
