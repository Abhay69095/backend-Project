import API from "../services/api";
import { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("/api/profile")
      .then(res => setProfile(res.data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h2>👤 User Dashboard</h2>
        {loading ? <LoadingSpinner /> : (
          profile ? (
            <div style={{ 
              padding: "20px",
              background: "linear-gradient(135deg, rgba(0, 217, 255, 0.1), rgba(255, 190, 11, 0.05))",
              borderRadius: "12px",
              border: "1px solid rgba(0, 217, 255, 0.2)"
            }}>
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", color: "#b0bec5", margin: "0 0 4px 0" }}>Full Name</p>
                <p style={{ 
                  fontSize: "20px", 
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #00d9ff, #ffbe0b)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  margin: "0"
                }}>
                  {profile.name}
                </p>
              </div>
              
              <div style={{ marginBottom: "16px" }}>
                <p style={{ fontSize: "14px", color: "#b0bec5", margin: "0 0 4px 0" }}>Email Address</p>
                <p style={{ fontSize: "16px", color: "#e6eef8", margin: "0" }}>{profile.email}</p>
              </div>
              
              <div>
                <p style={{ fontSize: "14px", color: "#b0bec5", margin: "0 0 4px 0" }}>User Role</p>
                <span style={{ 
                  display: "inline-block",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  background: profile.role === "admin" 
                    ? "linear-gradient(135deg, #ff006e, #ff3860)" 
                    : "linear-gradient(135deg, #00d9ff, #00b8d4)",
                  color: "#fff",
                  fontWeight: "700",
                  fontSize: "12px",
                  textTransform: "uppercase"
                }}>
                  {profile.role === "admin" ? "👑 " : "👤 "} {profile.role}
                </span>
              </div>
            </div>
          ) : <p>Unable to load profile</p>
        )}
      </div>
    </div>
  );
}
