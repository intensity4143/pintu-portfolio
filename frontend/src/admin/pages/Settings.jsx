// Settings page re-uses Profile page — redirect there
import { Navigate } from 'react-router-dom';
const Settings = () => <Navigate to="/admin/profile" replace />;
export default Settings;
