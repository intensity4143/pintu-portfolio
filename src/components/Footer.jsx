import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, url: 'https://github.com/intensity4143', name: 'GitHub' },
    { icon: FiLinkedin, url: 'https://linkedin.com/in/intensity4143', name: 'LinkedIn' },
    { icon: SiLeetcode, url: 'https://leetcode.com/intensity4143', name: 'LeetCode' },
    { icon: FiMail, url: 'mailto:pintu.kumar@example.com', name: 'Email' },
  ];

  return (
    <footer className="bg-dark-secondary border-t border-gray-800 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © {currentYear} Pintu Kumar. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors"
                title={social.name}
              >
                <social.icon className="text-xl" />
              </a>
            ))}
          </div>

          {/* Built With */}
          <p className="text-gray-400 text-sm">
            Built with React & Tailwind CSS
          </p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
