import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./components/Landing/LandingPage";
import PollWaveLogin from "./components/auth/LoginPage";
import Dashboard from "./components/Dashboard/dashboard";
import Analytics from "./components/Analytics";
import ShowPoll from "./components/ShowPoll";
import ProtectedRoute from "./protected/protectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/auth" element={<PollWaveLogin />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route path="/poll/:id" element={<ShowPoll />} />
      </Routes>
    </BrowserRouter>
    // <LandingPage />
  );
}

export default App;
