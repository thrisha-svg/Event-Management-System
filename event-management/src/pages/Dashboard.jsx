import React, { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Footer from "../components/Footer";

import categories from "../data/categories";

import axios from "axios";

function Dashboard() {

  // =========================
  // EVENTS FROM LOCAL DATA
  // =========================

  const [events] = useState(categories.length);

  // =========================
  // BOOKINGS & USERS
  // =========================

  const [bookings, setBookings] = useState(0);

  const [users, setUsers] = useState(0);


  useEffect(() => {

    // =========================
    // BOOKINGS COUNT
    // =========================

    axios
      .get("http://localhost:5000/orders")

      .then((res) => {

        setBookings(res.data.length);

      })

      .catch((err) => {

        console.log("Bookings Error:", err);

      });


    // =========================
    // USERS COUNT
    // =========================

    axios
      .get("http://localhost:5000/users")

      .then((res) => {

        setUsers(res.data.length);

      })

      .catch((err) => {

        console.log("Users Error:", err);

      });

  }, []);


  return (

    <>

      <Header />

      <div className="container-fluid">

        <div className="row">

          {/* SIDEBAR */}

          <div
            className="
              col-md-2
              bg-dark
              text-white
              min-vh-100
              p-3
            "
          >

            <Sidebar />

          </div>


          {/* MAIN CONTENT */}

          <div className="col-md-10 p-4">

            <h2
              className="
                mb-4
                fw-bold
                text-primary
              "
            >
              Dashboard
            </h2>


            <div className="row g-4">


              {/* EVENTS */}

              <div className="col-md-4">

                <div
                  className="
                    card
                    shadow
                    border-0
                    text-center
                    p-4
                  "
                >

                  <h5 className="text-muted">
                    Total Events
                  </h5>

                  <h2
                    className="
                      fw-bold
                      text-primary
                    "
                  >
                    {events}
                  </h2>

                </div>

              </div>


              {/* BOOKINGS */}

              <div className="col-md-4">

                <div
                  className="
                    card
                    shadow
                    border-0
                    text-center
                    p-4
                  "
                >

                  <h5 className="text-muted">
                    Total Bookings
                  </h5>

                  <h2
                    className="
                      fw-bold
                      text-success
                    "
                  >
                    {bookings}
                  </h2>

                </div>

              </div>


              {/* USERS */}

              <div className="col-md-4">

                <div
                  className="
                    card
                    shadow
                    border-0
                    text-center
                    p-4
                  "
                >

                  <h5 className="text-muted">
                    Total Users
                  </h5>

                  <h2
                    className="
                      fw-bold
                      text-danger
                    "
                  >
                    {users}
                  </h2>

                </div>

              </div>


            </div>

          </div>

        </div>

      </div>

      <Footer />

    </>

  );

}

export default Dashboard;