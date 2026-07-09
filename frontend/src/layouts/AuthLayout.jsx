import { Link, Outlet } from "react-router-dom";
import { PUBLIC_ROUTES } from "../constants/routes";

const AuthLayout = () => {
  return (
    <div className="auth-layout">

      <div className="auth-left">

        <div className="auth-brand">

          <h1>Expense Tracker</h1>

          <p>
            Manage your income and expenses
            efficiently with real-time reports
            and analytics.
          </p>

          <ul className="auth-features">

            <li>✅ Track Income & Expenses</li>

            <li>✅ Monthly Reports</li>

            <li>✅ Category-wise Analysis</li>

            <li>✅ CSV & PDF Export</li>

            <li>✅ Secure Authentication</li>

          </ul>

        </div>

      </div>

 <div className="auth-right">

  <div className="auth-card">

    <Outlet />

  </div>

</div>
    </div>
  );
};

export default AuthLayout;