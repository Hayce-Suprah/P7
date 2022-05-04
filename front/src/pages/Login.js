import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tokenP7")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { email, password };
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/users/login`, body)
      .then((response) => {
        localStorage.setItem("tokenP7", response.data.token);
        localStorage.setItem("usernameP7", response.data.user.username);
        localStorage.setItem("userIdP7", response.data.user.id);
        localStorage.setItem("roleP7", response.data.user.role);
        window.location = "/";
      })
      .catch((err) => setError(err.response.data));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3 mb-3">Connectez-vous</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-4">
          <div clclassNameass="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@email.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Mot de passe</label>
                  <input
                    type="password"
                    className="form-control"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-outline-primary" type="submit">
                  Connexion
                </button>

                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}

                <div className="mt-3">
                  <Link to="/register">Je n'ai pas encore de compte</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
