import {
  GET_PRODUCT_DETAILS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
} from "../actions/actionTypes";

const initialState = { product: { reviews: [] } };

export const productDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case `${GET_PRODUCT_DETAILS}_PENDING`:
      return {
        loading: true,
        ...state,
      };
    case `${GET_PRODUCT_DETAILS}_FULFILLED`:
      return {
        loading: false,
        product: payload.data,
      };
    case `${GET_PRODUCT_DETAILS}_REJECTED`:
      return {
        loading: false,
        error: payload.message,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: payload,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: payload.message,
      };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
