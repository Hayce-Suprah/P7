import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Post } from "../components/Post/Post";

export const Category = () => {
  const { id } = useParams();

  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState(null);

  const getPosts = useCallback(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`).then((response) => {
      setPosts(
        response.data.filter((post) => post.categoryId.toString() === id)
      );
    });
  }, [id]);

  useEffect(() => {
    getPosts();

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/categories/${id}`)
      .then((response) => {
        setCategory(response.data);
      });
  }, [id, getPosts]);

  return (
    <div className="container mt-3">
      <h3>Catégorie : {category && category.title}</h3>
      <p className="fw-light">
        Retrouvez les articles concernés par cette catégorie.
      </p>

      <div className="row">
        {posts.length === 0 && (
          <p>Il n'y a aucun article pour cette catégorie</p>
        )}

        <div className="mb-3 col-md-4">
          {posts.map((post) => (
            <Post
              id={post.id}
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              author={post.user}
              withCategory={false}
              withComment={false}
              category={post.category}
              onPostDeleted={getPosts}
              onPostUpdated={getPosts}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
