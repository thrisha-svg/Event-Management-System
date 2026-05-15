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

    // ADMIN LOGIN
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

    // USER LOGIN
    try {

      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

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

    <div className="login-page">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          EventHub
        </div>

        <ul className="nav-links">
          <li>Home</li>
          <li>Services</li>
          <li>About</li>
          <li>Contact</li>
        </ul>

      </nav>

      {/* HERO SECTION */}
      <div className="hero-section">

        <div className="overlay"></div>

        {/* LEFT CONTENT */}
        <div className="hero-content">

          <h1>
             Event Management System
          </h1>

          <p>
            Plan Weddings, Birthdays,
            Corporate Events and Celebrations Easily
          </p>

          {/* EXPLORE BUTTON */}
          <button
            className="explore-btn"
            onClick={() => navigate("/home")}
          >
            Explore Events
          </button>

        </div>

        {/* LOGIN CARD */}
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

          <p className="register-text">
            Don't have an account?{" "}
            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

      {/* FOOTER */}
      <footer className="footer">

        <div className="footer-content">

          <h2>About EventHub</h2>

          <p>
            EventHub is a professional event
            management platform that helps users
            organize weddings, birthdays, corporate
            meetings, receptions and celebrations
            with easy booking and planning services.
          </p>

          <div className="footer-box">

            <div>
              <h3>Our Services</h3>

              <ul>
                <li>Wedding Planning</li>
                <li>Birthday Events</li>
                <li>Corporate Meetings</li>
                <li>Decoration Services</li>
              </ul>
            </div>

            <div>
              <h3>Contact</h3>

              <p>Email: eventhub@gmail.com</p>

              <p>Phone: +91 9876543210</p>

              <p>Bangalore, India</p>
            </div>

          </div>

          <p className="copyright">
            © 2026 EventHub. All Rights Reserved.
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Login;