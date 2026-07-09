import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

const Charts = ({
  monthlyReport,
  categoryReport,
}) => {
  const monthlyData = Object.entries(
    monthlyReport || {}
  ).map(([month, data]) => ({
    month,
    income: data.income,
    expense: data.expense,
  }));

  const categoryData = Object.entries(
    categoryReport || {}
  ).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="charts-container">

      <div className="chart-card">

        <h2>Monthly Income vs Expense</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar
              dataKey="income"
              fill="#16A34A"
            />

            <Bar
              dataKey="expense"
              fill="#DC2626"
            />
          </BarChart>
        </ResponsiveContainer>

      </div>

      <div className="chart-card">

        <h2>Expense by Category</h2>

        <ResponsiveContainer
          width="100%"
          height={350}
        >
          <PieChart>

            <Pie
              data={categoryData}
              dataKey="amount"
              nameKey="category"
              outerRadius={120}
              label
            >
              {categoryData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default Charts;