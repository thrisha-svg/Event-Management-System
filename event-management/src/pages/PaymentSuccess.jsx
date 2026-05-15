import React from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccess.css";

function PaymentSuccess() {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("bookingData");
    localStorage.removeItem("user");

    navigate("/");

  };

  return (

    <div className="success-container">

      <div className="success-card">

        {/* SUCCESS ICON */}
        <div className="success-icon">
          ✔
        </div>

        {/* TITLE */}
        <h1 className="success-title">
          Booking Confirmed
        </h1>

        {/* DESCRIPTION */}
        <p className="success-text">

          Your booking has been successfully placed.

          <br /><br />

          Thank you for choosing our event management service.

          <br />

          We look forward to making your special occasion memorable.

          <br /><br />

          Visit again for more amazing event services 🎉

        </p>

        {/* BUTTONS */}
        <div className="button-group">

          <button
            className="home-btn"
            onClick={() => navigate("/")}
          >
            Back To Home
          </button>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );
}

export default PaymentSuccess;