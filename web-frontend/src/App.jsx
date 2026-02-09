import { Routes, Route, Navigate } from "react-router-dom";
import { useState} from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import LogSymptoms from "./pages/LogSymptoms";
import { getUser } from "./utils/storage";

export default function App() {
  const [user, setUser] = useState(() => getUser());

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
        path="/log-symptoms"
        element={user ? <LogSymptoms /> : <Navigate to="/login" />}
      />

      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />
    </Routes>
  );
}