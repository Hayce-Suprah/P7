import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AddPost = () => {
  const pictureRef = useRef(null);
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [categoryId, setCategoryId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories`)
      .then((response) => {
        setCategories(response.data);
        setCategoryId(response.data[0].id);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const body = new FormData();
    body.append("title", title);
    body.append("content", content);
    body.append("image", pictureRef.current.files[0]);
    body.append("categoryId", categoryId);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/posts`, body, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("tokenP7")}`,
        },
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => setError(error.response.data));
  };

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <h3 className="mb-3 text-center">Ajouter un nouvel article</h3>
        <div className="col-md-8 col-lg-4">
          <div className="card">
            <div className="card-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <div className="form-group mb-3">
                  <label htmlFor="title">Titre</label>
                  <input
                    id="title"
                    type="text"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="image">Image</label>
                  <input
                    id="image"
                    type="file"
                    ref={pictureRef}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="content">Contenue</label>
                  <textarea
                    id="content"
                    className="form-control"
                    required
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                  />
                </div>
                <div className="form-group mb-3">
                  <label>Catégorie</label>
                  <select
                    className="form-control"
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
                <button className="btn btn-primary" type="submit">
                  Ajouter l'article
                </button>
              </form>

              {error && (
                <div className="alert alert-danger mt-3" role="alert">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
