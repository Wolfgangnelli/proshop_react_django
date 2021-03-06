import { combineReducers } from "redux";
import products from "./productsReducer";
import {
  productDetailsReducer,
  productDeleteReducer as productDelete,
  productCreateReducer as productCreate,
  productUpdateReducer as productUpdate,
  productCreateReviewReducer as productCreateReview,
  productTopRatedReducer as productTopRated,
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
  orderListReducer as orderList,
  orderDeliverReducer as orderDeliver,
} from "./orderReducers";

const reducers = {
  productsList: products,
  productDetails: productDetailsReducer,
  productTopRated,
  cart,

  userLogin,
  userRegister,
  userDetails,
  userUpdateProfile,
  userList,
  userDelete,
  userUpdate,

  productDelete,
  productCreate,
  productUpdate,
  productCreateReview,

  orderCreate,
  orderDetails,
  orderPay,
  myOrdersList,
  orderList,
  orderDeliver,
};

export default combineReducers(reducers);
