import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const links = [
  { to: '/admin', label: '📊 Overview', end: true },
  { to: '/admin/profile', label: '👤 Profile / About' },
  { to: '/admin/projects', label: '🗂 Projects' },
  { to: '/admin/skills', label: '⚡ Skills' },
  { to: '/admin/experience', label: '💼 Experience' },
  { to: '/admin/education', label: '🎓 Education' },
  { to: '/admin/achievements', label: '🏆 Achievements' },
  { to: '/admin/resume', label: '📄 Resume' },
  { to: '/admin/messages', label: '✉️ Messages' },
  { to: '/admin/settings', label: '⚙️ Settings' },
];

const AdminLayout = ({ children }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
        <div className="p-4 border-b border-gray-800">
          <p className="font-bold text-blue-400 text-lg">Admin Panel</p>
          <p className="text-xs text-gray-500 mt-1">Pintu Kumar Portfolio</p>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm transition-colors ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-800'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-gray-800">
          <a href="/" target="_blank" className="block px-3 py-2 text-sm text-gray-400 hover:text-white mb-1">
            🌐 View Portfolio
          </a>
          <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-gray-800 rounded">
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
