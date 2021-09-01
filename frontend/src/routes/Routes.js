import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";

function Routes() {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/cart/:id?" component={CartPage} />
    </>
  );
}

export default Routes;
