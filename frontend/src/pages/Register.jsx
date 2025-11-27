import { useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

export default function Register() {
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
    } catch (err) {
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Register</h2>
        <form onSubmit={submit}>
          <input className="input" placeholder="Name" value={form.name}
                 onChange={(e) => setForm({...form, name: e.target.value})} />
          <input className="input" placeholder="Email" value={form.email}
                 onChange={(e) => setForm({...form, email: e.target.value})} />
          <input className="input" placeholder="Password" type="password" value={form.password}
                 onChange={(e) => setForm({...form, password: e.target.value})} />
          <button className="btn" type="submit" disabled={loading}>
            {loading ? "Working..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
