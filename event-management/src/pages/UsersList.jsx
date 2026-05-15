import React, {
  useEffect,
  useState
} from "react";
import "./UserList.css";
import axios from "axios";

function UsersList() {

  // ======================
  // USERS STATE
  // ======================

  const [users, setUsers] =
    useState([]);

  // ======================
  // FETCH USERS
  // ======================

  useEffect(() => {

    axios
      .get("http://localhost:5000/users")

      .then((res) => {

        setUsers(res.data);

      })

      .catch((err) => {

        console.log(err);

      });

  }, []);

  return (

    <div className="container mt-4">

      {/* TITLE */}

      <h2
        className="
          text-primary
          fw-bold
          mb-4
          text-center
        "
      >
        Registered Users
      </h2>

      {/* TABLE CARD */}

      <div
        className="
          card
          shadow-lg
          border-0
        "
      >

        {/* CARD HEADER */}

        <div
          className="
            card-header
            bg-primary
            text-white
            text-center
          "
        >

          <h4 className="mb-0">
            Users List
          </h4>

        </div>

        {/* CARD BODY */}

        <div className="card-body">

          {/* RESPONSIVE TABLE */}

          <div className="table-responsive">

            <table
              className="
                table
                table-hover
                table-bordered
                align-middle
                text-center
              "
            >

              {/* TABLE HEAD */}

              <thead
                className="
                  table-dark
                "
              >

                <tr>

                  <th>#</th>

                  <th>Name</th>

                  <th>Email</th>

                  <th>Phone</th>

                  <th>Address</th>

                </tr>

              </thead>

              {/* TABLE BODY */}

              <tbody>

                {users.length === 0 ? (

                  <tr>

                    <td
                      colSpan="5"
                      className="
                        text-center
                        text-danger
                        fw-bold
                      "
                    >
                      No Users Found
                    </td>

                  </tr>

                ) : (

                  users.map(
                    (user, index) => (

                      <tr
                        key={user._id}
                      >

                        {/* SERIAL NUMBER */}

                        <td>
                          {index + 1}
                        </td>

                        {/* NAME */}

                        <td>
                          {user.name}
                        </td>

                        {/* EMAIL */}

                        <td>
                          {user.email}
                        </td>

                        {/* PHONE */}

                        <td>
                          {user.phone}
                        </td>

                        {/* ADDRESS */}

                        <td>
                          {user.address}
                        </td>

                      </tr>

                    )
                  )

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default UsersList;