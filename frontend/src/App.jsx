import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./components/AdminDashboard";
import ManagerDashboard from "./components/ManagerDashboard";
import Profile from "./components/Profile";
// utils
const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children, roles }) => {
  const user = getUser();

  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Layout Wrapper using Outlet */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />

          <Route
            path="admin"
            element={
             
                <AdminDashboard />
             
            }
          />

          <Route
            path="manager"
            element={
              
                <ManagerDashboard />
              
            }
          />

          <Route
            path="profile"
            element={
           
                <Profile />
             
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
