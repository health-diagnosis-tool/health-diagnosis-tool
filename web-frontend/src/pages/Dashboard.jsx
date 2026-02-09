import Navbar from "../components/Navbar";
import HealthInsights from "../components/HealthInsights";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Navbar />

        <h1 className="text-2xl font-bold mb-6">
          Your Health Dashboard
        </h1>

        {/* Health Insights Preview */}
        <HealthInsights />

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Link
            to="/log-symptoms"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              Log Today’s Symptoms
            </h2>
            <p className="text-gray-600">
              Add new symptoms, severity and duration
            </p>
          </Link>

          <Link
            to="/timeline"
            className="bg-white p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              Health Timeline
            </h2>
            <p className="text-gray-600">
              View your symptom history over time
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
