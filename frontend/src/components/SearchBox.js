import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  let history = useHistory();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      history.push(`/?keyword=${keyword}`);
    } else {
      history.push(history.push(history.location.pathname));
    }
  };
  return (
    <Form onSubmit={submitHandler} className="d-flex mt-3 mt-sm-0">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2 ms-2">
        Submit
      </Button>
    </Form>
  );
};