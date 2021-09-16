import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import { CheckoutProgressBar } from "../components/CheckoutProgressBar";
import { createOrder } from "../redux/actions/orderActions";
import { ORDER_CREATE_RESET } from "../redux/actions/actionTypes";

const PlaceOrderPage = ({ history }) => {
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, error, success } = orderCreate;
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { cartItems, shippingAddress, paymentMethod } = cart;
  cart.itemsPrice = cartItems
    .reduce((total, item) => total + item.qty * item.price, 0)
    .toFixed(2);
  cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 10).toFixed(2);
  cart.taxPrice = (0.082 * cart.itemsPrice).toFixed(2);
  cart.totalPrice = (
    +cart.itemsPrice +
    +cart.shippingPrice +
    +cart.taxPrice
  ).toFixed(2);

  if (!paymentMethod || paymentMethod.length === 0) {
    history.push("/payment");
  }

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, history, order, dispatch]);

  const placeOrder = () => {
    dispatch(
      createOrder({
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice: cart.itemsPrice,
        taxPrice: cart.taxPrice,
        shippingPrice: cart.shippingPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <div>
      <CheckoutProgressBar step1 step2 step3 step4 />
      <h1 className="text-center">Place Order</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <address>
                <strong className="fw-bold">Shipping: </strong>
                {shippingAddress.address}, {shippingAddress.city}
                {"  "}
                {shippingAddress.postalCode},{"  "}
                {shippingAddress.country}
              </address>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method </h2>
              <p>
                <strong className="fw-bold">Method: </strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items </h2>
              {cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item, idx) => (
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
                <Col>${cart.itemsPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Shipping:</Col>
                <Col>${cart.shippingPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Tax:</Col>
                <Col>${cart.taxPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Total:</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            {error ? (
              <ListGroup.Item>
                <Message variant="danger">{error}</Message>
              </ListGroup.Item>
            ) : null}
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems === 0}
                onClick={placeOrder}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderPage;
