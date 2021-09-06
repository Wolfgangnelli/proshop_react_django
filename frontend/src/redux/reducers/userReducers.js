import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER,
} from "../actions/actionTypes";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
      };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload.data,
      };
    case USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload.message,
      };
    case `${USER_LOGOUT}_FULFILLED`:
      return {};
    default:
      return state;
  }
};
