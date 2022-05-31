import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Register = () => {
  const [email, setEmail] = useState(null);
  const [pseudo, setPseudo] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("tokenP7")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Les mots de passes ne correspondent pas.");
      return;
    }

    const body = { email, username: pseudo, password };
    axios
      .post("http://localhost:3200/api/users", body)
      .then(() => navigate("/login"))
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="container">
      <h1 className="text-center mt-3 mb-3">Inscrivez-vous</h1>
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-4">
          <div className="card">
            <div className="card-body">
              <p className="card-title fw-light text-muted mb-3">
                Vous voulez faire partie de notre blog ? Il vous suffit de vous
                inscrire facilement via le formulaire d'inscription ci-dessous.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="email@email.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="pseudo" className="form-label">Pseudo</label>
                  <input
                    id="pseudo"
                    className="form-control"
                    placeholder="Thor"
                    required
                    onChange={(e) => setPseudo(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <input
                    id="password"
                    type="password"
                    className="form-control"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="confirm password" className="form-label">Répéter le mot de passe</label>
                  <input
                    id="confirm password"
                    type="password"
                    className="form-control"
                    required
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" type="submit">
                  Inscription
                </button>

                {error && (
                  <div className="alert alert-danger mt-3" role="alert">
                    {error}
                  </div>
                )}

                <div className="mt-3">
                  <Link to="/login">Je déjà de compte</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
