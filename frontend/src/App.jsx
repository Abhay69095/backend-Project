import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext, AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import RegistrationModal from "./components/RegistrationModal";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Tasks from "./pages/Tasks";

function AppContent() {
  const { isNewVisitor, closeRegistrationModal } = useContext(AuthContext);

  return (
    <>
      <RegistrationModal isOpen={isNewVisitor} onClose={closeRegistrationModal} />
      <Navbar />
      <Routes>
        <Route path="/" element={<h2>Welcome — Test Backend API</h2>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
