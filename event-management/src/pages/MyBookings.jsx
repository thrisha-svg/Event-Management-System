import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  useEffect(() => {
    const allBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    // filter only logged-in user's bookings
    const userBookings = allBookings.filter(
      (b) => b.email === email
    );

    setBookings(userBookings);
  }, [email]);

  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh" }}
    >
      <h2 className="text-center mb-4 text-primary fw-bold">
        🎟 My Bookings
      </h2>

      {bookings.length === 0 ? (
        <div className="text-center">
          <p>No bookings found 😔</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/events")}
          >
            Browse Events
          </button>
        </div>
      ) : (
        <div className="row">
          {bookings.map((b, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <div className="card shadow p-3">
                <h5>{b.eventName}</h5>
                <p className="text-muted mb-1">
                  Name: {b.name}
                </p>
                <p className="text-muted mb-1">
                  Date: {b.date}
                </p>
                <p className="text-muted">
                  Email: {b.email}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyBookings;