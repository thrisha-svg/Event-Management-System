import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Events.css";

function Events() {

  const [events, setEvents] = useState([]);

  const [form, setForm] = useState({
    name: "",
    date: "",
    location: "",
    price: "",
    image: "",
    desc: ""
  });

  // =========================
  // AUTO EVENT IMAGES
  // =========================
  const eventImages = {
    Wedding:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",

    Birthday:
      "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?q=80&w=1200&auto=format&fit=crop",

    "Naming Ceremony":
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=1200&auto=format&fit=crop",

    Corporate:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
  };

  // =========================
  // FETCH EVENTS
  // =========================
  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // =========================
  // ADD EVENT (AUTO IMAGE)
  // =========================
  const handleAddEvent = async () => {
    try {

      const dataToSend = {
        ...form,
        image: eventImages[form.name] || form.image
      };

      await axios.post(
        "http://localhost:5000/events",
        dataToSend
      );

      fetchEvents();

      setForm({
        name: "",
        date: "",
        location: "",
        price: "",
        image: "",
        desc: ""
      });

    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE EVENT
  // =========================
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/events/${id}`);
      fetchEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">

      <h2>🎉 Events Management</h2>

      {/* FORM */}
      <div className="form">

        <input
          type="text"
          name="name"
          placeholder="Event Name (Wedding, Birthday...)"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={form.location}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />

        <button onClick={handleAddEvent}>
          Add Event
        </button>

      </div>

      {/* EVENTS */}
      {events.length === 0 ? (
        <h4>No Events Added</h4>
      ) : (
        <div className="event-grid">

          {events.map((e) => (

            <div className="event-card" key={e._id}>

              <img
                src={e.image}
                alt={e.name}
                className="event-image"
              />

              <div className="event-info">

                <h3>{e.name}</h3>

                <p>📅 {e.date}</p>
                <p>📍 {e.location}</p>
                <p>💰 ₹{e.price}</p>
                <p className="desc">{e.desc}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(e._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Events;