import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [password, setPassword] =
    useState("");

  const navigate = useNavigate();

  // =========================
  // REGISTER FUNCTION
  // =========================
  const handleRegister =
    async (e) => {

      e.preventDefault();

      try {

        const res =
          await axios.post(

            "http://localhost:5000/register",

            {
              name,
              email,
              phone,
              address,
              password,
            }

          );

        alert(res.data.message);

        navigate("/");

      } catch (err) {

        console.log(err);

        alert("Register Failed ❌");

      }
    };

  return (

    <div className="register-page">

      <div className="register-card">

        <h2>
          Create Account
        </h2>

        <p className="subtitle">
          Register for EventHub
        </p>

        <form
          onSubmit={handleRegister}
        >

          {/* NAME */}
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          {/* PHONE */}
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            required
          />

          {/* ADDRESS */}
          <textarea
            placeholder="Enter Address"
            value={address}
            onChange={(e) =>
              setAddress(e.target.value)
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* BUTTON */}
          <button type="submit">

            Register

          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;