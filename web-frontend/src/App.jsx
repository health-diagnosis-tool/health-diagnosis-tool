import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";
import { getUser } from "./utils/storage";

export default function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(getUser());

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

/*
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Timeline from "./pages/Timeline";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/timeline" element={<Timeline />} />
    </Routes>
  );
}

*/