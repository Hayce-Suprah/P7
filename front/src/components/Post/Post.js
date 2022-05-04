import React, { useEffect, useRef, useState } from "react";
import classnames from "classnames";
import styles from "./Post.module.css";
import { Link } from "react-router-dom";
import { Comment } from "../Comment/Comment";
import axios from "axios";

export const Post = ({
  id,
  title,
  content,
  thumbnail,
  comments,
  author,
  category,
  withComment = true,
  withCategory = true,
  onPostDeleted,
  onPostUpdated,
  onCommentAdded,
  onCommentDeleted,
}) => {
  const modalButton = useRef(null);
  const inputFile = useRef(null);
  const [comment, setComment] = useState(null);
  const [_title, setTitle] = useState(title);
  const [description, setDescription] = useState(content);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(category && category.id);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => setCategories(response.data));
  }, []);

  // Permet d'ajouter un commentaire à la soumission du formulaire
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const body = { content: comment };

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/posts/${id}/comments`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        setComment("");
        onCommentAdded && onCommentAdded();
      });
  };

  // Permet de supprimer un article
  const handleDeletePost = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        if (onPostDeleted) {
          onPostDeleted();
        }
      });
  };

  // Permet de modifier un article
  const handleUpdateSubmit = (e) => {
    e.preventDefault();

    const body = new FormData();
    body.append("title", _title);
    body.append("content", description);
    if (inputFile) {
      body.append("image", inputFile.current.files[0]);
    }
    body.append("categoryId", categoryId);

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        modalButton.current.click();
        onPostUpdated && onPostUpdated();
      });
  };

  return (
    <div className="card">
      <img
        src={`${process.env.REACT_APP_API_URL}${thumbnail}`}
        className={styles.picture}
        alt=""
      />
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={classnames(styles.user, "me-3")}>
            <Link to={`/users/${author.id}`}>
              <img
                src={`${process.env.REACT_APP_API_URL}${author.picture}`}
                className={styles.picture}
                alt=""
              />
            </Link>
          </div>
          <h5 className="card-title">{title}</h5>
        </div>

        {withCategory && category && (
          <div className="mt-3">
            <span className="badge rounded-pill bg-primary">
              <Link to={`/categories/${category.id}`} className="text-white">
                {category.title}
              </Link>
            </span>
          </div>
        )}

        <p className="card-text mt-3">{content}</p>

        {/* Commentaires de l'article */}
        {withComment && comments && comments.length > 0 && (
          <>
            {comments.map((comment, index) => (
              <Comment
                id={comment.id}
                author={comment.user}
                content={comment.content}
                createdAt={comment.createdAt}
                key={index}
                onCommentDeleted={onCommentDeleted}
              />
            ))}
          </>
        )}

        {/* Ajouter un commentaire */}
        {withComment &&
          localStorage.getItem("tokenP7") &&
          localStorage.getItem("roleP7") !== "1" && (
            <>
              <form onSubmit={handleCommentSubmit}>
                <div className="form-group mb-2">
                  <input
                    placeholder="Laisser votre commentaire içi..."
                    className="form-control"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <button className="btn btn-outline-primary btn-sm">
                  Ajouter le commentaire
                </button>
              </form>
            </>
          )}

        {/* Bouton de modification */}
        {(author.id.toString() === localStorage.getItem("userIdP7")) && (
          <button
            type="button"
            className="btn btn-outline-warning btn-sm mt-2 me-2"
            data-bs-toggle="modal"
            data-bs-target={`#modal-post-${id}`}
          >
            Modifier l'article
          </button>
        )}

        {/* Bouton de suppression */}
        {(author.id.toString() === localStorage.getItem("userIdP7") ||
          localStorage.getItem("roleP7") === "1") && (
            <button
              type="button"
              onClick={handleDeletePost}
              className="btn btn-outline-danger btn-sm mt-2"
            >
              Supprimer l'article
            </button>
          )}
      </div>
      <div className="card-footer text-muted">Créer par {author.username}</div>

      {/* Modal de modification d'un article */}
      <div
        className="modal fade"
        id={`modal-post-${id}`}
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <form onSubmit={handleUpdateSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modifier
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
                  <label>Titre</label>
                  <input
                    className="form-control"
                    required
                    value={_title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Catégorie</label>
                  <select
                    className="form-control"
                    defaultValue={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                  >
                    {categories.map((category, index) => (
                      <option value={category.id} key={index}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group mb-2">
                  <label>Image (ne rien mettre pour garder l'original)</label>
                  <input ref={inputFile} className="form-control" type="file" />
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
    </div>
  );
};
