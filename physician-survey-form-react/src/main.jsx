import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import FormPage from "./pages/FormPage.jsx";
import SalespersonDashboard from "./pages/SalespersonDashboard.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import TestGuidelinesPage from "./pages/TestGuidelinesPage.jsx";
import ZonalManager1Dashboard from "./pages/ZonalManager1Dashboard.jsx";
import ZonalManager2Dashboard from "./pages/ZonalManager2Dashboard.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/salesperson" element={<SalespersonDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/test-guidelines" element={<TestGuidelinesPage />} />
        <Route
          path="/zm1/dashboard"
          element={
            <ProtectedRoute roles={["ZONAL_MANAGER_1"]}>
              <ZonalManager1Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/zm2/dashboard"
          element={
            <ProtectedRoute roles={["ZONAL_MANAGER_2"]}>
              <ZonalManager2Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  </Router>
);
