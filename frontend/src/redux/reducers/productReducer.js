import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_CREATE_REVIEW_REQUEST,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
} from "../actions/actionTypes";

const initialState = { product: { reviews: [] } };

export const productDetailsReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_DELETE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
        message: payload,
      };
    case PRODUCT_DELETE_FAIL:
      return {
        loading: false,
        error: payload.message,
      };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: payload,
      };
    case PRODUCT_CREATE_FAIL:
      return {
        loading: false,
        error: payload.message,
      };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (
  state = { product: {} },
  { type, payload }
) => {
  switch (type) {
    case PRODUCT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        product: payload,
      };
    case PRODUCT_UPDATE_FAIL:
      return {
        loading: false,
        error: payload.message,
      };
    case PRODUCT_UPDATE_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};

export const productCreateReviewReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case PRODUCT_CREATE_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case PRODUCT_CREATE_REVIEW_SUCCESS:
      return {
        loading: false,
        success: true,
        message: payload,
      };
    case PRODUCT_CREATE_REVIEW_FAIL:
      return {
        loading: false,
        error: payload,
      };
    case PRODUCT_CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};
