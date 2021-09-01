import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/actionTypes";

const initialState = { cartItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    /* PENDING */
    case `${CART_REMOVE_ITEM}_PENDING`:
      return;

    /* FULFILLED */
    case `${CART_ADD_ITEM}_FULFILLED`:
      const item = action.payload.data;
      const existItem = state.cartItems.find(
        (el) => el.product === item.product
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((el) =>
            el.product === existItem.product ? item : el
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case `${CART_REMOVE_ITEM}_FULFILLED`:
      return;

    /* REJECTED */
    case `${CART_ADD_ITEM}_REJECTED`:
      return;
    case `${CART_REMOVE_ITEM}_REJECTED`:
      return;

    default:
      return state;
  }
};

export default cartReducer;
