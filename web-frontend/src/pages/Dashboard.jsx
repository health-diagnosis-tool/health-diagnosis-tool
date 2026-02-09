import Navbar from "../components/Navbar";
import LogSymptoms from "./LogSymptoms";
import Timeline from "./Timeline";
import HealthInsights from "../components/HealthInsights";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Top Navigation */}
        <Navbar />

        {/* Page Heading */}
        <h1 className="text-2xl font-bold mb-4">
          Your Health Dashboard
        </h1>

        {/* Health Insights */}
        <HealthInsights />

        {/* Symptom Logging Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">
            Log Today’s Symptoms
          </h2>
          <LogSymptoms />
        </div>

        {/* Timeline Section */}
        <div>
          <h2 className="text-xl font-semibold mb-3">
            Health Timeline
          </h2>
          <Timeline />
        </div>
      </div>
    </div>
  );
}
