import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/icon.svg";

export const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("tokenP7");
    localStorage.removeItem("usernameP7");
    localStorage.removeItem("userIdP7");
    localStorage.removeItem("roleP7");
    window.location = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} alt="logo" width="80" height="80" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to={"/"} className="nav-link active" aria-current="page">
                Accueil
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/categories"} className="nav-link">
                Catégories
              </Link>
            </li>
            {localStorage.getItem("roleP7") === "1" && (
              <li className="nav-item">
                <Link to={"/users"} className="nav-link">
                  Utilisateurs
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex">
            {localStorage.getItem("tokenP7") ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to={`/users/${localStorage.getItem("userIdP7")}`}
                  >
                    {localStorage.getItem("usernameP7")}
                  </Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link">
                    Déconnexion
                  </button>
                </li>
              </ul>
            ) : (
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link className="nav-link" to={"/login"}>
                      Connexion
                  </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/register"}>
                      Inscription
                  </Link>
                  </li>
                </ul>
              )}
          </div>
        </div>
      </div>
    </nav>
  );
};
