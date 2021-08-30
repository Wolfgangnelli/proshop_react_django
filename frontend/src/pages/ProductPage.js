import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
// import products from "../assets/products";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function ProductPage({ match }) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    })();
  }, []);
  // const product = products.find((p) => p._id === match.params.id);
  return (
    <div>
      <Link to="/" className="btn btn-light m-y3">
        <i className="fas fa-arrow-left"></i>
        <u className="ms-1">Go Back</u>
      </Link>
      {Object.keys(product).length > 0 ? (
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
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}

export default ProductPage;
