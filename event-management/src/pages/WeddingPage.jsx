import React from "react";
import wedding from "../data/wedding";
import "./Wedding.css";

const WeddingPage = () => {

  const totalPrice = wedding.services.reduce(
    (sum, service) => sum + service.price,
    0
  );

  const handlePayment = () => {
    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // 🔴 replace with your key
      amount: totalPrice * 100, // in paise
      currency: "INR",
      name: "Wedding Services",
      description: "Booking Payment",
      image: wedding.image,
      handler: function (response) {
        alert("✅ Payment Successful\nPayment ID: " + response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "test@gmail.com",
        contact: "9999999999"
      },
      theme: {
        color: "#ff4d6d"
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="container">
      <h1>{wedding.icon} {wedding.name}</h1>
      <p>{wedding.desc}</p>

      <div className="services">
        {wedding.services.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.name} />
            <h3>{item.icon} {item.name}</h3>
            <p>{item.desc}</p>
            <h4>₹{item.price}</h4>
          </div>
        ))}
      </div>

      <h2>Total: ₹{totalPrice}</h2>

      <button className="pay-btn" onClick={handlePayment}>
        Pay Now 💳
      </button>
    </div>
  );
};

export default WeddingPage;