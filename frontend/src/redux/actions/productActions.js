import {
  GET_PRODUCTS,
  GET_PRODUCT_DETAILS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_SUCCESS,
} from "./actionTypes";
import axios from "axios";

export const getProducts = () => ({
  type: GET_PRODUCTS,
  payload: axios.get(`/api/products/`),
});

export const getProduct = (id) => ({
  type: GET_PRODUCT_DETAILS,
  payload: axios.get(`/api/products/${id}`),
});

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCT_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/delete/${id}/`, config);

    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
