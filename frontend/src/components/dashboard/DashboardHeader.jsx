import useAuth from "../../hooks/useAuth";

const DashboardHeader = () => {
  const { user } = useAuth();

  return (
    <header className="dashboard-header">

      <div className="dashboard-header-left">

        <div className="user-info">
          <h2>
            Welcome,
            <span> {user?.name}</span>
          </h2>
        </div>

      </div>

    </header>
  );
};

export default DashboardHeader;