export default function ResultsTable({ results }) {
  if (!results || results.length === 0) return null;

  const keys = Object.keys(results[0]);

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full border border-gray-300 shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            {keys.map((k) => (
              <th
                key={k}
                className="border border-gray-300 px-5 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                {k}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {results.map((row, i) => (
            <tr
              key={i}
              className={`${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              } hover:bg-blue-50 transition-colors`}
            >
              {keys.map((k) => (
                <td
                  key={k}
                  className="border border-gray-300 px-5 py-3 text-sm text-gray-600"
                >
                  {row[k]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
