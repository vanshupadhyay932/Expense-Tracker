import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { PRIVATE_ROUTES } from "../../constants/routes";

const Sidebar = () => {
  const { logout } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: PRIVATE_ROUTES.DASHBOARD,
    },
    {
      title: "Transactions",
      path: PRIVATE_ROUTES.TRANSACTIONS,
    },
    {
      title: "Reports",
      path: PRIVATE_ROUTES.REPORTS,
    },
  ];

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>Expense Tracker</h2>
      </div>

      <nav className="sidebar-menu">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? "sidebar-link active"
                : "sidebar-link"
            }
          >
            <span>{item.title}</span>
          </NavLink>
        ))}

      </nav>

      <div className="sidebar-footer">

        <button
          className="logout-button"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;