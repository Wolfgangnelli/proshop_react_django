import React, { useState, useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails } from "../redux/actions/orderActions";

const OrderPage = ({ match }) => {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  if (!loading && !error) {
    order.itemsPrice = order.orderItems
      .reduce((total, item) => total + item.qty * item.price, 0)
      .toFixed(2);
  }

  useEffect(() => {
    if (!order || order._id !== +orderId) {
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, order, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1 className="text-center">Order: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong className="fw-bold">Name: </strong> {order.user.name}
              </p>
              <p>
                <strong className="fw-bold">Email: </strong>
                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
              </p>
              <address>
                <strong className="fw-bold">Shipping: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city}
                {"  "}
                {order.shippingAddress.postalCode},{"  "}
                {order.shippingAddress.country}
              </address>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <p>
                <strong className="fw-bold">Method: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items </h2>
              {order.orderItems.length == 0 ? (
                <Message variant="info">Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col xs={2} lg={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Row>
                            <Col className="d-flex align-items-center">
                              <Link to={`/product/${item.product}`}>
                                {item.name}
                              </Link>
                            </Col>
                            <Col>
                              {item.qty} X ${item.price} = $
                              {(item.qty * item.price).toFixed(2)}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Order Summary</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Items:</Col>
                <Col>${order.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${order.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${order.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${order.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default OrderPage;
