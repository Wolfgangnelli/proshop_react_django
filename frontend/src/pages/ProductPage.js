import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
// import products from "../assets/products";
import { getProduct } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function ProductPage({ match }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productDetails);
  const { product, error, loading } = productList;

  useEffect(() => {
    dispatch(getProduct(match.params.id));
  }, [dispatch, match]);
  // const product = products.find((p) => p._id === match.params.id);
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
                <ListGroup.Item className="mx-auto">
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0 ? true : false}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default ProductPage;
