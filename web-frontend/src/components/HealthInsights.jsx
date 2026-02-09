import { getLogs } from "../utils/storage";

export default function HealthInsights() {
  const logs = getLogs();

  if (logs.length < 2) return null;

  const symptomCount = {};
  logs.forEach((log) => {
    log.symptoms.split(" ").forEach((word) => {
      symptomCount[word] = (symptomCount[word] || 0) + 1;
    });
  });

  const frequentSymptoms = Object.entries(symptomCount)
    .filter(([_, count]) => count >= 3)
    .map(([symptom]) => symptom);

  if (frequentSymptoms.length === 0) return null;

  return (
    <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
      <p className="font-semibold text-yellow-800">
        Health Insight
      </p>
      <p className="text-sm text-yellow-700">
        You have reported <strong>{frequentSymptoms.join(", ")}</strong> multiple
        times recently. Consider consulting a medical professional if this
        persists.
      </p>
    </div>
  );
}
