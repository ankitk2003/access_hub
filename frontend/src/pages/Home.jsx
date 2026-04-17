import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to AccessHub 🚀
        </h1>
        <p className="text-gray-600 mb-6">
          A role-based access management system where Admins, Managers, and Users 
          have different permissions and dashboards.
        </p>

        {/* CTA Buttons */}
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>

          <Link
            to="/profile"
            className="border border-gray-400 px-6 py-2 rounded-lg hover:bg-gray-200 transition"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl w-full">
        
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Admin Control</h3>
          <p className="text-gray-600 text-sm">
            Full access to manage users, roles, and permissions across the system.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">Manager Access</h3>
          <p className="text-gray-600 text-sm">
            Manage and update non-admin users with restricted permissions.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-semibold text-lg mb-2">User Profile</h3>
          <p className="text-gray-600 text-sm">
            Users can view and update their own profile securely.
          </p>
        </div>

      </div>
    </div>
  );
}

export default Home;