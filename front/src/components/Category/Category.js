import React, { useEffect, useRef, useState } from "react";
import styles from "./Category.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export const Category = ({
  id,
  title,
  thumbnail,
  isAdmin = false,
  onCategoryDeleted,
  onCategoryUpdated,
}) => {
  const modalButton = useRef(null);
  const inputFile = useRef(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    setName(title);
  }, [title]);

  const handleSubmitCategory = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("title", name);

    if (inputFile) {
      body.append("image", inputFile.current.files[0]);
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/categories/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        if (onCategoryUpdated) {
          modalButton.current.click();
          onCategoryUpdated();
        }
      });
  };

  const handleDeleteCategory = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        if (onCategoryDeleted) {
          onCategoryDeleted();
        }
      });
  };

  return (
    <>
      <div className="card">
        <img
          src={`${process.env.REACT_APP_API_URL}${thumbnail}`}
          className={styles.picture}
          alt="categorie image"
        />
        <div className="card-body">
          <h5 clclassNameass="card-title">
            <Link to={`/categories/${id}`}>{title}</Link>
          </h5>

          {isAdmin && (
            <>
              <button
                type="button"
                className="btn btn-outline-primary btn-sm mt-2"
                data-bs-toggle="modal"
                data-bs-target={`#modal-category-${id}`}
              >
                Modifier
              </button>
              <button
                onClick={handleDeleteCategory}
                type="button"
                className="btn btn-outline-danger btn-sm mt-2"
              >
                Supprimer
              </button>
            </>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id={`modal-category-${id}`}
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleSubmitCategory}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modifier {title}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-group mb-2">
                  <label htmlFor={`name-${id}`}>Nom</label>
                  <input
                    id={`name-${id}`}
                    className="form-control"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor={`image-${id}`}>Image (ne rien mettre pour garder l'original)</label>
                  <input id={`name-${id}`} ref={inputFile} className="form-control" type="file" />
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
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
