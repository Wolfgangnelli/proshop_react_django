import { combineReducers } from "redux";
import products from "./productsReducer";
import product from "./productReducer";
import cart from "./cartReducers";

const reducers = {
  productsList: products,
  productDetails: product,
  cart,
};

export default combineReducers(reducers);
