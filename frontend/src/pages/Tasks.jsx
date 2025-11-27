import { useEffect, useState } from "react";
import API from "../services/api";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmModal from "../components/ConfirmModal";
import { toast } from "react-toastify";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const loadTasks = () => {
    setLoading(true);
    API.get("/api/tasks")
      .then(res => setTasks(res.data.data))
      .catch(err => toast.error(err.message || "Failed to load tasks"))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadTasks(); }, []);

  const resetForm = () => setForm({ title: "", description: "" });

  const createTask = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error("Title required");
    try {
      setSaving(true);
      const res = await API.post("/api/tasks", form);
      // optimistic add
      setTasks(prev => [res.data.data, ...prev]);
      resetForm();
      toast.success("Task created");
    } catch (err) {
      toast.error(err.message || "Failed to create task");
    } finally {
      setSaving(false);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.error("Title required");
    try {
      setSaving(true);
      await API.put(`/api/tasks/${editingId}`, form);
      toast.success("Task updated");
      setEditingId(null);
      resetForm();
      loadTasks();
    } catch (err) {
      toast.error(err.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id) => {
    setDeletingId(id);
    setConfirmOpen(true);
  };

  const doDelete = async () => {
    setConfirmOpen(false);
    if (!deletingId) return;
    try {
      await API.delete(`/api/tasks/${deletingId}`);
      setTasks(prev => prev.filter(t => t._id !== deletingId));
      toast.success("Task deleted");
    } catch (err) {
      toast.error(err.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const markComplete = async (id) => {
    try {
      await API.patch(`/api/tasks/${id}/complete`);
      setTasks(prev => prev.map(t => t._id === id ? {...t, completed: true} : t));
      toast.success("Marked completed");
    } catch (err) {
      toast.error(err.message || "Failed to mark complete");
    }
  };

  const startEdit = (task) => {
    setEditingId(task._id);
    setForm({ title: task.title, description: task.description });
    window.scrollTo({ top:0, behavior:'smooth' });
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Tasks</h2>

        {/* Create/Update */}
        <form onSubmit={editingId ? updateTask : createTask}>
          <input className="input" placeholder="Title" value={form.title}
                 onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="input" placeholder="Description" value={form.description}
                 onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn" type="submit" disabled={saving}>
              {saving ? "Saving..." : editingId ? "Update Task" : "Add Task"}
            </button>
            {editingId && <button className="btn" type="button" onClick={() => { setEditingId(null); resetForm(); }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="card">
        <h3>Your tasks</h3>
        {loading ? <LoadingSpinner /> : (
          tasks.length === 0 ? <p className="small-muted">No tasks yet — create one above</p> :
          <ul style={{ listStyle:'none', padding:0 }}>
            {tasks.map(task => (
              <li key={task._id} className="task-item" style={{ marginBottom:8 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <strong style={{ textDecoration: task.completed ? 'line-through':'' }}>{task.title}</strong>
                    <span className="small-muted">{task.createdAt ? new Date(task.createdAt).toLocaleString() : ''}</span>
                  </div>
                  <div className="small-muted">{task.description}</div>
                </div>

                <div style={{ display:'flex', gap:8 }}>
                  {!task.completed && <button className="btn" onClick={() => markComplete(task._id)}>Complete</button>}
                  <button className="btn" onClick={() => startEdit(task)}>Edit</button>
                  <button className="btn" style={{ background:'#ef4444', color:'#fff' }} onClick={() => confirmDelete(task._id)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ConfirmModal open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={doDelete} />
    </div>
  );
}
