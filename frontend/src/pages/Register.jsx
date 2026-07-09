import { Link, Navigate } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";
import useAuth from "../hooks/useAuth";
import {
  PRIVATE_ROUTES,
  PUBLIC_ROUTES,
} from "../constants/routes";

const Register = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="page-loader">
        Loading...
      </div>
    );
  }

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
          <h1>Create Your Account</h1>

          <p>
            Start tracking your income and expenses today.
          </p>
        </div>

        <RegisterForm />

        <div className="auth-footer">
          <p>
            Already have an account?{" "}
           <Link
  to={PUBLIC_ROUTES.LOGIN}
  className="auth-link"
>
  Login
</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;