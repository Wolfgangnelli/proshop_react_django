import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { Spinner } from "react-bootstrap";
import { getProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function HomeScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.products);
  const { error, loading, products } = productsList;

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <div className="mt-5">
          <h3 className="text-danger">
            Sorry, an Error occurs. <i className="fas fa-bug"></i>
          </h3>
          <p>({error})</p>
          <p className="fw-bold fs-2 text-info">
            Soon we will restore the service. Try later{" "}
            <i className="fas fa-hand-scissors" style={{ color: "blue" }}></i>
          </p>
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
