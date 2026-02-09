import { useState } from "react";
import { saveLog } from "../utils/storage";

export default function LogSymptoms() {
  const [symptoms, setSymptoms] = useState("");
  const [severity, setSeverity] = useState("low");
  const [duration, setDuration] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!symptoms.trim()) return;

    saveLog({
      symptoms,
      severity,
      duration,
      notes,
      date: new Date().toISOString(),
    });

    setSymptoms("");
    setSeverity("low");
    setDuration("");
    setNotes("");

    alert("Symptoms logged successfully");
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-xl font-bold mb-4">Log Your Symptoms</h2>

        <textarea
          placeholder="Describe your symptoms"
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />

        <input
          type="text"
          placeholder="Duration (e.g. 2 days)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        />

        <select
          value={severity}
          onChange={(e) => setSeverity(e.target.value)}
          className="w-full border rounded p-2 mb-3"
        >
          <option value="low">Low Severity</option>
          <option value="medium">Medium Severity</option>
          <option value="high">High Severity</option>
        </select>

        <textarea
          placeholder="Additional notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded p-2 mb-4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
          Save Entry
        </button>
      </form>
    </div>
  );
}
