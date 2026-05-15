import React, {
  useEffect,
  useState
} from "react";

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
        "
      >
        Registered Users
      </h2>

      {/* TABLE */}

      <div className="card shadow border-0">

        <div
          className="
            card-header
            bg-primary
            text-white
          "
        >

          <h4 className="mb-0">
            Users List
          </h4>

        </div>

        <div className="card-body">

          <table
            className="
              table
              table-hover
              table-bordered
            "
          >

            <thead
              className="table-dark"
            >

              <tr>

                <th>#</th>

                <th>Name</th>

                <th>Email</th>

              </tr>

            </thead>

            <tbody>

              {users.map(
                (user, index) => (

                  <tr key={user._id}>

                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {user.name}
                    </td>

                    <td>
                      {user.email}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>

  );

}

export default UsersList;