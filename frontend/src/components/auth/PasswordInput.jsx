import { useState } from "react";

const PasswordInput = ({
  label = "Password",
  name = "password",
  value,
  onChange,
  placeholder = "Enter your password",
  error = "",
  required = false,
  disabled = false,
}) => {
  const [showPassword, setShowPassword] =
    useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((previous) => !previous);
  };

  return (
    <div className="password-input">

      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <div className="password-input-wrapper">

        <input
          id={name}
          name={name}
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete="current-password"
        />

        <button
          type="button"
          className="toggle-password-btn"
          onClick={togglePasswordVisibility}
        >
          {showPassword
            ? "Hide"
            : "Show"}
        </button>

      </div>

      {error && (
        <small className="input-error">
          {error}
        </small>
      )}

    </div>
  );
};

export default PasswordInput;