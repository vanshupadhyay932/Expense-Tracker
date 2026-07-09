import { useState } from "react";
import Button from "../common/Button";
import { exportCSV } from "../../services/exportService";

const ExportCSV = ({
  label = "Export CSV",
  variant = "success",
}) => {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    try {
      setLoading(true);

      await exportCSV();
    } catch (error) {
      console.error(error);

      alert(
        error?.message ||
          "Failed to export CSV."
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
      📄 {label}
    </Button>
  );
};

export default ExportCSV;