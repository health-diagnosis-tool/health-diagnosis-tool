import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveUser, getUserById } from "../utils/storage";

export default function Login({ setUser }) {
  const [isNewUser, setIsNewUser] = useState(true);
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!userId.trim()) return;

    
    if (isNewUser) {
      if (!name.trim()) return;

      const existingUser = getUserById(userId);
      if (existingUser) {
        alert("User ID already exists. Please login instead.");
        return;
      }

      const user = { userId, name };
      saveUser(userId, user);
      localStorage.setItem("healthdx_current_user", userId);
      setUser(user);
    }

    
    else {
      const existingUser = getUserById(userId);
      if (!existingUser) {
        alert("User not found. Please create a new profile.");
        return;
      }

      localStorage.setItem("healthdx_current_user", userId);
      setUser(existingUser);
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">
          Health Tracker
        </h1>

        
        <div className="flex mb-4">
          <button
            type="button"
            onClick={() => setIsNewUser(true)}
            className={`flex-1 py-2 rounded-l-lg ${
              isNewUser ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            New User
          </button>
          <button
            type="button"
            onClick={() => setIsNewUser(false)}
            className={`flex-1 py-2 rounded-r-lg ${
              !isNewUser ? "bg-black text-white" : "bg-gray-200"
            }`}
          >
            Returning User
          </button>
        </div>

        
        <input
          type="text"
          placeholder="Enter User ID (e.g. user123)"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
        />

        
        {isNewUser && (
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          {isNewUser ? "Create Profile & Start Tracking" : "Login"}
        </button>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Privacy First: All data is stored locally on your device.
        </p>
      </form>
    </div>
  );
}
