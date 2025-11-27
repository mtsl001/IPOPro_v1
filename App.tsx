
import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { AnalysisDetail } from './pages/AnalysisDetail';
import { CalendarPage } from './pages/Calendar';
import { PerformancePage } from './pages/Performance';
import { PremiumTools } from './pages/PremiumTools';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/Auth';

// Wrapper for Protected Routes
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
  
  if (!user) return <Navigate to="/login" replace />;
  
  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />

          {/* Protected Routes - All prefixed with /app */}
          <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/app/analysis/:id" element={<ProtectedRoute><AnalysisDetail /></ProtectedRoute>} />
          
          {/* Calendar Route */}
          <Route path="/app/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
          
          {/* Performance Route */}
          <Route path="/app/performance" element={<ProtectedRoute><PerformancePage /></ProtectedRoute>} />
          
          {/* Analysis Index Redirect */}
          <Route path="/app/analysis" element={<Navigate to="/app" replace />} />
          
          {/* Premium Tools */}
          <Route path="/app/premium" element={<ProtectedRoute><PremiumTools /></ProtectedRoute>} />
          
          {/* Fallback for legacy routes or 404s */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
