import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FormContainer } from "../components/FormContainer";
import { savePaymentMethod } from "../redux/actions/cartActions";
import { CheckoutProgressBar } from "../components/CheckoutProgressBar";

const PaymentPage = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();

  if (!shippingAddress.address) {
    history.push("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutProgressBar step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-4">
          <Form.Label as="legend">Select Method</Form.Label>
          <Col className="ms-2 py-2">
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="paypal"
              name="paymentMethod"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          COntinue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentPage;
