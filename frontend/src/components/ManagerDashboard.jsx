import React, { useEffect, useState } from "react";
import {
  getManagerUsers,
  updateManagerUser,
} from "../apiservices/managerApiservice";

function ManagerDashboard() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  // 🔥 Fetch Users (NO SEARCH)
  const fetchUsers = async () => {
    try {
      const data = await getManagerUsers();
      setUsers(data.users || []);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // 🔥 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Edit User
  const handleEdit = (user) => {
    if (user.role !== "user") {
      alert("You can only edit users");
      return;
    }

    setEditingUser(user);
    setForm({
      username: user.username,
      email: user.email,
      password: "", // never prefill password
      role: user.role,
    });
  };

  // 🔥 Update User
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateManagerUser(editingUser._id, form);

      setEditingUser(null);
      setForm({
        username: "",
        email: "",
        password: "",
        role: "user",
      });

      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manager Dashboard</h1>

      {/* 📊 Users Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  {user.role === "user" ? (
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-400 px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  ) : (
                    <span className="text-gray-400">
                      Not Allowed
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Edit Modal */}
      {editingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow w-96">
            <h2 className="text-xl mb-4">Update User</h2>

            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full p-2 border rounded"
                value={form.username}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                type="password"
                name="password"
                placeholder="New Password (optional)"
                className="w-full p-2 border rounded"
                value={form.password}
                onChange={handleChange}
              />

              <select
                name="role"
                className="w-full p-2 border rounded"
                value={form.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                {/* ❌ still cannot assign admin/manager */}
              </select>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-3 py-1 bg-gray-300 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerDashboard;