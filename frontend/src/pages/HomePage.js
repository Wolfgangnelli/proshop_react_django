import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios";
import { Spinner } from "react-bootstrap";

function HomeScreen() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/api/products/`);
      setProducts(data);
    })();
  }, []);

  return (
    <div>
      <h1>Latest Products</h1>
      {products && products.length > 0 ? (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      ) : (
        <Spinner animation="border" />
      )}
    </div>
  );
}

export default HomeScreen;
