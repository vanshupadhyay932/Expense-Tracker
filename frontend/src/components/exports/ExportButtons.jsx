import { useState } from "react";
import Button from "../common/Button";
import {
  exportCSV,
  exportPDF,
} from "../../services/exportService";

const ExportButtons = () => {
  const [loading, setLoading] = useState({
    csv: false,
    pdf: false,
  });

  const handleExportCSV = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        csv: true,
      }));

      await exportCSV();
    } catch (error) {
      alert(
        error?.message ||
          "Failed to export CSV."
      );
    } finally {
      setLoading((prev) => ({
        ...prev,
        csv: false,
      }));
    }
  };

  const handleExportPDF = async () => {
    try {
      setLoading((prev) => ({
        ...prev,
        pdf: true,
      }));

      await exportPDF();
    } catch (error) {
      alert(
        error?.message ||
          "Failed to export PDF."
      );
    } finally {
      setLoading((prev) => ({
        ...prev,
        pdf: false,
      }));
    }
  };

  return (
    <div className="export-buttons">

      <Button
        variant="success"
        loading={loading.csv}
        onClick={handleExportCSV}
      >
        📄 Export CSV
      </Button>

      <Button
        variant="danger"
        loading={loading.pdf}
        onClick={handleExportPDF}
      >
        📑 Export PDF
      </Button>

    </div>
  );
};

export default ExportButtons;