import { GET_PRODUCTS } from "../actions/actionTypes";

const productReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case `${GET_PRODUCTS}_PENDING`:
      return {
        loading: true,
        products: [],
      };
    case `${GET_PRODUCTS}_FULFILLED`:
      return {
        loading: false,
        products: action.payload,
      };
    case `${GET_PRODUCTS}_REJECTED`:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productReducers;
