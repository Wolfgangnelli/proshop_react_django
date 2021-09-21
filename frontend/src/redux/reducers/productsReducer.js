import { GET_PRODUCTS } from "../actions/actionTypes";

const productsReducers = (state = { products: [] }, action) => {
  switch (action.type) {
    case `${GET_PRODUCTS}_PENDING`:
      return {
        loading: true,
        products: [],
      };
    case `${GET_PRODUCTS}_FULFILLED`:
      return {
        loading: false,
        products: action.payload.data,
      };
    case `${GET_PRODUCTS}_REJECTED`:
      return {
        loading: false,
        error: action.payload.message,
      };
    default:
      return state;
  }
};
export default productsReducers;
