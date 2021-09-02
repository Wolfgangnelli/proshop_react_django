import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actions/actionTypes";

const initialState = { cartItems: [] };

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    /* FULFILLED */
    case CART_ADD_ITEM:
      const item = action.payload;
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
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default cartReducer;
