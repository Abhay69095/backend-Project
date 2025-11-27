import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout, isNewVisitor, closeRegistrationModal } = useContext(AuthContext);

  const handleResetModal = () => {
    localStorage.removeItem("hasVisited");
    closeRegistrationModal();
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  return (
    <nav className="navbar">
      <div style={{ display: "flex", gap: "20px", alignItems: "center", flex: 1 }}>
        <Link to="/" style={{ 
          fontSize: "18px",
          fontWeight: "700",
          color: "#ffffff",
          textDecoration: "none"
        }}>
          📋 TaskFlow
        </Link>
        
        <div style={{ display: "flex", gap: "16px" }}>
          {!user && <>
            <Link to="/register" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", transition: "0.3s", opacity: 0.9 }}>Register</Link>
            <Link to="/login" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", transition: "0.3s", opacity: 0.9 }}>Login</Link>
          </>}
          {user && <>
            <Link to="/dashboard" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", transition: "0.3s", opacity: 0.9 }}>Dashboard</Link>
            <Link to="/tasks" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", transition: "0.3s", opacity: 0.9 }}>Tasks</Link>

            {user.role === "admin" && (
              <Link to="/admin" style={{ color: "#ffffff", textDecoration: "none", fontWeight: "600", transition: "0.3s", opacity: 0.9 }}>👑 Admin</Link>
            )}
          </>}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {!user && (
          <button onClick={handleResetModal} style={{ 
            background: "rgba(255, 255, 255, 0.2)",
            border: "1px solid rgba(255, 255, 255, 0.4)",
            padding: "8px 12px",
            color: "#fff",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "0.3s",
            fontSize: "12px"
          }} title="Reset modal for testing">
            Test Modal
          </button>
        )}
        {user && (
          <>
            <span style={{ color: "#ffffff", fontWeight: "600", fontSize: "14px" }}>
              {user.name}
            </span>
            <button onClick={logout} style={{ 
              background: "#ff6600",
              border: "none",
              padding: "8px 14px",
              color: "#fff",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "0.3s",
              boxShadow: "0 2px 8px rgba(255, 102, 0, 0.2)"
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
