import { UseCheckAdminRequest } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading: isUserLoading } = useAuth0();
  const { adminUser, isLoading: isAdminLoading } = UseCheckAdminRequest();
  if (isUserLoading && isAdminLoading) {
    return null;
  }

  if (isAuthenticated && adminUser?.isAdmin) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default ProtectedRoute;
