import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_CURRENT_PRODUCT_STATE_DETAILS,
  GET_PRODUCT_FAILURE,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_RANDOM_PRODUCTS,
  GET_SINGLE_PRODUCT,
  GET_STATE_PRODUCTS,
  SET_STATE_PRODUCTS_NULL,
} from "./blogTypes";

const createAction = (type, payload) => {
  return { type, payload };
};

const baseUrl = `http://localhost:7700`;

export const getAllProducts = () => async (dispatch) => {
  const apiRes = axios
    .get(`${baseUrl}/blogs`)
    .then((res) => dispatch(createAction(GET_ALL_PRODUCTS, res.data)));
};

export const getProducts = (page) => async (dispatch) => {
  dispatch(createAction(GET_PRODUCT_REQUEST));
  const apiRes = axios
    .get(`${baseUrl}/blogs?page=${page}&limit=9`)
    .then((res) => {
      console.log(res.data);
      dispatch(createAction(GET_PRODUCT_SUCCESS, res.data));
    })
    .catch(() => {
      dispatch(GET_PRODUCT_FAILURE);
    });
};
export const getRandomProducts = () => (dispatch) => {
  const apiRes = axios.get(`${baseUrl}/blogs`).then((res) => {
    console.log(res.data);
    dispatch(createAction(GET_RANDOM_PRODUCTS, res.data));
  });
};
export const getUserProducts = (state) => async (dispatch) => {};

export const getStateProducts = (state) => async (dispatch) => {
  console.log(state);
  const apiRes = axios
    .get(`${baseUrl}/blogs?state_like=${state}`)
    .then((res) => {
      console.log(res.data);
      dispatch(createAction(GET_STATE_PRODUCTS, res.data));
    });
};

export const setStateProductsNull = () => {
  return createAction(SET_STATE_PRODUCTS_NULL);
};

export const getSingleProduct = (id) => async (dispatch) => {
  const apiRes = axios.get(`${baseUrl}/blogs/${id}`).then((res) => {
    console.log(res);
    dispatch(createAction(GET_SINGLE_PRODUCT, res.data));
  });
};

export const getCurrentProductStateDetails = (state) => async (dispatch) => {
  const apiRes = axios.get(`${baseUrl}/state?name=${state}`).then((res) => {
    dispatch(createAction(GET_CURRENT_PRODUCT_STATE_DETAILS, res.data));
  });
};
