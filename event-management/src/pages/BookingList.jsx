import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import "./BookingList.css";

function BookingList() {

  const [bookings, setBookings] = useState([]);

  // =========================
  // GET BOOKINGS FROM BACKEND
  // =========================

  useEffect(() => {

    axios
      .get("http://localhost:5000/bookings")

      .then((res) => {

        setBookings(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);


  // =========================
  // DELETE BOOKING
  // =========================

  const deleteBooking = async (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure to cancel booking?"
      );

    if (!confirmDelete) return;

    try {

      await axios.delete(
        `http://localhost:5000/bookings/${id}`
      );

      const updatedBookings =
        bookings.filter(
          (b) => b._id !== id
        );

      setBookings(updatedBookings);

      alert("Booking Cancelled");

    } catch (err) {

      console.log(err);

    }
  };


  return (

    <div className="dashboard">

      <Sidebar />

      <div className="main">

        <h1>Booking List</h1>

        {bookings.length === 0 ? (

          <p>No bookings yet</p>

        ) : (

          <div className="booking-container">

            {bookings.map((b) => (

              <div
                className="booking-card"
                key={b._id}
              >

                <img
                  src={b.image}
                  alt={b.eventName}
                />

                <h3>{b.eventName}</h3>

                <p>
                  Date: {b.eventDate}
                </p>

                <p>
                  Location: {b.location}
                </p>

                <p>
                  <strong>
                    Booked By:
                  </strong>{" "}
                  {b.user}
                </p>

                <p>
                  <strong>
                    Status:
                  </strong>{" "}
                  {b.status}
                </p>

                {/* DELETE BUTTON */}

                <button
                  onClick={() =>
                    deleteBooking(b._id)
                  }
                >
                  Cancel Booking
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default BookingList;