const PDFDocument = require("pdfkit");

/**
 * Convert Transactions into PDF
 */
const pdfExporter = (transactions) => {

  return new Promise((resolve, reject) => {

    try {

      // Create PDF Document
      const doc = new PDFDocument({
        margin: 40,
      });

      const buffers = [];

      // Store PDF chunks
      doc.on("data", (chunk) => {
        buffers.push(chunk);
      });

      // PDF Finished
      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      // PDF Title
      doc
        .fontSize(20)
        .text("Expense Tracker Report", {
          align: "center",
        });

      doc.moveDown();

      // Table Header
      doc
        .fontSize(12)
        .text(
          "Type | Category | Amount | Description | Date"
        );

      doc.moveDown(0.5);

      // Divider
      doc.text(
        "--------------------------------------------------------------"
      );

      // Transactions
      transactions.forEach((transaction) => {

        doc.text(
          `${transaction.type} | ${transaction.category} | ₹${transaction.amount} | ${transaction.description} | ${new Date(transaction.date).toLocaleDateString()}`
        );

      });

      doc.moveDown();

      // Footer
      doc
        .fontSize(10)
        .text(
          `Total Transactions: ${transactions.length}`,
          {
            align: "right",
          }
        );

      // Finish PDF
      doc.end();

    } catch (error) {

      reject(error);

    }

  });

};

module.exports = pdfExporter;