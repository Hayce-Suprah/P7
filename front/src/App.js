import React from "react";
import { Header } from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home/Home";
import { Categories } from "./pages/Categories";
import { UserDetails } from "./pages/users/UserDetails/UserDetails";
import { AddPost } from "./pages/Posts/AddPost";
import { Category } from "./pages/Category";
import { UserList } from "./pages/users/UserList/UserList";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Routes des articles */}
          <Route path="/articles/ajouter" element={<AddPost />} />

          {/* Routes catégories */}
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:id" element={<Category />} />

          {/* Routes utilisateurs */}
          <Route path="/users" element={<UserList />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
