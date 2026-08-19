import { useEffect, useState } from 'react';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import profileImgFallback from '../assets/profile.jpg';
import api from '../api/axios';

const SOCIAL_MAP = [
  { key: 'github', Icon: FiGithub, label: 'GitHub' },
  { key: 'linkedin', Icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'leetcode', Icon: SiLeetcode, label: 'LeetCode' },
  { key: 'codeforces', Icon: SiCodeforces, label: 'Codeforces' },
];

const Hero = () => {
  const [profile, setProfile] = useState(null);
  const [resumeUrl, setResumeUrl] = useState('/Pintu_Kumar_Resume.pdf');

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(() => {});
    api.get('/api/resume').then(r => { if (r.data.resumeUrl) setResumeUrl(r.data.resumeUrl); }).catch(() => {});
  }, []);

  const name = profile?.name || 'Pintu Kumar';
  const title = profile?.title || 'Full Stack Developer · Backend-Focused · MERN Stack';
  const intro = profile?.intro || 'Full Stack Developer with strong backend expertise in building scalable web applications, RESTful APIs, authentication systems, and payment integrations. Solved 1,200+ DSA problems with strong foundations in DBMS, OOP, OS, Computer Networks, and System Design.';
  const profileImage = profile?.profileImage || profileImgFallback;
  const socialLinks = profile?.socialLinks || {};

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-5xl mx-auto px-6 w-full py-20 md:py-28">

        {/* Main grid */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-8">

          {/* Left: text */}
          <div className="flex-1 max-w-2xl">
            <p className="font-mono text-xs text-text-secondary tracking-widest uppercase mb-6">
              Available for opportunities
            </p>

            <h1 className="text-display font-semibold text-text-primary mb-4">
              {name}
            </h1>

            <p className="text-lg text-text-secondary font-light mb-6 leading-relaxed">
              {title}
            </p>

            <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-xl">
              {intro}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#projects" className="btn-primary">
                View Projects <FiArrowRight size={14} />
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="btn-ghost"
              >
                <FiDownload size={14} /> Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-5">
              {SOCIAL_MAP.filter(s => socialLinks[s.key]).map(({ key, Icon, label }) => (
                <a
                  key={key}
                  href={socialLinks[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-text-muted hover:text-text-primary transition-colors duration-150"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Right: portrait */}
          <div className="flex-shrink-0 flex md:justify-end">
            <div className="w-40 h-40 md:w-52 md:h-52 overflow-hidden border border-border">
              <img
                src={profileImage}
                alt={name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-16 pt-8 border-t border-border grid grid-cols-3 gap-6 max-w-lg">
          <div>
            <p className="text-2xl font-semibold text-text-primary">1,200+</p>
            <p className="text-xs text-text-secondary mt-1 font-mono">DSA Problems</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-text-primary">1812</p>
            <p className="text-xs text-text-secondary mt-1 font-mono">Peak LeetCode</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-accent">Backend</p>
            <p className="text-xs text-text-secondary mt-1 font-mono">Focused</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
