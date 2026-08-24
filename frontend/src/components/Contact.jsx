import { useState, useEffect } from 'react';
import { FiMail, FiGithub, FiLinkedin, FiArrowUpRight } from 'react-icons/fi';
import { SiLeetcode, SiCodeforces } from 'react-icons/si';
import api from '../api/axios';
import useFadeUp from '../hooks/useFadeUp';

const LINKS_MAP = [
  { key: 'email',     Icon: FiMail,     label: 'Email' },
  { key: 'github',    Icon: FiGithub,   label: 'GitHub' },
  { key: 'linkedin',  Icon: FiLinkedin, label: 'LinkedIn' },
  { key: 'leetcode',  Icon: SiLeetcode, label: 'LeetCode' },
  { key: 'codeforces',Icon: SiCodeforces,label: 'Codeforces' },
];

const Contact = () => {
  const [profile,   setProfile]   = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [form,      setForm]      = useState({ name: '', email: '', message: '' });
  const [errors,    setErrors]    = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [sendError, setSendError] = useState('');

  const refHead  = useFadeUp(0);
  const refLeft  = useFadeUp(80);
  const refRight = useFadeUp(160);

  useEffect(() => {
    api.get('/api/profile')
      .then(r => setProfile(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const email       = profile?.email       || 'ipintu4143@gmail.com';
  const socialLinks = profile?.socialLinks || {};

  const contactLinks = LINKS_MAP.map(item => {
    if (item.key === 'email') return { ...item, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`, display: email };
    const url = socialLinks[item.key];
    if (!url) return null;
    return { ...item, href: url, display: url.replace(/^https?:\/\/(www\.)?/, '') };
  }).filter(Boolean);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (form.message.trim().length < 10) e.message = 'At least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name]) setErrors(p => ({ ...p, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    setSendError('');
    try {
      await api.post('/api/messages', form);
      setSubmitted(true);
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSendError('Failed to send message. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="border-t border-border">
      <div className="section-wrap">
        <div ref={refHead} className="fade-up">
          <p className="section-label">Contact</p>
          <h2 className="section-heading">Let's connect.</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">

          {/* Links */}
          <div ref={refLeft} className="fade-up">
            <p className="text-sm text-text-secondary leading-relaxed mb-8" style={{ lineHeight: '1.75' }}>
              Open to full-time roles, freelance projects, and interesting collaborations.
            </p>
            <div className="space-y-0">
              {loading ? (
                [0,1,2,3].map(i => (
                  <div key={i} className="flex items-center justify-between border-b border-border py-4">
                    <div className="flex items-center gap-3">
                      <div className="skeleton h-3.5 w-3.5 rounded-sm" />
                      <div className="skeleton h-3.5 w-20" />
                    </div>
                    <div className="skeleton h-3 w-32" />
                  </div>
                ))
              ) : (
                contactLinks.map(({ key, Icon, label, href, display }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between group border-b border-border py-4 last:border-b-0"
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={14} className="text-text-muted" />
                      <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                        {label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-text-muted font-mono hidden sm:block truncate max-w-[180px]">
                        {display}
                      </span>
                      <FiArrowUpRight size={13} className="text-text-muted group-hover:text-accent transition-colors flex-shrink-0" />
                    </div>
                  </a>
                ))
              )}
            </div>
          </div>

          {/* Form */}
          <div ref={refRight} className="fade-up">
            {submitted && (
              <div className="border border-accent/40 bg-accent/5 text-accent text-sm px-4 py-3 mb-6">
                Message received. I'll get back to you soon.
              </div>
            )}
            {sendError && (
              <div className="border border-red-500/40 bg-red-500/5 text-red-400 text-sm px-4 py-3 mb-6">
                {sendError}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Name"
                  className={`form-input ${errors.name ? 'border-red-500/60' : ''}`}
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>
              <div>
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Email"
                  className={`form-input ${errors.email ? 'border-red-500/60' : ''}`}
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>
              <div>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Message" rows={5}
                  className={`form-input resize-none ${errors.message ? 'border-red-500/60' : ''}`}
                />
                {errors.message && <p className="text-xs text-red-400 mt-1">{errors.message}</p>}
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full justify-center disabled:opacity-60">
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
