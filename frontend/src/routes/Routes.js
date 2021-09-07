import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";

function Routes() {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/cart/:id?" component={CartPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile" component={ProfilePage} />
    </>
  );
}

export default Routes;
