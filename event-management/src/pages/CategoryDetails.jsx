import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import categories from "../data/categories";

function CategoryDetails() {

  const { category } = useParams();

  const navigate = useNavigate();

  const data = categories.find(
    (c) => c.name === category
  );

  // ✅ MULTIPLE SELECT STATE
  const [selectedServices, setSelectedServices] =
    useState([]);

  // ✅ SEARCH STATE
  const [searchTerm, setSearchTerm] =
    useState("");

  // ✅ SELECT / REMOVE FUNCTION
  const handleSelect = (service) => {

    const alreadySelected =
      selectedServices.find(
        (item) => item.name === service.name
      );

    if (alreadySelected) {

      // REMOVE SERVICE
      const updatedServices =
        selectedServices.filter(
          (item) => item.name !== service.name
        );

      setSelectedServices(updatedServices);

    } else {

      // ADD SERVICE
      setSelectedServices([
        ...selectedServices,
        service,
      ]);
    }
  };

  // ✅ TOTAL PRICE
  const totalPrice = selectedServices.reduce(
    (total, item) => total + item.price,
    0
  );

  // ✅ FILTER SERVICES USING SEARCH
  const filteredServices =
    data?.services?.filter((service) =>
      service.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

  // ✅ SAVE DATA + NAVIGATE
  const handleProceedToPayment = () => {

    const bookingData = {

      eventName: data.name,

      services: selectedServices,

      total: totalPrice

    };

    // SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "bookingData",
      JSON.stringify(bookingData)
    );

    console.log(
      "Saved Booking:",
      bookingData
    );

    // NAVIGATE TO PAYMENT
    navigate("/payment");

  };

  // ✅ IF CATEGORY NOT FOUND
  if (!data)
    return <h3>No Data Found</h3>;

  return (

    <div style={{ padding: "20px" }}>

      {/* ✅ PAGE TITLE */}
      <h2>
        {data.icon} {data.name}
      </h2>

      <p>{data.desc}</p>

      {/* ✅ PAYMENT SECTION */}
      <div
        style={{
          background: "#f5f5f5",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "30px",
          boxShadow:
            "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >

        <h4>
          Selected Services:
          {" "}
          {selectedServices.length}
        </h4>

        <h4>
          Total Amount:
          ₹{totalPrice}
        </h4>

        {/* ✅ SHOW SELECTED SERVICES */}
        {selectedServices.map(
          (item, index) => (
            <p key={index}>
              {item.icon}
              {" "}
              {item.name}
              {" - "}
              ₹{item.price}
            </p>
          )
        )}

        {/* ✅ PAYMENT BUTTON */}
        <button
          className="btn btn-success"

          disabled={
            selectedServices.length === 0
          }

          onClick={
            handleProceedToPayment
          }
        >
          Proceed To Pay ₹{totalPrice}
        </button>

      </div>

      {/* ✅ SEARCH BAR */}
      <div
        style={{
          marginBottom: "25px",
        }}
      >

        <input
          type="text"

          placeholder="🔍 Search services..."

          value={searchTerm}

          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }

          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "10px",
            border:
              "1px solid #ccc",
            fontSize: "16px",
            outline: "none",
          }}
        />

      </div>

      {/* ✅ SERVICES */}
      <div className="row">

        {/* ✅ NO RESULT MESSAGE */}
        {filteredServices.length === 0 && (

          <h4 className="text-center">
            No Service Found
          </h4>

        )}

        {filteredServices?.map(
          (service, i) => {

            const isSelected =
              selectedServices.find(
                (item) =>
                  item.name ===
                  service.name
              );

            return (

              <div
                key={i}
                className="col-md-4 mb-4"
              >

                <div className="card shadow border-0 h-100">

                  {/* ✅ IMAGE */}
                  <img
                    src={service.image}

                    alt={service.name}

                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
                  />

                  {/* ✅ CARD BODY */}
                  <div className="card-body text-center">

                    <h5>
                      {service.icon}
                      {" "}
                      {service.name}
                    </h5>

                    <p>
                      {service.desc}
                    </p>

                    <p>
                      ₹{service.price}
                    </p>

                    {/* ✅ SELECT BUTTON */}
                    <button

                      className={
                        isSelected
                          ? "btn btn-danger mt-3"
                          : "btn btn-primary mt-3"
                      }

                      onClick={() =>
                        handleSelect(
                          service
                        )
                      }
                    >

                      {isSelected
                        ? "Remove"
                        : "Select"}

                    </button>

                  </div>

                </div>

              </div>
            );
          }
        )}

      </div>

    </div>
  );
}

export default CategoryDetails;