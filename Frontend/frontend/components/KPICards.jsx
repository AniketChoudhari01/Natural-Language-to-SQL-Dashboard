export default function KPICards({ results }) {
  if (!results || results.length === 0) return null;

  const firstRow = results[0];

  // Detect first numeric column for KPI (Revenue)
  const numericKeys = Object.keys(firstRow).filter(
    (k) => typeof firstRow[k] === "number"
  );
  const totalRevenue =
    numericKeys.length > 0
      ? results.reduce((sum, r) => sum + r[numericKeys[0]], 0)
      : 0;

  // Detect first string column for unique customer count (fallback to row count)
  const stringKeys = Object.keys(firstRow).filter(
    (k) => typeof firstRow[k] === "string"
  );
  const uniqueCustomers =
    stringKeys.length > 0
      ? new Set(results.map((r) => r[stringKeys[0]])).size
      : results.length;

  // Quick fake trend arrows (▲ for demo, can be later connected to real trend)
  const revenueTrend = "📈";
  const ordersTrend = "📈";
  const customersTrend = "📈";

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      <div className="bg-green-100 p-4 rounded flex justify-between items-center">
        Revenue: ${totalRevenue.toLocaleString()}{" "}
        <span className="text-green-700">{revenueTrend}</span>
      </div>
      <div className="bg-blue-100 p-4 rounded flex justify-between items-center">
        Orders: {results.length}{" "}
        <span className="text-green-700">{ordersTrend}</span>
      </div>
      <div className="bg-yellow-100 p-4 rounded flex justify-between items-center">
        Customers: {uniqueCustomers}{" "}
        <span className="text-green-700">{customersTrend}</span>
      </div>
    </div>
  );
}
