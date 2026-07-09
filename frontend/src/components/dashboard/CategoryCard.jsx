import { useMemo } from "react";
import Card from "../common/Card";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { capitalize } from "../../utils/helpers";

const CategoryCard = () => {
  const { categoryReport } = useTransactionContext();

  const topCategory = useMemo(() => {
    const entries = Object.entries(categoryReport || {});

    if (entries.length === 0) {
      return null;
    }

    const [category, amount] = entries.reduce(
      (highest, current) =>
        current[1] > highest[1]
          ? current
          : highest
    );

    return {
      category,
      amount,
    };
  }, [categoryReport]);

  return (
    <Card className="category-card">
      <div className="category-card-header">

        <div className="category-icon">
          📂
        </div>

        <div>
          <p className="category-title">
            Top Spending Category
          </p>

          <h2 className="category-name">
            {topCategory
              ? capitalize(topCategory.category)
              : "No Data"}
          </h2>
        </div>

      </div>

      <div className="category-footer">

        <span className="category-amount">
          {topCategory
            ? formatCurrency(topCategory.amount)
            : formatCurrency(0)}
        </span>

      </div>
    </Card>
  );
};

export default CategoryCard;