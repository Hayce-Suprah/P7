import React from "react";
import styles from "./Comment.module.css";
import moment from "moment";
import classnames from "classnames";
import axios from "axios";
import { Link } from "react-router-dom";

export const Comment = ({
  id,
  author,
  content,
  createdAt,
  onCommentDeleted,
}) => {
  // Permet de supprimer un commentaire
  const handleDeleteComment = () => {
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/comments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        onCommentDeleted && onCommentDeleted();
      });
  };

  return (
    <div className={styles.comment}>
      <div className="d-flex align-items-center">
        <div className={styles.user}>
          <Link to={`/users/${author.id}`}>
            <img
              src={`${process.env.REACT_APP_API_URL}${author.picture}`}
              alt="commentaire image"
            />
          </Link>
        </div>
        <div className="ms-3">
          <p>{content}</p>
          {(localStorage.getItem("userIdP7") === author.id.toString() ||
            localStorage.getItem("roleP7") === "1") && (
              <button
                onClick={handleDeleteComment}
                className={classnames(
                  "btn btn-outline-danger btn-sm",
                  styles.button
                )}
              >
                <i className="bi bi-trash"></i> Supprimer
              </button>
            )}
        </div>
      </div>
      <figcaption className="blockquote-footer mt-1">
        <cite title="Source Title">
          Par{" "}
          {localStorage.getItem("userIdP7") === author.id.toString()
            ? "Vous"
            : author.username}{" "}
          - {moment(createdAt).startOf(createdAt).fromNow()}
        </cite>
      </figcaption>
    </div>
  );
};
