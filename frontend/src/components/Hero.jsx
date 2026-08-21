import { useEffect, useState } from 'react';
import { FiArrowRight, FiDownload, FiGithub, FiLinkedin } from 'react-icons/fi';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import profileImgFallback from '../assets/profile.jpg';
import api from '../api/axios';

const SOCIAL_MAP = [
  { key: 'github',    Icon: FiGithub,    label: 'GitHub' },
  { key: 'linkedin',  Icon: FiLinkedin,  label: 'LinkedIn' },
  { key: 'leetcode',  Icon: SiLeetcode,  label: 'LeetCode' },
  { key: 'codeforces',Icon: SiCodeforces,label: 'Codeforces' },
];

const Hero = () => {
  const [profile,   setProfile]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [resumeUrl, setResumeUrl] = useState('/Pintu_Kumar_Resume.pdf');
  const [colored,   setColored]   = useState(false);
  const [isTouch,   setIsTouch]   = useState(false);



  useEffect(() => {
    setIsTouch(window.matchMedia('(hover: none)').matches);
    Promise.all([api.get('/api/profile'), api.get('/api/resume')])
      .then(([p, r]) => {
        setProfile(p.data);
        if (r.data.resumeUrl) setResumeUrl(r.data.resumeUrl);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const name         = profile?.name         || 'Pintu Kumar';
  const title        = profile?.title        || 'Full Stack Developer · Backend-Focused · MERN Stack';
  const intro        = profile?.intro        || 'Full Stack Developer with strong backend expertise in building scalable web applications, RESTful APIs, authentication systems, and payment integrations. Solved 1,200+ DSA problems with strong foundations in DBMS, OOP, OS, Computer Networks, and System Design.';
  const profileImage = profile?.profileImage || profileImgFallback;
  const socialLinks  = profile?.socialLinks  || {};

  if (loading) return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-5xl mx-auto px-6 w-full pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-8">
          <div className="flex-1 max-w-2xl space-y-5">
            <div className="skeleton h-3 w-48" />
            <div className="skeleton h-14 w-3/4" />
            <div className="skeleton h-5 w-2/3" />
            <div className="space-y-2">
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-full" />
              <div className="skeleton h-3.5 w-4/5" />
            </div>
            <div className="flex gap-3 pt-2">
              <div className="skeleton h-10 w-32" />
              <div className="skeleton h-10 w-36" />
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="skeleton" style={{ width: '196px', aspectRatio: '3/4' }} />
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-16">
      <div className="max-w-5xl mx-auto px-6 w-full pt-10 pb-16 md:pt-12 md:pb-20">

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12 md:gap-8">

          {/* Left: text */}
          <div className="flex-1 max-w-2xl">
            <p className="font-mono text-xs text-text-muted tracking-widest uppercase mb-6">
              Based in India · Open to opportunities
            </p>

            <h1
              className="font-semibold text-text-primary mb-4"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.75rem)', lineHeight: '1.05', letterSpacing: '-0.03em' }}
            >
              {name}
            </h1>

            <p className="text-lg text-text-secondary font-light mb-6 leading-relaxed">
              {title}
            </p>

            <p className="text-sm text-text-secondary leading-relaxed mb-10 max-w-xl" style={{ lineHeight: '1.75' }}>
              {intro}
            </p>

            <div className="flex flex-wrap gap-3 mb-12">
              <a href="#projects" className="btn-primary">
                View Projects <FiArrowRight size={14} />
              </a>
              <a
                href={resumeUrl}
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const res = await fetch(resumeUrl);
                    const blob = await res.blob();
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'Pintu_Kumar_Resume.pdf';
                    a.click();
                    URL.revokeObjectURL(url);
                  } catch {
                    window.open(resumeUrl, '_blank');
                  }
                }}
                className="btn-ghost cursor-pointer"
              >
                <FiDownload size={14} /> Download Resume
              </a>
            </div>

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

          {/* Right: portrait — 3:4 ratio */}
          <div className="flex-shrink-0 flex md:justify-end">
            <div className="relative" style={{ width: '196px' }}>
              <div
                className="overflow-hidden border border-border"
                style={{ width: '196px', aspectRatio: '3/4' }}
              >
                {isTouch ? (
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover object-top transition-all duration-500"
                    style={{ filter: colored ? 'grayscale(0%)' : 'grayscale(100%)' }}
                  />
                ) : (
                  <img
                    src={profileImage}
                    alt={name}
                    className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-500"
                  />
                )}
              </div>

              {/* Mobile-only toggle button */}
              {isTouch && (
                <button
                  onClick={() => setColored(v => !v)}
                  aria-label={colored ? 'Switch to grayscale' : 'Switch to color'}
                  title={colored ? 'Switch to grayscale' : 'Switch to color'}
                  className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full border border-border bg-surface-2 flex items-center justify-center"
                  style={{ touchAction: 'manipulation' }}
                >
                  {/* Half-circle icon: left gray, right colored */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2z" fill="#555" />
                    <path d="M8 2a6 6 0 0 1 0 12V2z" fill={colored ? '#E8C547' : '#888'} />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats row */}
        {profile?.heroStats?.length > 0 && (
          <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-x-10 gap-y-6">
            {profile.heroStats.map((stat, i) => (
              <>
                {i > 0 && <div key={`div-${i}`} className="w-px bg-border self-stretch hidden sm:block" />}
                <div key={i}>
                  <p className={`text-2xl font-semibold ${i === 0 ? 'text-accent' : 'text-text-primary'}`} style={{ letterSpacing: '-0.02em' }}>{stat.value}</p>
                  <p className="text-xs text-text-muted mt-1 font-mono tracking-wide">{stat.label}</p>
                </div>
              </>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default Hero;
