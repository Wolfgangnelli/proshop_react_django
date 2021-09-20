import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrders } from "../redux/actions/orderActions";

const OrderListPage = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderList = useSelector((state) => state.orderList);
  const { orders, loading, error } = orderList;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history]);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <span>
                      {order.paidAt.substring(0, 10)}
                      <i
                        className="fas fa-check ms-1"
                        style={{ color: "green" }}
                      ></i>
                    </span>
                  ) : (
                    <i className="fas fa-circle" style={{ color: "red" }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span>
                      {order.deliveredAt.substring(0, 10)}
                      <i
                        className="fas fa-check ms-1"
                        style={{ color: "green" }}
                      ></i>
                    </span>
                  ) : (
                    <i className="fas fa-circle" style={{ color: "red" }}></i>
                  )}
                </td>
                <td className="d-flex justify-content-evenly">
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button
                      variant="light"
                      className="btn-sm border-1 border-dark"
                    >
                      DETAILS
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default OrderListPage;
