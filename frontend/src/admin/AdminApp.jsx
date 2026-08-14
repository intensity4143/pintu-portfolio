import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import AdminLayout from './AdminLayout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import AdminProfile from './pages/AdminProfile';
import AdminProjects from './pages/AdminProjects';
import AdminSkills from './pages/AdminSkills';
import AdminExperience from './pages/AdminExperience';
import AdminEducation from './pages/AdminEducation';
import AdminAchievements from './pages/AdminAchievements';
import AdminResume from './pages/AdminResume';
import Settings from './pages/Settings';

const AdminApp = () => (
  <AuthProvider>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route index element={<Overview />} />
                <Route path="profile" element={<AdminProfile />} />
                <Route path="projects" element={<AdminProjects />} />
                <Route path="skills" element={<AdminSkills />} />
                <Route path="experience" element={<AdminExperience />} />
                <Route path="education" element={<AdminEducation />} />
                <Route path="achievements" element={<AdminAchievements />} />
                <Route path="resume" element={<AdminResume />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </AuthProvider>
);

export default AdminApp;
