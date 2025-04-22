import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { isAuthenticated  }= useAuth();
    return isAuthenticated  ? <Navigate to="/dashboard" replace /> : children;
}

export default PublicRoute