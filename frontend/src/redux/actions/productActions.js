import { GET_PRODUCTS, GET_PRODUCT_DETAILS } from "./actionTypes";
import axios from "axios";

export const getProducts = () => ({
  type: GET_PRODUCTS,
  payload: axios.get(`/api/products/`),
});

export const getProduct = (id) => ({
  type: GET_PRODUCT_DETAILS,
  payload: axios.get(`/api/products/${id}`),
});
