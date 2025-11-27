import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div style={{ display: "flex", gap: "20px", alignItems: "center", flex: 1 }}>
        <Link to="/" style={{ 
          fontSize: "18px",
          fontWeight: "700",
          background: "linear-gradient(135deg, #00d9ff, #ffbe0b)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textDecoration: "none"
        }}>
          📋 TaskFlow
        </Link>
        
        <div style={{ display: "flex", gap: "16px" }}>
          {!user && <>
            <Link to="/register" style={{ color: "#00d9ff", textDecoration: "none", fontWeight: "600", transition: "0.3s" }}>Register</Link>
            <Link to="/login" style={{ color: "#ffbe0b", textDecoration: "none", fontWeight: "600", transition: "0.3s" }}>Login</Link>
          </>}
          {user && <>
            <Link to="/dashboard" style={{ color: "#00d9ff", textDecoration: "none", fontWeight: "600", transition: "0.3s" }}>Dashboard</Link>
            <Link to="/tasks" style={{ color: "#ffbe0b", textDecoration: "none", fontWeight: "600", transition: "0.3s" }}>Tasks</Link>

            {user.role === "admin" && (
              <Link to="/admin" style={{ color: "#ff006e", textDecoration: "none", fontWeight: "600", transition: "0.3s" }}>👑 Admin</Link>
            )}
          </>}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {user && (
          <>
            <span style={{ color: "#00d9ff", fontWeight: "600", fontSize: "14px" }}>
              {user.name}
            </span>
            <button onClick={logout} style={{ 
              background: "linear-gradient(135deg, #ff006e, #ff3860)",
              border: "none",
              padding: "8px 14px",
              color: "#fff",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "700",
              transition: "0.3s",
              boxShadow: "0 4px 15px rgba(255, 0, 110, 0.3)"
            }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
