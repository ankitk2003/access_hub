import React, { useEffect, useState } from "react";
import { getMyProfile, updateMyProfile } from "../apiservices/userApiservices";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  // 🔥 Fetch Profile
  const fetchProfile = async () => {
    try {
      const data = await getMyProfile();
      setProfile(data.user);

      setForm({
        username: data.user.username,
        email: data.user.email,
        password: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // 🔥 Handle Input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateMyProfile(form);
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      alert(err.message);
    }
  };

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h1 className="text-2xl font-bold mb-4">My Profile</h1>

        {!editMode ? (
          <>
            <p className="mb-2">
              <strong>Username:</strong> {profile.username}
            </p>

            <p className="mb-2">
              <strong>Email:</strong> {profile.email}
            </p>

            <p className="mb-4">
              <strong>Role:</strong> {profile.role}
            </p>

            <button
              onClick={() => setEditMode(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded w-full"
            >
              Edit Profile
            </button>
          </>
        ) : (
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

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="w-full bg-gray-300 py-2 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded"
              >
                Update
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;