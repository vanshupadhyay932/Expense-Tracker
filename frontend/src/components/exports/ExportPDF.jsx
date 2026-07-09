import { useState } from "react";
import Button from "../common/Button";
import { exportPDF } from "../../services/exportService";

const ExportPDF = ({
  label = "Export PDF",
  variant = "danger",
}) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      await exportPDF();
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
          "Failed to export PDF."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      loading={loading}
      onClick={handleExport}
    >
      📑 {label}
    </Button>
  );
};

export default ExportPDF;