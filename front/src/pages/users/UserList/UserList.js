import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Permet de récupérer la liste des utilisateurs depuis l'API
  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then((response) => setUsers(response.data));
  };

  // Permet de supprimer un utilisateur au click sur le bouton
  const handleSubmit = (e, id) => {
    e.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => getUsers());
  };

  // Vérifie si l'utilisateur est un admin ou non
  useEffect(() => {
    if (localStorage.getItem("roleP7") !== "1") {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mt-3">
      <h3>Liste des utilisateurs</h3>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Pseudo</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Date d'inscription</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td>
                <img
                  height={40}
                  src={`${process.env.REACT_APP_API_URL}${user.picture}`}
                  alt="image utilisateur"
                />
              </td>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.email}</td>
              <td>{user.role === 0 ? "Utilisateur" : "Administrateur"}</td>
              <td>{moment(user.createdAt).format("DD/MM/YYYY")}</td>
              <td>
                {user.role !== 1 && (
                  <button
                    onClick={(e) => handleSubmit(e, user.id)}
                    className="btn btn-outline-danger btn-sm"
                  >
                    Supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
