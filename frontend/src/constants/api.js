// Authentication APIs
export const AUTH_API = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
};

// Transaction APIs
export const TRANSACTION_API = {
  GET_ALL: "/transactions",
  CREATE: "/transactions",
  UPDATE: (id) => `/transactions/${id}`,
  DELETE: (id) => `/transactions/${id}`,
  GET_BY_ID: (id) => `/transactions/${id}`,
};

// Report APIs
export const REPORT_API = {
  SUMMARY: "/reports/summary",
  MONTHLY: "/reports/monthly",
  CATEGORY: "/reports/category",
  DASHBOARD: "/reports/dashboard",
};

// Export APIs
export const EXPORT_API = {
  CSV: "/export/csv",
  PDF: "/export/pdf",
};