import React, { useEffect, useState } from "react";
import {
  createUser,
  getAllUsers,
  updateUser,
  updateUserStatus,
  deleteUser
} from "../apiservices/adminApiservice";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState(null);

  // 🔥 Fetch Users
  const fetchUsers = async () => {
    try {
      const data = await getAllUsers(search);
      setUsers(data.users || []);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  // 🔥 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Create / Update User
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingUser) {
        const { password, ...updateData } = form; // ❗ exclude password
        await updateUser(editingUser._id, updateData);
        setEditingUser(null);
      } else {
        console.log("Submitting form with data:", form); // Debug log
        await createUser(form);
      }

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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");

    if (!confirmDelete) return;

    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      username: user.username,
      email: user.email,
      password: "", // ❗ never prefill password
      role: user.role,
    });
  };

  // 🔥 Toggle Status
  const handleStatus = async (id, currentStatus) => {
    try {
      await updateUserStatus(
        id,
        currentStatus === "active" ? "inactive" : "active",
      );
      fetchUsers();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <input
        type="text"
        placeholder="Search users..."
        className="w-full p-2 border rounded mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        <h2 className="text-xl mb-3">
          {editingUser ? "Update User" : "Create User"}
        </h2>

        <div className="grid grid-cols-4 gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="p-2 border rounded"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder={
              editingUser ? "Leave blank to keep same password" : "Password"
            }
            className="p-2 border rounded"
            value={form.password}
            onChange={handleChange}
            required={!editingUser}
          />

          <select
            name="role"
            className="p-2 border rounded"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {editingUser ? "Update" : "Create"}
        </button>
      </form>

      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                <td className="p-3">{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>

                <td>
                  <span
                    className={`px-2 py-1 rounded text-white ${
                      user.status === "active" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-yellow-400 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleStatus(user._id, user.status)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-black text-white px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={user.role === "admin"}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
