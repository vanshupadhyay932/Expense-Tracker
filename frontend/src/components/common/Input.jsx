const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  onBlur,
  placeholder = "",
  error = "",
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  autoComplete = "off",
  min,
  max,
  step,
}) => {
  return (
    <div
      className={`input-group ${
        fullWidth ? "full-width" : ""
      }`}
    >
      {label && (
        <label
          htmlFor={name}
          className="input-label"
        >
          {label}
          {required && (
            <span className="required">
              {" "}
              *
            </span>
          )}
        </label>
      )}

      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete={autoComplete}
        min={min}
        max={max}
        step={step}
        className={`input-field ${
          error ? "input-error-border" : ""
        }`}
      />

      {error && (
        <small className="input-error">
          {error}
        </small>
      )}
    </div>
  );
};

export default Input;