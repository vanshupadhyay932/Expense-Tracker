import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">

      <Sidebar />

      <div className="dashboard-main">

        <DashboardHeader />

        <main className="dashboard-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;