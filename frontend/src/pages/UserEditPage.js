import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../redux/actions/userActions";
import { FormContainer } from "../components/FormContainer";

const EditUserPage = ({ match, history }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const userID = match.params.id;

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  useEffect(() => {
    if (!user.name || user._id !== +userID) {
      dispatch(getUserDetails(userID));
    } else {
      setEmail(user.email);
      setName(user.name);
      setIsAdmin(user.isAdmin);
    }
  }, [user, userID]);

  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <Link to="/admin/users">
        {" "}
        <i className="fas fa-arrow-left"></i> Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2" controlId="isAdmin">
              <Form.Check
                type="checkbox"
                id="default checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
            </Form.Group>
            <Button className="mt-4" variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default EditUserPage;
