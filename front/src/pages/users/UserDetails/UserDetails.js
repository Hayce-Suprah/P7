import React, { useEffect, useRef, useState } from "react";
import { Post } from "../../../components/Post/Post";
import styles from "./UserDetails.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";

export const UserDetails = () => {
  const { id } = useParams();
  const pictureRef = useRef(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
      .then((response) => {
        setUsername(response.data.username);
        setUser(response.data);
      });
  }, [id]);

  const onPostIsDeletedOrUpdated = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
      .then((response) => setUser(response.data));
  };

  const handleSubmit = (e) => {
    setSuccess(false);
    e.preventDefault();

    const body = new FormData();
    body.append("username", username);
    if (pictureRef) {
      body.append("image", pictureRef.current.files[0]);
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/users/${id}`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => setSuccess(true));
  };

  return (
    <div className="container mt-3">
      {user && (
        <div className="row">
          {/* Détails de l'utilisateur */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                {localStorage.getItem("userIdP7") === user.id.toString() ? (
                  <>
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                        id="email"
                          type="email"
                          disabled
                          className="form-control"
                          value={user.email}
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label htmlFor="pseudo">Pseudo</label>
                        <input
                        id="pseudo"
                          type="text"
                          className="form-control"
                          value={username}
                          required
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="form-group mt-2">
                        <label htmlFor="image">
                          Image (laisser vide si vous voulez garder l'original)
                        </label>
                        <input
                        id="image"
                          ref={pictureRef}
                          type="file"
                          className="form-control"
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn btn-outline-primary mt-3"
                      >
                        Modifier
                      </button>
                      {success && (
                        <div className="alert alert-success mt-3" role="alert">
                          Votre profil est modifié avec succès !
                        </div>
                      )}
                    </form>
                  </>
                ) : (
                  <>
                    <div className="text-center">
                      <img
                        src={`${process.env.REACT_APP_API_URL}${user.picture}`}
                        className={styles.picture}
                        alt="image utilisateur"
                      />
                      <h3 className="mt-2">{user.username}</h3>
                      <div>
                        Inscrit le{" "}
                        {moment(user.created_at).format("DD/MM/YYYY")}
                      </div>
                    </div>
                    <div className="mt-3">
                      <div>
                        <strong>Email</strong> : {user.email}
                      </div>
                      <div>
                        <strong>Nbr articles</strong> : {user.posts.length}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Liste des posts de l'utilisateurs */}
          <div className="col-md-6 mt-3 mt-md-0">
            <h3>Liste des articles</h3>

            {user.posts.length === 0 && (
              <p>Cet utilisateur n'a encore écrit aucun article.</p>
            )}
            {user.posts.map((post) => (
              <Post
                id={post.id}
                title={post.title}
                content={post.content}
                category={post.category}
                thumbnail={post.thumbnail}
                createdAt={post.createdAt}
                author={user}
                withComment={false}
                withCategory={false}
                onPostDeleted={onPostIsDeletedOrUpdated}
                onPostUpdated={onPostIsDeletedOrUpdated}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
