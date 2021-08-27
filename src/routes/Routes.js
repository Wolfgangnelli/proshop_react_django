import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";

function Routes() {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/product/:id" component={ProductPage} />
    </>
  );
}

export default Routes;
