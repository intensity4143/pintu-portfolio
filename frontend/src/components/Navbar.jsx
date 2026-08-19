import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiDownload } from 'react-icons/fi';
import api from '../api/axios';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [resumeUrl, setResumeUrl] = useState('/Pintu_Kumar_Resume.pdf');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    api.get('/api/resume').then(r => { if (r.data.resumeUrl) setResumeUrl(r.data.resumeUrl); }).catch(() => {});
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-surface/95 backdrop-blur-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#home" className="text-sm font-semibold text-text-primary tracking-tight hover:text-accent transition-colors">
          Pintu Kumar
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item.label} href={item.href} className="nav-link">
              {item.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            className="btn-ghost text-xs flex items-center gap-1.5 py-2 px-4"
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
        <div className="md:hidden bg-surface border-b border-border px-6 pb-6 pt-2 space-y-4">
          {NAV_ITEMS.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={close}
              className="block text-sm text-text-secondary hover:text-text-primary transition-colors py-1"
            >
              {item.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            download
            onClick={close}
            className="btn-ghost text-xs inline-flex items-center gap-1.5 py-2 px-4"
          >
            <FiDownload size={13} /> Resume
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
