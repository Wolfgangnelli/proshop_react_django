import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storeReducer from "./reducers/index.js";

const initialStore = {};

const middleware = [thunk];

const store = createStore(
  storeReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
