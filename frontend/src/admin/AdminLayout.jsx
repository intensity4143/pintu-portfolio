import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const links = [
  { to: '/admin',              label: 'Overview',     end: true },
  { to: '/admin/profile',      label: 'Profile / About' },
  { to: '/admin/projects',     label: 'Projects' },
  { to: '/admin/skills',       label: 'Skills' },
  { to: '/admin/experience',   label: 'Experience' },
  { to: '/admin/education',    label: 'Education' },
  { to: '/admin/achievements', label: 'Achievements' },
  { to: '/admin/resume',       label: 'Resume' },
  { to: '/admin/messages',     label: 'Messages' },
  { to: '/admin/settings',     label: 'Settings' },
];

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-surface text-text-primary font-sans">
      {/* Sidebar */}
      <aside className="w-52 bg-surface-2 border-r border-border flex flex-col shrink-0">
        <div className="p-5 border-b border-border">
          <p className="font-semibold text-text-primary tracking-tight" style={{ letterSpacing: '-0.02em' }}>Admin Panel</p>
          <p className="font-mono text-xs text-text-muted mt-1">pintu kumar</p>
        </div>
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm transition-colors duration-150 ${
                  isActive
                    ? 'text-accent border-l-2 border-accent pl-[10px] bg-accent/5'
                    : 'text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border space-y-0.5">
          <a href="/" target="_blank" className="block px-3 py-2 text-sm text-text-muted hover:text-text-primary transition-colors">
            View Portfolio ↗
          </a>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-text-muted hover:text-red-400 transition-colors">
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
