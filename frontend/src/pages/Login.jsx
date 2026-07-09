import { Link, Navigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import useAuth from "../hooks/useAuth";
import {
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "../constants/routes";

const Login = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        Loading...
      </div>
    );
  }

  // If already logged in, don't show login page
  if (isAuthenticated) {
    return (
      <Navigate
        to={PRIVATE_ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">

        <div className="auth-header">
          <h1>Expense Tracker</h1>
          <p>
            Track your income and expenses with ease.
          </p>
        </div>

        <LoginForm />

        <div className="auth-footer">
  <p>
    Don't have an account?{" "}
    <Link
      to={PUBLIC_ROUTES.REGISTER}
      className="auth-link"
    >
      Register
    </Link>
  </p>
</div>

      </div>
    </div>
  );
};

export default Login;