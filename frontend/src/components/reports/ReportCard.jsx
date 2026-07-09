import Card from "../common/Card";

const ReportCard = ({
  title,
  subtitle,
  children,
  footer,
  className = "",
}) => {
  return (
    <Card className={`report-card ${className}`}>
      {(title || subtitle) && (
        <div className="report-card-header">

          {title && (
            <h2 className="report-card-title">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="report-card-subtitle">
              {subtitle}
            </p>
          )}

        </div>
      )}

      <div className="report-card-body">
        {children}
      </div>

      {footer && (
        <div className="report-card-footer">
          {footer}
        </div>
      )}
    </Card>
  );
};

export default ReportCard;