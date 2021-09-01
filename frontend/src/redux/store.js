import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storeReducer from "./reducers/index.js";
import logger from "redux-logger";
import promise from "redux-promise-middleware";

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialStore = {
  cart: { cartItems: cartItemsFromStorage },
};

const middleware = [thunk, logger, promise];

const store = createStore(
  storeReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
