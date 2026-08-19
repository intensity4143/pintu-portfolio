import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import api from '../api/axios';

const Footer = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(() => {});
  }, []);

  const name = profile?.name || 'Pintu Kumar';
  const email = profile?.email || 'ipintu4143@gmail.com';
  const socialLinks = profile?.socialLinks || {};

  const links = [
    socialLinks.github && { Icon: FiGithub, href: socialLinks.github, label: 'GitHub' },
    socialLinks.linkedin && { Icon: FiLinkedin, href: socialLinks.linkedin, label: 'LinkedIn' },
    socialLinks.leetcode && { Icon: SiLeetcode, href: socialLinks.leetcode, label: 'LeetCode' },
    { Icon: FiMail, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, label: 'Email' },
  ].filter(Boolean);

  return (
    <footer className="border-t border-border">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-text-primary">{name}</p>
          <p className="text-xs text-text-muted mt-0.5">Full Stack Developer · Backend-Focused</p>
        </div>

        <div className="flex items-center gap-5">
          {links.map(({ Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              aria-label={label} className="text-text-muted hover:text-text-primary transition-colors">
              <Icon size={16} />
            </a>
          ))}
        </div>

        <p className="text-xs text-text-muted">© {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  );
};

export default Footer;
