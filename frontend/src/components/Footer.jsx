import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import api from '../api/axios';

const Footer = () => {
  const [profile, setProfile] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(console.error);
  }, []);

  const name = profile?.name || 'Pintu Kumar';
  const email = profile?.email || 'ipintu4143@gmail.com';
  const socialLinks = profile?.socialLinks || {};

  const links = [
    socialLinks.github && { icon: FiGithub, url: socialLinks.github, name: 'GitHub' },
    socialLinks.linkedin && { icon: FiLinkedin, url: socialLinks.linkedin, name: 'LinkedIn' },
    socialLinks.leetcode && { icon: SiLeetcode, url: socialLinks.leetcode, name: 'LeetCode' },
    { icon: FiMail, url: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, name: 'Email' },
  ].filter(Boolean);

  return (
    <footer className="bg-dark-secondary border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-3 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© {currentYear} {name}. All rights reserved.</p>

          <div className="flex gap-4">
            {links.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors" title={social.name}>
                <social.icon className="text-xl" />
              </a>
            ))}
          </div>

          <p className="text-gray-400 text-sm">Built with React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
