import Button from "./Button";

const PageHeader = ({
  title,
  subtitle,
  actionText,
  onAction,
  actionIcon,
  children,
}) => {
  return (
    <div className="page-header">

      <div className="page-header-content">

        <div className="page-header-text">

          <h1 className="page-title">
            {title}
          </h1>

          {subtitle && (
            <p className="page-subtitle">
              {subtitle}
            </p>
          )}

        </div>

        {(actionText || children) && (
          <div className="page-header-actions">

            {children}

            {actionText && (
              <Button
                onClick={onAction}
              >
                {actionIcon && (
                  <span>
                    {actionIcon}
                  </span>
                )}{" "}
                {actionText}
              </Button>
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default PageHeader;