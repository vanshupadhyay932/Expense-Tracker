import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import useAuth from "../hooks/useAuth";
import {
  PUBLIC_ROUTES,
} from "../constants/routes";

const ProtectedRoute = () => {
  const {
    user,
    loading,
    isAuthenticated,
  } = useAuth();

  const location = useLocation();

  if (loading) {
    return (
      <Loader
        text="Checking authentication..."
        fullScreen
      />
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to={PUBLIC_ROUTES.LOGIN}
        replace
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;