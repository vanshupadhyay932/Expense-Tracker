const { Parser } = require("json2csv");

/**
 * Convert Transactions into CSV
 */
const csvExporter = (transactions) => {

  // Fields that will become CSV columns
  const fields = [

    "type",

    "category",

    "amount",

    "description",

    "date",

  ];

  // Create Parser
  const parser = new Parser({
    fields,
  });

  // Convert JSON to CSV
  const csv = parser.parse(
    transactions
  );

  return csv;

};

module.exports = csvExporter;