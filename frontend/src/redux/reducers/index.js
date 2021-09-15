import { combineReducers } from "redux";
import products from "./productsReducer";
import product from "./productReducer";
import { cartReducer as cart } from "./cartReducers";
import {
  userLoginReducer as userLogin,
  userRegisterReducer as userRegister,
  userDetailsReducer as userDetails,
  userUpdateProfileReducer as userUpdateProfile,
} from "./userReducers";
import {
  orderCreateReducer as orderCreate,
  orderDetailsReducer as orderDetails,
  orderPayReducer as orderPay,
} from "./orderReducers";

const reducers = {
  productsList: products,
  productDetails: product,
  cart,
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
  orderCreate,
  orderDetails,
  orderPay,
};

export default combineReducers(reducers);
