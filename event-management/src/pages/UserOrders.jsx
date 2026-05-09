import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./UserOrders.css";

function UserOrders() {

  const [orders, setOrders] =
    useState([]);

  const [filter, setFilter] =
    useState("All");


  // =========================
  // FETCH ORDERS
  // =========================

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/orders"
      );

      setOrders(res.data);

    }

    catch (error) {

      console.log(error);

    }

  };


  // =========================
  // LOAD DATA
  // =========================

  useEffect(() => {

    fetchOrders();

  }, []);


  // =========================
  // ACCEPT ORDER
  // =========================

  const handleAccept = async (id) => {

    try {

      await axios.put(

        `http://localhost:5000/orders/${id}`,

        {
          status: "Accepted"
        }

      );

      fetchOrders();

    }

    catch (error) {

      console.log(error);

    }

  };


  // =========================
  // DELETE ORDER
  // =========================

  const handleDelete = async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/orders/${id}`

      );

      fetchOrders();

    }

    catch (error) {

      console.log(error);

    }

  };


  // =========================
  // FILTER ORDERS
  // =========================

  let filteredOrders = orders;

  if (filter === "Pending") {

    filteredOrders = orders.filter(

      (o) => o.status === "Pending"

    );

  }

  if (filter === "Accepted") {

    filteredOrders = orders.filter(

      (o) => o.status === "Accepted"

    );

  }


  return (

    <div className="orders-container">

      <h2 className="orders-title">
        📦 User Orders
      </h2>


      {/* FILTER BUTTONS */}

      <div className="filter-buttons">

        <button
          onClick={() =>
            setFilter("All")
          }
        >
          All Orders
        </button>

        <button
          onClick={() =>
            setFilter("Pending")
          }
        >
          Pending Orders
        </button>

        <button
          onClick={() =>
            setFilter("Accepted")
          }
        >
          Accepted Orders
        </button>

      </div>


      {/* SHOW ORDERS */}

      {filteredOrders.length === 0 ? (

        <h3>No Orders Found</h3>

      ) : (

        <div className="orders-list">

          {filteredOrders.map((o) => (

            <div
              className="order-card"
              key={o._id}
            >

              <p>
                <strong>Name:</strong>
                {" "}
                {o.name}
              </p>

              <p>
                <strong>Phone:</strong>
                {" "}
                {o.phone}
              </p>

              <p>
                <strong>Address:</strong>
                {" "}
                {o.address}
              </p>

              <p>
                <strong>Total:</strong>
                {" "}
                ₹{o.total}
              </p>

              <p>
                <strong>Payment:</strong>
                {" "}
                {o.paymentMethod}
              </p>

              <p>
                <strong>Status:</strong>
                {" "}
                {o.status}
              </p>

              <p>
                <strong>Date:</strong>
                {" "}
                {o.date}
              </p>


              <div className="order-buttons">

                {/* ACCEPT BUTTON */}

                {o.status === "Pending" && (

                  <button
                    className="accept-btn"
                    onClick={() =>
                      handleAccept(o._id)
                    }
                  >
                    ✅ Accept
                  </button>

                )}


                {/* DELETE BUTTON */}

                <button
                  className="reject-btn"
                  onClick={() =>
                    handleDelete(o._id)
                  }
                >
                  ❌ Delete
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default UserOrders;