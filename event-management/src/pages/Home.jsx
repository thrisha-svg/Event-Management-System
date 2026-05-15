import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";

import "./Home.css";

function Home() {

  const navigate = useNavigate();

  const [categories, setCategories] =
    useState([]);

  // FETCH EVENTS

  useEffect(() => {

    axios
      .get("http://localhost:5000/events")

      .then((res) => {

        setCategories(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (

    <div className="home-dashboard">

      <div className="home-main">

        <h2 className="home-title">
          Event Categories
        </h2>

        <div className="home-card-container">

          {categories.map((cat) => (

            <div

              key={cat._id}

              className="home-card"

              style={{
                backgroundImage:
                  `url(${cat.image})`
              }}

              onClick={() =>
                navigate(
                  `/category/${cat.name}`
                )
              }
            >

              {/* IMAGE */}

              <img
                src={cat.image}
                alt={cat.name}
                className="home-card-image"
              />

              {/* CONTENT */}

              <div className="home-card-content">

                <h3 className="home-event-title">
                  {cat.name}
                </h3>

                <p className="home-description">
                  {cat.desc}
                </p>

                <h4>
                  ₹{cat.price}
                </h4>

                <p>
                  📍 {cat.location}
                </p>

                <p>
                  📅 {cat.date}
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