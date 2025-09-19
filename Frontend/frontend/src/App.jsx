import { useState } from "react";
import { askQuestion } from "./api";
import QueryInput from "../components/QueryInput";
import ResultsTable from "../components/ResultsTable";
import Chart from "../components/Chart";
import KPICards from "../components/KPICards";

function App() {
  const [sql, setSql] = useState("");
  const [results, setResults] = useState([]);
  const [isScalar, setIsScalar] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // loading state

  const handleAsk = async (question) => {
    setIsLoading(true); // start loading
    try {
      const data = await askQuestion(question);
      setSql(data.sql);
      setResults(data.results);

      // Detect single-value (1 row, 1 column)
      if (
        data.results.length === 1 &&
        Object.keys(data.results[0]).length === 1
      ) {
        setIsScalar(true);
      } else {
        setIsScalar(false);
      }
    } catch (err) {
      alert("Error: " + err.response?.data?.detail?.error || err.message);
    } finally {
      setIsLoading(false); // stop loading
    }
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">
        Natural Language to SQL Dashboard
      </h1>

      <QueryInput onAsk={handleAsk} isLoading={isLoading} />

      {isLoading && <p className="text-gray-500 my-2">Analyzing...</p>}

      {sql && <pre className="bg-gray-100 p-2 mt-4">SQL: {sql}</pre>}

      {/* KPI cards always shown */}
      <KPICards results={results} />

      {/* Table always shown */}
      <ResultsTable results={results} />

      {/* Show chart only if not scalar */}
      {!isScalar && <Chart results={results} />}
    </div>
  );
}

export default App;
