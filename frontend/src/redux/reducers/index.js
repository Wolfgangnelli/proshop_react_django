import { combineReducers } from "redux";
import products from "./productReducer";

const reducers = {
  products,
};

export default combineReducers(reducers);
