import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EventDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const event = location.state?.event;

  return (
    <div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center bg-light p-3">

      <div className="card shadow-lg border-0" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>

        {/* Event Image */}
        <img
          src={event?.img}
          alt={event?.name}
          className="card-img-top"
          style={{ height: "250px", objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
        />

        {/* Card Content */}
        <div className="card-body text-center">

          <h3 className="fw-bold text-primary mb-3">
            {event?.name}
          </h3>

          <p className="mb-2">
            <span className="fw-bold">Date:</span> {event?.date}
          </p>

          <p className="mb-2">
            <span className="fw-bold">Event:</span> {event?.name}
          </p>

          <p className="mb-3">
            <span className="fw-bold">Location:</span> {event?.location}
          </p>

          {/* Buttons */}
          <div className="d-grid gap-2">

            <button
              onClick={() => navigate("/booking", { state: { event } })}
              className="btn btn-success fw-bold"
            >
              Book Now 🎟️
            </button>

            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline-secondary"
            >
              Back
            </button>

          </div>

        </div>
      </div>

    </div>
  );
}

export default EventDetails;