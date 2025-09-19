import Plot from "react-plotly.js";

export default function Chart({ results }) {
  if (!results || results.length === 0) return null;

  const keys = Object.keys(results[0]);

  // Require at least 2 columns and multiple rows to show chart
  if (results.length < 2 && keys.length < 2) return null;

  const firstRow = results[0];

  // x-axis: first string column (categorical), fallback to first column
  const xKey = keys.find((k) => typeof firstRow[k] === "string") || keys[0];

  // y-axis: first numeric column
  const yKey = keys.find((k) => typeof firstRow[k] === "number") || keys[1];

  return (
    <Plot
      data={[
        {
          x: results.map((r) => r[xKey]),
          y: results.map((r) => r[yKey]),
          type: "bar",
        },
      ]}
      layout={{ title: "Visualization" }}
    />
  );
}
