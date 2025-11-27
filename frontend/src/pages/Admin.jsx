import API from "../services/api";
import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.get("/api/admin/users")
      .then(res => setUsers(res.data.data))
      .catch(() => setUsers([]));
  }, []);

  return (
    <div>
      <h2>Admin Panel — Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.name} — {u.email} — {u.role}
          </li>
        ))}
      </ul>
    </div>
  );
}
