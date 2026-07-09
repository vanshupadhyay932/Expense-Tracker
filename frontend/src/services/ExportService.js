import api from "../config/axios";
import { EXPORT_API } from "../constants/api";

/**
 * Download transactions as CSV.
 */
export const exportCSV = async () => {
  try {
    const response = await api.get(
      EXPORT_API.CSV,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob(
      [response.data],
      {
        type: "text/csv",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "transactions.csv";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw (
      error.response?.data || {
        message:
          "Failed to export CSV.",
      }
    );
  }
};

/**
 * Download transactions as PDF.
 */
export const exportPDF = async () => {
  try {
    const response = await api.get(
      EXPORT_API.PDF,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob(
      [response.data],
      {
        type: "application/pdf",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "transactions.pdf";

    document.body.appendChild(link);

    link.click();

    link.remove();

    window.URL.revokeObjectURL(url);
  } catch (error) {
    throw (
      error.response?.data || {
        message:
          "Failed to export PDF.",
      }
    );
  }
};