import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

const handleRegister = async (e) => {
  e.preventDefault();

  try {

    const res = await axios.post(
      "http://localhost:5000/register",
      {
        name,
        email,
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
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "380px" }}>
        <h3 className="text-center text-success">Register</h3>

        <form onSubmit={handleRegister}>
          <input
            className="form-control mb-2"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-success w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;