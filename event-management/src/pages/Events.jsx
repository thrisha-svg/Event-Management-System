import React, {
  useEffect,
  useState
} from "react";

import axios from "axios";

function Events() {

  const [events, setEvents] =
    useState([]);

  const [form, setForm] =
    useState({

      name: "",
      date: "",
      location: "",
      price: "",
      image: "",
      desc: ""

    });


  // =========================
  // FETCH EVENTS
  // =========================

  const fetchEvents = async () => {

    try {

      const res = await axios.get(

        "http://localhost:5000/events"

      );

      setEvents(res.data);

    }

    catch (error) {

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

      [e.target.name]:
        e.target.value

    });

  };


  // =========================
  // ADD EVENT
  // =========================

  const handleAddEvent =
    async () => {

    try {

      await axios.post(

        "http://localhost:5000/events",

        form

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

    }

    catch (error) {

      console.log(error);

    }

  };


  // =========================
  // DELETE EVENT
  // =========================

  const handleDelete =
    async (id) => {

    try {

      await axios.delete(

        `http://localhost:5000/events/${id}`

      );

      fetchEvents();

    }

    catch (error) {

      console.log(error);

    }

  };


  return (

    <div className="container">

      <h2>
        🎉 Events Management
      </h2>


      {/* FORM */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >

        <input
          type="text"
          name="name"
          placeholder="Event Name"
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
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
        />

        <input
          type="text"
          name="desc"
          placeholder="Description"
          value={form.desc}
          onChange={handleChange}
        />

        <button
          onClick={handleAddEvent}
        >
          Add Event
        </button>

      </div>


      {/* EVENTS */}

      {events.length === 0 ? (

        <h4>No Events Added</h4>

      ) : (

        <table
          border="1"
          cellPadding="10"
        >

          <thead>

            <tr>

              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Price</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {events.map((e) => (

              <tr key={e._id}>

                <td>{e.name}</td>

                <td>{e.date}</td>

                <td>{e.location}</td>

                <td>₹{e.price}</td>

                <td>

                  <button
                    onClick={() =>
                      handleDelete(e._id)
                    }
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

    </div>

  );

}

export default Events;