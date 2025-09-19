import { useState } from "react";

export default function QueryInput({ onAsk, isLoading }) {
  const [question, setQuestion] = useState("");

  const submit = () => {
    if (question.trim() && !isLoading) {
      onAsk(question);
      setQuestion(""); // optional: clear input after submit
    }
  };

  return (
    <div className="flex gap-2">
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="border p-2 flex-1"
        placeholder="Ask a business question..."
        disabled={isLoading} // disable input while loading
      />
      <button
        onClick={submit}
        className={`px-4 rounded text-white ${
          isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
        }`}
        disabled={isLoading} // disable button while loading
      >
        {isLoading ? "Analyzing..." : "Ask"}
      </button>
    </div>
  );
}
