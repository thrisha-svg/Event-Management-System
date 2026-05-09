import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  const name = location.state?.name;
  const event = location.state?.event;

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">

      <div className="card shadow-lg border-0 p-4 text-center" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>

        {/* Success Icon */}
        <div className="display-1 text-success mb-2">
          ✔
        </div>

        <h3 className="fw-bold text-success">
          Booking Confirmed!
        </h3>

        <p className="text-muted mb-3">
          Thank you, <strong>{name}</strong> 🙌
        </p>

        {/* Event Details */}
        <div className="alert alert-success text-start">
          <p className="mb-1"><b>Event:</b> {event?.name}</p>
          <p className="mb-1"><b>Date:</b> {event?.date}</p>
          <p className="mb-1"><b>Location:</b> {event?.location}</p>
          <p className="mb-0"><b>Status:</b> Confirmed ✅</p>
        </div>

        <p className="text-muted">
          Your seat has been reserved successfully. 🎉
        </p>

        {/* Buttons */}
        <div className="d-grid gap-2">

          <button
            onClick={() => navigate("/events")}
            className="btn btn-primary fw-bold"
          >
            Book More Events
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-outline-secondary"
          >
            Go to Dashboard
          </button>

        </div>

      </div>

    </div>
  );
}

export default Success;