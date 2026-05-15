import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {

  const navigate = useNavigate();

  // =========================
  // USER FORM
  // =========================

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [paymentMethod, setPaymentMethod] =
    useState("");

  // =========================
  // BANNER LANGUAGE
  // =========================

  const [bannerLanguage, setBannerLanguage] =
    useState("");

  const [bannerPrice, setBannerPrice] =
    useState(0);

  // =========================
  // BOOKING DATA
  // =========================

  const [bookingData, setBookingData] =
    useState(null);

  // =========================
  // LOAD LOCAL STORAGE
  // =========================

  useEffect(() => {

    const savedData =
      localStorage.getItem("bookingData");

    if (savedData) {

      const parsedData =
        JSON.parse(savedData);

      setBookingData(parsedData);
    }

  }, []);

  // =========================
  // SAFE VALUES
  // =========================

  const eventName =
    bookingData?.eventName ||
    "No Event Selected";

  const services =
    bookingData?.services || [];

  const servicesTotal =
    bookingData?.total || 0;

  // =========================
  // CHECK BANNER SERVICE
  // =========================

  const hasBannerService =
    services.find(
      (item) => item.name === "Banners"
    );

  // =========================
  // FINAL TOTAL
  // =========================

  const totalAmount =
    servicesTotal + bannerPrice;

  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  // =========================
  // BANNER LANGUAGE CHANGE
  // =========================

  const handleBannerChange = (e) => {

    const selectedLanguage =
      e.target.value;

    setBannerLanguage(selectedLanguage);

    if (selectedLanguage === "English") {

      setBannerPrice(5200);

    } else if (
      selectedLanguage === "Kannada"
    ) {

      setBannerPrice(4000);

    } else {

      setBannerPrice(0);

    }
  };

  // =========================
  // PAYMENT
  // =========================

  const handlePayment = async () => {

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !paymentMethod
    ) {

      alert("Please fill all fields");

      return;
    }

    const orderData = {

      id: Date.now(),

      name: form.name,

      phone: form.phone,

      address: form.address,

      paymentMethod,

      status: "Pending",

      date:
        new Date().toLocaleDateString(),

      // EVENT DETAILS

      eventName,

      services,

      // BANNER DETAILS

      bannerLanguage,

      bannerPrice,

      // FINAL TOTAL

      totalAmount

    };

    try {

      await axios.post(
        "http://localhost:5000/orders",
        orderData
      );

      alert("Booking Successful");

      localStorage.removeItem(
        "bookingData"
      );

      navigate("/success");

    } catch (error) {

      console.log(error);

      alert("Booking Failed");

    }
  };

  return (

    <div className="payment-page">

      <div className="payment-card">

        <h2>
          💳 Payment Page
        </h2>

        {/* =========================
            EVENT SUMMARY
        ========================= */}

        <div className="summary-box">

          <h3>
            Event:
            {" "}
            {eventName}
          </h3>

          <h4>
            Services Total:
            {" "}
            ₹{servicesTotal}
          </h4>

          {/* SELECTED SERVICES */}

          <h3>
            Selected Services
          </h3>

          {
            services.length > 0 ? (

              <ul>

                {services.map(
                  (service, index) => (

                    <li key={index}>

                      {service.name}
                      {" "}
                      -
                      {" "}
                      ₹{service.price}

                    </li>
                  )
                )}

              </ul>

            ) : (

              <p>
                No Services Selected
              </p>

            )
          }

          {/* =========================
              BANNER OPTIONS
          ========================= */}

          {hasBannerService && (

            <div
              style={{
                marginTop: "20px"
              }}
            >

              <h3>
                Select Banner Language
              </h3>

              <select
                value={bannerLanguage}

                onChange={
                  handleBannerChange
                }
              >

                <option value="">
                  Select Language
                </option>

                <option value="English">
                  English - ₹5200
                </option>

                <option value="Kannada">
                  Kannada - ₹4000
                </option>

              </select>

              {
                bannerLanguage && (

                  <h4
                    style={{
                      marginTop: "10px"
                    }}
                  >

                    Banner Price:
                    {" "}
                    ₹{bannerPrice}

                  </h4>
                )
              }

            </div>
          )}

          {/* FINAL TOTAL */}

          <h2
            style={{
              marginTop: "20px"
            }}
          >

            Final Total:
            {" "}
            ₹{totalAmount}

          </h2>

        </div>

        {/* =========================
            FORM
        ========================= */}

        <input
          type="text"

          name="name"

          placeholder="Enter Name"

          value={form.name}

          onChange={handleChange}
        />

        <input
          type="text"

          name="phone"

          placeholder="Enter Phone"

          value={form.phone}

          onChange={handleChange}
        />

        <textarea
          name="address"

          placeholder="Enter Address"

          value={form.address}

          onChange={handleChange}
        />

        {/* =========================
            PAYMENT METHOD
        ========================= */}

        <select
          value={paymentMethod}

          onChange={(e) =>
            setPaymentMethod(
              e.target.value
            )
          }
        >

          <option value="">
            Select Payment Method
          </option>

          <option value="UPI">
            UPI
          </option>

          <option value="Cash">
            Cash
          </option>

          <option value="Card">
            Card
          </option>

        </select>

        {/* =========================
            BOOK BUTTON
        ========================= */}

        <button
          onClick={handlePayment}
        >

          Book Now ₹{totalAmount}

        </button>

      </div>
    </div>
  );
}

export default Payment;