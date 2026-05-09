import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import categories from "../data/categories";

function CategoryDetails() {
  const { category } = useParams();
  const navigate = useNavigate();

  const data = categories.find((c) => c.name === category);

  if (!data) return <h3>No Data Found</h3>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        {data.icon} {data.name}
      </h2>
      <p>{data.desc}</p>

      <div className="row">
        {data.services?.map((service, i) => (
          <div key={i} className="col-md-3">
            <div className="card shadow border-0">
              <img
                src={service.image}
                alt={service.name}
                style={{ height: "150px", objectFit: "cover" }}
              />

              <div className="card-body text-center">
                <h5>
                  {service.icon} {service.name}
                </h5>
                <p>₹{service.price}</p>

                {/* ✅ GO TO PAYMENT PAGE */}
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/payment", {
                      state: {
                        service: service,
                        category: data.name,
                      },
                    })
                  }
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryDetails;