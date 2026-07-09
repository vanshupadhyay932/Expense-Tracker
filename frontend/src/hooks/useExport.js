import { useState } from "react";
import {
  exportCSV,
  exportPDF,
} from "../services/exportService";

const useExport = () => {
  const [loading, setLoading] = useState({
    csv: false,
    pdf: false,
  });

  const [error, setError] = useState(null);

  const downloadCSV = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        csv: true,
      }));

      setError(null);

      await exportCSV();

      return true;
    } catch (err) {
      setError(
        err?.message ||
          "Failed to export CSV."
      );

      return false;
    } finally {
      setLoading((prev) => ({
        ...prev,
        csv: false,
      }));
    }
  };

  const downloadPDF = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        pdf: true,
      }));

      setError(null);

      await exportPDF();

      return true;
    } catch (err) {
      setError(
        err?.message ||
          "Failed to export PDF."
      );

      return false;
    } finally {
      setLoading((prev) => ({
        ...prev,
        pdf: false,
      }));
    }
  };

  return {
    downloadCSV,
    downloadPDF,
    csvLoading: loading.csv,
    pdfLoading: loading.pdf,
    error,
  };
};

export default useExport;

















































