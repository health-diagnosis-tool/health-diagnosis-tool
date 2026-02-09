import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "../utils/storage";

export default function Navbar() {
  const navigate = useNavigate();

  function logout() {
    clearUser();
    navigate("/login");
  }

  return (
    <nav className="flex justify-between items-center mb-6">
      <h1 className="text-xl font-bold">HealthDx</h1>

      <div className="space-x-4">
        <Link to="/dashboard" className="text-blue-600 hover:underline">
          Dashboard
        </Link>
        <Link to="/timeline" className="text-blue-600 hover:underline">
          Timeline
        </Link>
        <button
          onClick={logout}
          className="text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
