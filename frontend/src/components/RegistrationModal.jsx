import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import "../styles/registrationModal.css";

export default function RegistrationModal({ isOpen, onClose }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || form.password.length < 6) {
      toast.error("Please fill form correctly (password min 6 chars)");
      return;
    }
    try {
      setLoading(true);
      await API.post("/api/auth/register", form);
      toast.success("Registered — you can login now");
      setForm({ name: "", email: "", password: "" });
      onClose();
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Welcome! Create Your Account</h2>
        <p className="modal-subtitle">Join us to manage your tasks effectively</p>
        
        <form onSubmit={submit}>
          <input 
            className="input" 
            placeholder="Full Name" 
            value={form.name}
            onChange={(e) => setForm({...form, name: e.target.value})} 
            required
          />
          <input 
            className="input" 
            placeholder="Email Address" 
            type="email"
            value={form.email}
            onChange={(e) => setForm({...form, email: e.target.value})} 
            required
          />
          <input 
            className="input" 
            placeholder="Password (min 6 chars)" 
            type="password" 
            value={form.password}
            onChange={(e) => setForm({...form, password: e.target.value})} 
            required
          />
          <button className="btn btn-register" type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <div className="modal-footer">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
}
