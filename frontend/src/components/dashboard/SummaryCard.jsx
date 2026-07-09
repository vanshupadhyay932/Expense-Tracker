import { formatCurrency } from "../../utils/formatCurrency";

const SummaryCard = ({
  title,
  value,
  icon,
  color = "#2563eb",
  isCurrency = true,
}) => {
  return (
    <div
      className="summary-card"
      style={{
        borderTop: `4px solid ${color}`,
      }}
    >
      <div className="summary-card-header">
        <div className="summary-card-icon">
          {icon}
        </div>

        <h3>{title}</h3>
      </div>

      <div className="summary-card-body">
        <h2>
          {isCurrency
            ? formatCurrency(value)
            : value}
        </h2>
      </div>
    </div>
  );
};

export default SummaryCard;