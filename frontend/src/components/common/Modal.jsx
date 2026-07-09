import { useEffect } from "react";

const Modal = ({
  isOpen,
  title,
  children,
  onClose,
  width = "500px",
  showCloseButton = true,
}) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        className="modal-container"
        style={{ maxWidth: width }}
      >
        <div className="modal-header">
          <h2>{title}</h2>

          {showCloseButton && (
            <button
              className="modal-close"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;