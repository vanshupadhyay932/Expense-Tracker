// Public Routes
export const PUBLIC_ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
};

// Protected Routes
export const PRIVATE_ROUTES = {
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/transactions",
  REPORTS: "/reports",
  PROFILE: "/profile",
};

// Export Routes
export const EXPORT_ROUTES = {
  CSV: "/export/csv",
  PDF: "/export/pdf",
};

// Fallback Route
export const FALLBACK_ROUTE = "*";