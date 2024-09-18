import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./features/ProtectedRoutes";
import { AuthProvider } from "./features/auth-context/auth-context";
import App from "./App";
import LandingPage from "./pages/LandingPage";
import SignInCard from "./features/auth/sign-in-card";
import SignUpCard from "./features/auth/sign-up-card";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AuthProvider>
    <Router>
      <Routes>
        {/* Public routes for sign-in and sign-up */}
        <Route path="/signin" element={<SignInCard />} />
        <Route path="/signup" element={<SignUpCard />} />
        <Route path="/landingpage" element={<LandingPage />} />
        {/* Protected route for the main app */}
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <App />
            </ProtectedRoutes>
          }
        />

        {/* Fallback for undefined routes */}
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </Router>
  </AuthProvider>
  // </StrictMode>
);
