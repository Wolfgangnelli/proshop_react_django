import React from "react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ProductPage from "../pages/ProductPage";
import CartPage from "../pages/CartPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProfilePage from "../pages/ProfilePage";
import ShippingPage from "../pages/ShippingPage";
import PaymentPage from "../pages/PaymentPage";
import PlaceOrderPage from "../pages/PlaceOrderPage";
import OrderPage from "../pages/OrderPage";
import UserListPage from "../pages/UserListPage";
import UserEditPage from "../pages/UserEditPage";
import ProductListPage from "../pages/ProductListPage";
import ProductEditPage from "../pages/ProductEditPage";
import OrderListPage from "../pages/OrderListPage";

function Routes() {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/product/:id" component={ProductPage} />
      <Route path="/cart/:id?" component={CartPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/shipping" component={ShippingPage} />
      <Route path="/payment" component={PaymentPage} />
      <Route path="/placeorder" component={PlaceOrderPage} />
      <Route path="/order/:id" component={OrderPage} />
      <Route path="/admin/users" component={UserListPage} />
      <Route path="/admin/user/:id/edit" component={UserEditPage} />
      <Route path="/admin/productlist" component={ProductListPage} />
      <Route path="/admin/product/:id/edit" component={ProductEditPage} />
      <Route path="/admin/orderlist" component={OrderListPage} />
    </>
  );
}

export default Routes;
