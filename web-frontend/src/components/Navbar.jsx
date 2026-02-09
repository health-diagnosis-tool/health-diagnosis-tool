import { useNavigate } from "react-router-dom";
import { clearUsers } from "../utils/storage";

export default function Navbar() {
  const navigate = useNavigate();

  function handleLogout() {
    clearUsers();
    localStorage.removeItem("healthdx_current_user");
    navigate("/login");
  }

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 className="text-lg font-semibold">Health Tracker</h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
