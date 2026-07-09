import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Transactions from "../pages/Transactions";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import NotFound from "../pages/NotFound";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Redirect root */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        {/* Public Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/transactions"
              element={<Transactions />}
            />

            <Route
              path="/reports"
              element={<Reports />}
            />

            <Route
              path="/profile"
              element={<Profile />}
            />
          </Route>
        </Route>

        {/* 404 */}
        <Route
          path="*"
          element={<NotFound />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;