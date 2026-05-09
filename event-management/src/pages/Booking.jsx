import React, { useState } from "react";

function Booking() {

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");

  const [total, setTotal] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("");

  // =========================
  // BOOK ORDER
  // =========================

  const handleBooking = () => {

    const newOrder = {

      id: Date.now(),

      name: name,

      phone: phone,

      address: address,

      total: total,

      paymentMethod: paymentMethod,

      date: new Date().toLocaleDateString(),

      // IMPORTANT

      status: "Pending"

    };

    // GET OLD ORDERS

    const oldOrders = JSON.parse(

      localStorage.getItem("orders")

    ) || [];

    // ADD NEW ORDER

    const updatedOrders = [

      ...oldOrders,

      newOrder

    ];

    // SAVE

    localStorage.setItem(

      "orders",

      JSON.stringify(updatedOrders)

    );

    alert("Booking Successful");

    // CLEAR INPUTS

    setName("");

    setPhone("");

    setAddress("");

    setTotal("");

    setPaymentMethod("");

  };

  return (

    <div style={{ padding: "20px" }}>

      <h2>Book Order</h2>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) =>
          setPhone(e.target.value)
        }
      />

      <br /><br />

      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
      />

      <br /><br />

      <input
        type="number"
        placeholder="Total"
        value={total}
        onChange={(e) =>
          setTotal(e.target.value)
        }
      />

      <br /><br />

      <select
        value={paymentMethod}
        onChange={(e) =>
          setPaymentMethod(e.target.value)
        }
      >

        <option value="">
          Select Payment
        </option>

        <option value="Cash">
          Cash
        </option>

        <option value="UPI">
          UPI
        </option>

      </select>

      <br /><br />

      <button onClick={handleBooking}>

        Book Now

      </button>

    </div>
  );
}

export default Booking;