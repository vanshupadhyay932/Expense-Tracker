import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import Footer from "../components/common/Footer";

const MainLayout = () => {
  return (
    <div className="main-layout">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <main className="page-content">
          <Outlet />
        </main>

        <Footer />

      </div>

    </div>
  );
};

export default MainLayout;