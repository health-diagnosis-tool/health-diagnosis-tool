import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser } from "../utils/storage";

export default function Login({ setUser }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name.trim()) return;

    const user = { name };

    // 1️⃣ Save user to localStorage
    saveUser(user);

    // 2️⃣ Update React state (THIS IS CRITICAL)
    setUser(user);

    // 3️⃣ Navigate to dashboard
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Welcome to HealthDx
        </h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create Health Profile
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          No personal medical data is stored on servers.
        </p>
      </form>
    </div>
  );
}
