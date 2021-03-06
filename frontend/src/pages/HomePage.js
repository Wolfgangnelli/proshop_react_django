import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from "../components/Paginate";
import ProductCarousel from "../components/ProductCarousel";
import { getProducts } from "../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";

function HomeScreen({ history }) {
  const dispatch = useDispatch();
  const productsList = useSelector((state) => state.productsList);
  const { error, loading, products, page, pages } = productsList;

  let keyword = history.location.search;
  //console.log(keyword);
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousel />}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <div className="mt-5">
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
        </div>
      ) : (
        <div>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate page={page} pages={pages} keyword={keyword} />
        </div>
      )}
    </div>
  );
}

export default HomeScreen;
