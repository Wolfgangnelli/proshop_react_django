import { GET_PRODUCTS } from "./actionTypes";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PRODUCTS,
    });

    const { data } = await axios.get(`/api/products/`);

    dispatch({
      type: GET_PRODUCTS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PRODUCTS,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
