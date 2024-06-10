import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const { isAuthenticated, isLoading: isUserLoading } = useAuth0();
  if (isUserLoading) {
    return null;
  }

  if (isAuthenticated) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default UserRoute;
