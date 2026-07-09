import useAuth from "../../hooks/useAuth";
import { formatLongDate } from "../../utils/formatDate";
import { getInitials } from "../../utils/helpers";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Expense Tracker</h2>
        <p>{formatLongDate(new Date())}</p>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="user-avatar">
            {getInitials(user?.name)}
          </div>

          <div className="user-details">
            <span>{user?.name}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;