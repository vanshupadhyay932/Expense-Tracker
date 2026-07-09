const Loader = ({
  text = "Loading...",
  fullScreen = false,
  size = "medium",
}) => {
  return (
    <div
      className={`loader-container ${
        fullScreen ? "fullscreen" : ""
      }`}
    >
      <div
        className={`loader-spinner ${size}`}
      ></div>

      <p className="loader-text">
        {text}
      </p>
    </div>
  );
};

export default Loader;