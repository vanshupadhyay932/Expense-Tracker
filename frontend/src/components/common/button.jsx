const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "medium",
  fullWidth = false,
  loading = false,
  disabled = false,
  onClick,
  className = "",
}) => {
  const classes = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    fullWidth ? "btn-full" : "",
    loading ? "btn-loading" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? "Loading..." : children}
    </button>
  );
};

export default Button;