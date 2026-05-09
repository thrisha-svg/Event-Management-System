import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    // 👑 ADMIN LOGIN
    if (
      email === "admin@eventhub.com" &&
      password === "admin123"
    ) {

      localStorage.setItem("role", "admin");

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Admin",
          email: "admin@eventhub.com",
        })
      );

      alert("Admin Login Successful ✅");

      navigate("/dashboard");

      return;
    }

    // 👤 USER LOGIN FROM DATABASE
    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      // save logged user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      localStorage.setItem("role", "user");

      navigate("/home");

    } catch (err) {

      console.log("LOGIN ERROR:", err);

      if (err.response && err.response.data) {

        alert(err.response.data.message);

      } else {

        alert("Server Error ❌");

      }
    }
  };

  return (

    <div className="login-bg">

      {/* HEADER */}
      <div className="login-header">

        <h1>Event Management System</h1>

        <p>
          Plan • Manage • Celebrate Events Easily
        </p>

      </div>

      {/* LOGIN CARD */}
      <div className="login-wrapper">

        <div className="login-card">

          <h2>Login</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <button type="submit">
              Login
            </button>

          </form>

          <p style={{ marginTop: "15px" }}>
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;