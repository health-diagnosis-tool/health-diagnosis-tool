import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import { getUserById } from "./utils/storage";

export default function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const currentUserId = localStorage.getItem("healthdx_current_user");

    if (currentUserId) {
      const savedUser = getUserById(currentUserId);
      setUser(savedUser);
    }
  }, []);

  return (
    <Routes>
      <Route
        path="/login"
        element={<Login setUser={setUser} />}
      />

      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      <Route
        path="/timeline"
        element={user ? <Timeline /> : <Navigate to="/login" />}
      />

      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}
