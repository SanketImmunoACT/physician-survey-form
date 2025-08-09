import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import FormPage from './pages/FormPage.jsx';
import SalespersonDashboard from './pages/SalespersonDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AnalyticsPage from './pages/AnalyticsPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
import TestGuidelinesPage from './pages/TestGuidelinesPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/salesperson" element={<SalespersonDashboard />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/test-guidelines" element={<TestGuidelinesPage />} />
    </Routes>
  </Router>
);
