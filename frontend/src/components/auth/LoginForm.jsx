import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { validateLogin } from "../../utils/validation";
import { PRIVATE_ROUTES } from "../../constants/routes";

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const from =
    location.state?.from?.pathname || PRIVATE_ROUTES.DASHBOARD;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] = useState(false);

  const [serverError, setServerError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setServerError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateLogin(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await login(formData);

      navigate(from, { replace: true });
    } catch (error) {
      setServerError(
        error.message ||
          "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
      noValidate
    >

      {serverError && (
        <div className="error-message">
          {serverError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="email">
          Email
        </label>

        <input
          id="email"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />

        {errors.email && (
          <small className="error-text">
            {errors.email}
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="password">
          Password
        </label>

        <input
          id="password"
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />

        {errors.password && (
          <small className="error-text">
            {errors.password}
          </small>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;