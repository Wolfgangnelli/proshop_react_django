import { GET_PRODUCTS } from "./actionTypes";
import axios from "axios";

export const getProducts = () => ({
  type: GET_PRODUCTS,
  payload: axios.get(`/api/products/`),
});
