import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({children}) => {
  const { accessToken } = useAuth();

  if (!accessToken) {
    return <Navigate to="/" />;
  }

  return children
};

export default ProtectedRoute;
