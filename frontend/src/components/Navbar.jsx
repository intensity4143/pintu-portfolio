import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import api from '../api/axios';
import useActiveSection from '../hooks/useActiveSection';

const NAV_ITEMS = [
  { label: 'About',      href: '#about',      id: 'about' },
  { label: 'Projects',   href: '#projects',   id: 'projects' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills',     href: '#skills',     id: 'skills' },
  { label: 'Contact',    href: '#contact',    id: 'contact' },
];

const SECTION_IDS = NAV_ITEMS.map(i => i.id);

const Navbar = () => {
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/Pintu_Kumar_Resume.pdf');
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    api.get('/api/resume')
      .then(r => { if (r.data.resumeUrl) setResumeUrl(r.data.resumeUrl); })
      .catch(() => {});
  }, []);

  const close = () => setOpen(false);

  const downloadResume = async (e) => {
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
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-sm border-b border-border'
          : 'bg-surface/80 backdrop-blur-sm'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a
          href="#home"
          className="text-sm font-semibold text-text-primary tracking-tight hover:text-accent transition-colors"
        >
          Pintu Kumar
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm transition-colors duration-150 ${
                active === item.id
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            onClick={downloadResume}
            className="btn-ghost text-xs flex items-center gap-1.5 py-2 px-4 cursor-pointer"
          >
            <FiDownload size={13} /> Resume
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <FiX size={20} /> : <FiMenu size={20} />}
        </button>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-surface border-b border-border px-6 pb-6 pt-2 space-y-1">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={close}
              className={`block text-sm py-2 transition-colors ${
                active === item.id
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {item.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={resumeUrl}
              onClick={(e) => { downloadResume(e); close(); }}
              className="btn-ghost text-xs inline-flex items-center gap-1.5 py-2 px-4 cursor-pointer"
            >
              <FiDownload size={13} /> Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
