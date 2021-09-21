import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  getProduct,
  createProductReview,
} from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/actions/actionTypes";

function ProductPage({ match, history }) {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { product, error, loading } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreateReview = useSelector((state) => state.productCreateReview);
  const {
    loading: loadingCreateReview,
    success: successCreateReview,
    error: errorCreateReview,
    message,
  } = productCreateReview;

  useEffect(() => {
    if (successCreateReview) {
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(getProduct(match.params.id));
  }, [dispatch, match, successCreateReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      createProductReview(
        {
          rating,
          comment,
        },
        match.params.id
      )
    );
  };

  return (
    <div>
      <Link to="/" className="btn btn-light m-y3">
        <i className="fas fa-arrow-left"></i>
        <u className="ms-1">Go Back</u>
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          <h3 className="text-danger">
            Sorry, an Error occurs. <i className="fas fa-bug"></i>
          </h3>
          <p>({error})</p>
          <p className="fw-bold fs-2 text-info">
            Soon we will restore the service. Try later{" "}
            <i className="fas fa-hand-scissors" style={{ color: "blue" }}></i>
          </p>
        </Message>
      ) : (
        <>
          <Row>
            <Col lg={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col lg={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} review`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col lg={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>
                        <Col xs="auto" className="my-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="mx-auto">
                    <Button
                      className="btn-block"
                      type="button"
                      disabled={product.countInStock === 0 ? true : false}
                      onClick={addToCartHandler}
                    >
                      Add to Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row className="pt-4">
            <Col md={6}>
              <h4>Reviews</h4>
              {product.reviews.length === 0 ? (
                <Message variant="info">No Reviews</Message>
              ) : (
                <ListGroup variant="flush">
                  {product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong className="text-uppercase">{review.name}</strong>
                      <div className="ms-2">
                        <p>{review.comment}</p>
                        <div className="d-flex align-items-center">
                          <Rating value={review.rating} color="#f8e825" />
                          <span>{review.createdAt.substring(0, 10)}</span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h4>Write a review</h4>
                    {loadingCreateReview && <Loader />}
                    {errorCreateReview && (
                      <Message variant="danger">{errorCreateReview}</Message>
                    )}
                    {successCreateReview && (
                      <Message variant="success">{message}</Message>
                    )}
                    {userInfo ? (
                      <Form onSubmit={submitReviewHandler} className="ms-3">
                        <Form.Group controlId="rating">
                          <Form.Label>Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(+e.target.value)}
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" className="mt-2">
                          <Form.Label>Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows="5"
                            value={comment}
                            placeholder="Write a comment"
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </Form.Group>
                        <Button
                          disabled={loadingCreateReview}
                          type="submit"
                          variant="primary"
                          className="mt-2"
                        >
                          Submit
                        </Button>
                      </Form>
                    ) : (
                      <Message variant="info">
                        Please <Link to="/login">login</Link>
                        to write a review
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              )}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
}

export default ProductPage;
