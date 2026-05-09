import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  // FETCH EVENTS
  useEffect(() => {
    axios
      .get("http://localhost:5000/events")
      .then((res) => {

        // Create fixed event list
        const updatedData = [
          {
            _id: "1",
            name: "Wedding",
            image:
              res.data.find((e) => e.name === "Wedding")?.image ||
              "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
            description:
              "Celebrate unforgettable wedding moments with beautiful decorations and joyful memories.",
          },

          {
            _id: "2",
            name: "Birthday",
            image:
              res.data.find((e) => e.name === "Birthday")?.image ||
              "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1200&auto=format&fit=crop",
            description:
              "Enjoy fun-filled birthday celebrations with cakes, balloons, music, and happiness.",
          },

          {
            _id: "3",
            name: "Naming Ceremony",
            image:
              "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",
            description:
              "Make your naming ceremony memorable with traditional and elegant arrangements.",
          },
        ];

        setCategories(updatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="dashboard">
      <div className="main">
        <h2 className="title">Event Categories</h2>

        <div className="card-container">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className="card"
              onClick={() => navigate(`/category/${cat.name}`)}
            >
              {/* Event Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="card-image"
              />

              {/* Event Name */}
              <div className="card-content">
                <h3 className="event-title">
                  {cat.name}
                </h3>

                {/* Event Description */}
                <p className="description">
                  {cat.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;