import React, { useEffect, useState } from "react";
import "./styles/index.css";
import axios from "axios";
import {Link} from 'react-router-dom'

function AdminPanel() {
  const [users, setusers] = useState([]);

  const onDelete = (e) => {
    let user_id = e.target.value;
    if (!window.confirm("Are you sure to delete this user")) {
      return ;
    }

    axios
      .delete(`/api/users/${user_id}`)
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/api/users")
      .then((users) => setusers(users.data))
      .catch((err) => console.log(err));
  }, [users]);

  return (
    <div id="admin-panel">
      <main id="main-content">
        <section id="table-content">
          <table className="userlist">
            <thead>
              <tr>
                <th >Username</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Department</th>
                <th>Active/Passive user</th>
                <th>Process</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={index}>
                  <td data-title="Username">{user.username}</td>
                  <td data-title="First name">{user.firstName}</td>
                  <td data-title="Last name">{user.lastName}</td>
                  <td data-title="Department">{user.department}</td>
                  <td data-title = "Active user">
                    {user.activate ? (
                      <button id="active"></button>
                    ) : (
                      <button id="passive"></button>
                    )}
                  </td>
                  <td data-title="Process">
                    <Link to={`/${user._id}`}>
                      <button id="edit-button">Edit</button>
                    </Link>
                    <button
                      id="delete-button"
                      value={user._id}
                      onClick={onDelete}
                    >
                      {" "}
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <footer>
        <Link to="/adduser">
          <button id="add-button">Add user</button>
        </Link>
      </footer>
    </div>
  );
}

export default AdminPanel;
