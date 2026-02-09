import { getLogs } from "../utils/storage";

export default function Timeline() {
  const logs = getLogs();

  if (logs.length === 0) {
    return (
      <div className="text-center text-gray-600">
        No health logs yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {logs
        .slice()
        .reverse()
        .map((log, index) => (
          <div
            key={index}
            className="border rounded-lg p-4 bg-white shadow"
          >
            <p className="font-semibold">
              {new Date(log.date).toLocaleDateString()}
            </p>
            <p><strong>Symptoms:</strong> {log.symptoms}</p>
            <p><strong>Severity:</strong> {log.severity}</p>
            <p><strong>Duration:</strong> {log.duration}</p>
            {log.notes && <p><strong>Notes:</strong> {log.notes}</p>}
          </div>
        ))}
    </div>
  );
}
