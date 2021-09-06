import { combineReducers } from "redux";
import products from "./productsReducer";
import product from "./productReducer";
import cart from "./cartReducers";
import {
  userLoginReducer as userLogin,
  userRegisterReducer as userRegister,
} from "./userReducers";

const reducers = {
  productsList: products,
  productDetails: product,
  cart,
  userLogin,
  userRegister,
};

export default combineReducers(reducers);
