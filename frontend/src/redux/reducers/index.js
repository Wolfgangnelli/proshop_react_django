import { combineReducers } from "redux";
import products from "./productsReducer";
import product from "./productReducer";
import cart from "./cartReducers";
import { userLoginReducer as userLogin } from "./userReducers";

const reducers = {
  productsList: products,
  productDetails: product,
  cart,
  userLogin,
};

export default combineReducers(reducers);
