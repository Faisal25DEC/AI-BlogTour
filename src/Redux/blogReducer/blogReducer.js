import {
  GET_ALL_PRODUCTS,
  GET_CURRENT_PRODUCT_STATE_DETAILS,
  GET_PRODUCT_SUCCESS,
  GET_RANDOM_PRODUCTS,
  GET_SINGLE_PRODUCT,
  GET_STATE_PRODUCTS,
  SET_STATE_PRODUCTS_NULL,
} from "./blogTypes";

const initialState = {
  productsPerPage: [],
  stateProducts: [],
  totalProducts: [],
  randomProducts: [],

  currentProduct: {},
  currentProductStateDetails: {},
  isLoading: false,
  isError: false,
};

export const blogReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_PRODUCTS: {
      return {
        ...state,
        totalProducts: [...payload],
      };
    }
    case GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        productsPerPage: [...payload],
      };
    }
    case GET_STATE_PRODUCTS: {
      return {
        ...state,
        stateProducts: [...payload],
      };
    }
    case GET_RANDOM_PRODUCTS: {
      const tempRandomArray = [];
      for (let i = 0; i < 6; i++) {
        const idx = Math.floor(Math.random() * payload.length);
        tempRandomArray.push(payload[idx]);
      }
      console.log(tempRandomArray);
      return {
        ...state,
        randomProducts: tempRandomArray,
      };
    }
    case SET_STATE_PRODUCTS_NULL: {
      return {
        ...state,
        stateProducts: [],
      };
    }
    case GET_SINGLE_PRODUCT: {
      return {
        ...state,
        currentProduct: { ...payload },
      };
    }
    case GET_CURRENT_PRODUCT_STATE_DETAILS: {
      return {
        ...state,
        currentProductStateDetails: { ...payload },
      };
    }
    default: {
      return state;
    }
  }
};
