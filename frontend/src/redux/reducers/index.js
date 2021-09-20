import { combineReducers } from "redux";
import products from "./productsReducer";
import {
  productDetailsReducer,
  productDeleteReducer as productDelete,
  productCreateReducer as productCreate,
  productUpdateReducer as productUpdate,
} from "./productReducer";
import { cartReducer as cart } from "./cartReducers";
import {
  userLoginReducer as userLogin,
  userRegisterReducer as userRegister,
  userDetailsReducer as userDetails,
  userUpdateProfileReducer as userUpdateProfile,
  userListReducer as userList,
  userDeleteReducer as userDelete,
  userUpdateReducer as userUpdate,
} from "./userReducers";
import {
  orderCreateReducer as orderCreate,
  orderDetailsReducer as orderDetails,
  orderPayReducer as orderPay,
  myOrdersListReducer as myOrdersList,
} from "./orderReducers";

const reducers = {
  productsList: products,
  productDetails: productDetailsReducer,
  cart,
  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
  orderCreate,
  orderDetails,
  orderPay,
  myOrdersList,
  userList,
  userDelete,
  userUpdate,
  productDelete,
  productCreate,
  productUpdate,
};

export default combineReducers(reducers);
