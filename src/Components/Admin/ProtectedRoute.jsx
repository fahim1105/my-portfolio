import { Navigate } from 'react-router';

// Wraps admin routes — redirects to /admin/login if no token
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('admin_token');
    return token ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
