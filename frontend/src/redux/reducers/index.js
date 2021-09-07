import { combineReducers } from "redux";
import products from "./productsReducer";
import product from "./productReducer";
import cart from "./cartReducers";
import {
  userLoginReducer as userLogin,
  userRegisterReducer as userRegister,
  userDetailsReducer as userDetails,
} from "./userReducers";

const reducers = {
  productsList: products,
  productDetails: product,
  cart,
  userLogin,
  userRegister,
  userDetails,
};

export default combineReducers(reducers);
