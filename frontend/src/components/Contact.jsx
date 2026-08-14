import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiGithub, FiLinkedin, FiSend } from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import api from '../api/axios';

const Contact = () => {
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    api.get('/api/profile').then(r => setProfile(r.data)).catch(console.error);
  }, []);

  const email = profile?.email || 'ipintu4143@gmail.com';
  const socialLinks = profile?.socialLinks || {};

  const contactInfo = [
    { icon: FiMail, title: 'Email', value: email, link: `https://mail.google.com/mail/?view=cm&fs=1&to=${email}` },
    socialLinks.github && { icon: FiGithub, title: 'GitHub', value: socialLinks.github.replace('https://github.com/', ''), link: socialLinks.github },
    socialLinks.linkedin && { icon: FiLinkedin, title: 'LinkedIn', value: socialLinks.linkedin.replace('https://linkedin.com/in/', ''), link: socialLinks.linkedin },
    socialLinks.leetcode && { icon: SiLeetcode, title: 'LeetCode', value: socialLinks.leetcode.replace('https://leetcode.com/', ''), link: socialLinks.leetcode },
  ].filter(Boolean);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  return (
    <section id="contact" className="bg-dark-secondary/50">
      <div className="max-w-6xl mx-auto px-3 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title text-center mb-12">Get In Touch</h2>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                I'm always open to discussing new projects, opportunities, or collaborations. Feel free to reach out through any of the following channels.
              </p>

              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 bg-dark p-4 rounded-xl hover:bg-dark/70 transition-all group"
                  >
                    <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <info.icon className="text-2xl text-primary" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{info.title}</p>
                      <p className="text-white font-medium">{info.value}</p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

              {submitted && (
                <div className="bg-green-500/10 border border-green-500 text-green-500 p-4 rounded-lg mb-6">
                  Message received! You can also reach me directly via email.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" className={errors.name ? 'border-red-500' : ''} />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" className={errors.email ? 'border-red-500' : ''} />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className={errors.subject ? 'border-red-500' : ''} />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>
                <div>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Your Message" rows="5" className={errors.message ? 'border-red-500' : ''} />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>
                <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2">
                  <FiSend /> Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
