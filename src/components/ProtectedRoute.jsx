import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');

    if (!token) {
        // Redirect to Sign In page if not authenticated
        return <Navigate to="/signin" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
