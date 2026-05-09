import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get multiple selected services
  const services = location.state?.services || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Calculate total price
  const totalPrice = services.reduce(
    (total, item) => total + item.price,
    0
  );

  const handlePay = () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Fill all details");
      return;
    }

    if (!paymentMethod) {
      alert("Select payment method");
      return;
    }

    const order = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      address: form.address,

      // ✅ Store all selected services
      services: services,

      total: totalPrice,
      paymentMethod,
      status: "Pending",
      date: new Date().toLocaleString(),
    };

    axios
      .post("http://localhost:5000/orders", order)
      .then(() => {
        alert("Payment Successful 🎉");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <h2>Payment Page</h2>

      {/* ✅ Show all selected services */}
      <div
        style={{
          border: "1px solid #ddd",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h4>Selected Services</h4>

        {services.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "8px",
            }}
          >
            <div>
              {item.icon} {item.name}
            </div>

            <div>₹{item.price}</div>
          </div>
        ))}

        <h3>Total: ₹{totalPrice}</h3>
      </div>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        name="phone"
        placeholder="Phone"
        onChange={handleChange}
        className="form-control mb-2"
      />

      <textarea
        name="address"
        placeholder="Address"
        onChange={handleChange}
        className="form-control mb-2"
      />

      <h5>Payment Method</h5>

      <label>
        <input
          type="radio"
          value="COD"
          checked={paymentMethod === "COD"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />{" "}
        Cash on Delivery
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="UPI"
          checked={paymentMethod === "UPI"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />{" "}
        UPI
      </label>

      <br />

      <label>
        <input
          type="radio"
          value="NetBanking"
          checked={paymentMethod === "NetBanking"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />{" "}
        Net Banking
      </label>

      <br />

      <button
        className="btn btn-success mt-3"
        onClick={handlePay}
      >
        Pay ₹{totalPrice}
      </button>
    </div>
  );
}

export default Payment;