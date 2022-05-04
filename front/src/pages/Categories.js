import React, { useEffect, useRef, useState } from "react";
import { Category } from "../components/Category/Category";
import axios from "axios";

export const Categories = () => {
  const inputFile = useRef(null);
  const modalButton = useRef(null);

  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(null);

  // Permet de récupérer les catégories depuis l'API
  const getCategories = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
      });
  };

  // Permet d'ajouter une catégorie au click du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    const body = new FormData();
    body.append("title", name);
    body.append("image", inputFile.current.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/categories/`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        modalButton.current.click();
        getCategories();
        setName("");
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="container mt-3">
      {/* Liste des catégories */}
      <div className="row">
        <h3>Liste des categories</h3>
        <p className="fw-light">
          Retrouver sur cette page, la liste de nos catégories. <br /> Cliquez
          sur un élément pour vois les articles concernés par cette catégorie.
        </p>
        {categories.map((category, index) => (
          <div className="col-md-3 mt-3" key={index}>
            <Category
              id={category.id}
              title={category.title}
              thumbnail={category.thumbnail}
              isAdmin={localStorage.getItem("roleP7") === "1"}
              onCategoryDeleted={getCategories}
              onCategoryUpdated={getCategories}
            />
          </div>
        ))}
      </div>

      {/* Bouton permettant d'ouvrir la modal d'ajout */}
      {localStorage.getItem("roleP7") === "1" && (
        <button
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#modal-add-category"
        >
          Ajouter une nouvelle catégorie
        </button>
      )}

      {/* Modal d'ajout d'une catégorie */}
      <div
        className="modal fade"
        id="modal-add-category"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Ajouter une catégorie</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <label>Nom</label>
                  <input
                    className="form-control"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Image</label>
                  <input
                    ref={inputFile}
                    required
                    className="form-control"
                    type="file"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  ref={modalButton}
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
