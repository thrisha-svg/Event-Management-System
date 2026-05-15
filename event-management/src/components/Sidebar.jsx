import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#2c3e50",
        color: "white",
        padding: "20px",
      }}
    >
      <h3>Admin Panel</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li className="mb-3">
          <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>
            📊 Dashboard
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/events" style={{ color: "white", textDecoration: "none" }}>
            🎉 Events
          </Link>
        </li>

        <li className="mb-3">
          <Link to="/user-orders" style={{ color: "white", textDecoration: "none" }}>
            📦 User Orders
          </Link>
        </li>
          <li className="mb-3">
          <Link to="/user-list" style={{ color: "white", textDecoration: "none" }}>
            📦 User List
          </Link>
        </li>

        {/* ✅ Logout placed here */}
        <li className="mb-3">
          <span
            onClick={handleLogout}
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            🚪 Logout
          </span>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;