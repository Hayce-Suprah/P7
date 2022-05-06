import classnames from "classnames";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Post } from "../../components/Post/Post";
import styles from "./Home.module.css";
import axios from "axios";

export const Home = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/posts`).then((response) => {
      setPosts(response.data);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container mt-3">
      <div className="row">
        {posts.map((post, index) => (
          <div className="mb-3 col-md-6 offset-md-3" key={index}>
            <Post
              id={post.id}
              title={post.title}
              content={post.content}
              thumbnail={post.thumbnail}
              author={post.user}
              createdAt={post.createdAt}
              comments={post.comments}
              category={post.category}
              onPostDeleted={getPosts}
              onPostUpdated={getPosts}
              onCommentAdded={getPosts}
              onCommentDeleted={getPosts}
            />
          </div>
        ))}
      </div>

      {localStorage.getItem("tokenP7") && (
        <Link
          to="/articles/ajouter"
          className={classnames("btn btn-primary", styles.button)}
        >
          Ajouter
        </Link>
      )}
    </div>
  );
};
