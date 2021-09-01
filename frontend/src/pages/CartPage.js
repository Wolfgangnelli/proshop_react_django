import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { addToCart } from "../redux/actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, List, Image, Form, Button, Card } from "react-bootstrap";
import Message from "../components/Message";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function CartPage({ match, location, history }) {
  const dispatch = useDispatch();
  let query = useQuery();
  const qty = query.get("qty") ? +query.get("qty") : 1;
  const productId = match.params.id;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(+productId, qty));
    }
  }, [productId, qty, dispatch]);

  return (
    <div>
      <Row>Cart</Row>
    </div>
  );
}

export default CartPage;
