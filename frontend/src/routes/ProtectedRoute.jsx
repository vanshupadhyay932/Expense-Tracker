import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { PUBLIC_ROUTES } from "../constants/routes";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Wait until authentication state is restored
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect unauthenticated users
  if (!isAuthenticated) {
    return (
      <Navigate
        to={PUBLIC_ROUTES.LOGIN}
        state={{ from: location }}
        replace
      />
    );
  }

  // Render protected routes
  return <Outlet />;
};

export default ProtectedRoute;