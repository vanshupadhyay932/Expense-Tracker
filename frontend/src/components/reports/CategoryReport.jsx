import { useMemo } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { formatCurrency } from "../../utils/formatCurrency";
import { capitalize } from "../../utils/helpers";

const CategoryReport = () => {
  const { categoryReport } = useTransactionContext();

  const reportData = useMemo(() => {
    return Object.entries(categoryReport).map(
      ([category, amount]) => ({
        category,
        amount,
      })
    );
  }, [categoryReport]);

  const totalExpense = useMemo(() => {
    return reportData.reduce(
      (total, item) => total + item.amount,
      0
    );
  }, [reportData]);

  if (reportData.length === 0) {
    return (
      <div className="category-report">
        <h2>Expense by Category</h2>
        <p>No expense data available.</p>
      </div>
    );
  }

  return (
    <div className="category-report">

      <div className="report-header">
        <h2>Category-wise Expense Report</h2>
      </div>

      <table className="report-table">

        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Percentage</th>
          </tr>
        </thead>

        <tbody>

          {reportData.map((item) => {
            const percentage =
              totalExpense === 0
                ? 0
                : (
                    (item.amount /
                      totalExpense) *
                    100
                  ).toFixed(2);

            return (
              <tr key={item.category}>

                <td>
                  {capitalize(
                    item.category
                  )}
                </td>

                <td>
                  {formatCurrency(
                    item.amount
                  )}
                </td>

                <td>
                  {percentage}%
                </td>

              </tr>
            );
          })}

        </tbody>

        <tfoot>

          <tr>

            <th>Total</th>

            <th>
              {formatCurrency(
                totalExpense
              )}
            </th>

            <th>100%</th>

          </tr>

        </tfoot>

      </table>

    </div>
  );
};

export default CategoryReport;