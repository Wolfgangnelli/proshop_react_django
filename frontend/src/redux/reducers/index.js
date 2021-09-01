import { combineReducers } from "redux";
import products from "./productsReducer";
import product from "./productReducer";

const reducers = {
  productsList: products,
  productDetails: product,
};

export default combineReducers(reducers);
