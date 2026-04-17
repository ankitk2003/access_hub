import { Link, useNavigate } from "react-router-dom";

const getUser = () => {
  const role = localStorage.getItem("role");
  return role ? JSON.parse(role) : null;
};

export default function Navbar() {
  const navigate = useNavigate();
  const role = getUser();

  const logout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="p-4 bg-gray-900 text-white flex justify-between">
      <Link to="/">Home</Link>

      <div className="flex gap-4">
        {/* {role && <Link to="/profile">Profile</Link>} */}

        {role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}

        { role === "manager" && (
          <Link to="/manager">Manager</Link>
        )}

        {!role ? (
          <Link to="/login">Login</Link>
        ) : (
          <button onClick={logout}>Logout</button>
        )}
      </div>
    </nav>
  );
}
