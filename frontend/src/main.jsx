import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import { AuthProvider, useAuth } from './context/AuthContext'
import Login from './pages/Login'
import FamilyMembers from './pages/FamilyMembers'
import Medicines from './pages/Medicines'

function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/family" element={<ProtectedRoute><FamilyMembers /></ProtectedRoute>} />
      <Route path="/medicines" element={<ProtectedRoute><Medicines /></ProtectedRoute>} />
      <Route path="/" element={<Navigate to="/login" />} />
    </Routes>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
