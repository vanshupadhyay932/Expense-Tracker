import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { validateRegister } from "../../utils/validation";
import { PRIVATE_ROUTES } from "../../constants/routes";

const RegisterForm = () => {
  const navigate = useNavigate();

  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [serverError, setServerError] = useState("");

  const [loading, setLoading] = useState(false);

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

    const validationErrors =
      validateRegister(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      await register(formData);

      navigate(
        PRIVATE_ROUTES.DASHBOARD,
        {
          replace: true,
        }
      );
    } catch (error) {
      setServerError(
        error.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="register-form"
      onSubmit={handleSubmit}
      noValidate
    >

      {serverError && (
        <div className="error-message">
          {serverError}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">
          Full Name
        </label>

        <input
          id="name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData.name}
          onChange={handleChange}
        />

        {errors.name && (
          <small className="error-text">
            {errors.name}
          </small>
        )}
      </div>

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
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
        />

        {errors.password && (
          <small className="error-text">
            {errors.password}
          </small>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">
          Confirm Password
        </label>

        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        {errors.confirmPassword && (
          <small className="error-text">
            {errors.confirmPassword}
          </small>
        )}
      </div>

      <button
  type="submit"
  className="auth-btn"
  disabled={loading}
>
  {loading ? "Creating Account..." : "Create Account"}
</button>
    </form>
  );
};

export default RegisterForm;