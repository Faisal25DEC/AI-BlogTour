import axios from "axios";
import {
  INITIATE_LOGIN,
  LOGIN_USER,
  LOGOUT_USER,
  INITIATE_SIGNUP,
  SIGNUP_USER,
  GET_USER_DETAILS,
  GET_RANDOM_USERS,
  GET_PROFILE_USER,
  SIGNUP_ERROR,
} from "./userTypes";
import { removeToken } from "../../utils/cookies";
import { baseUrl } from "../util";

const createAction = (type, payload) => {
  return { type, payload };
};

export const getRandomUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/users/random/users`);
    console.log(res);
    dispatch(createAction(GET_RANDOM_USERS, res.data));
  } catch (err) {
    console.log("err", err);
  }
};

export const signupUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/users/signup`, user);
    console.log(res.data);
    dispatch(createAction(INITIATE_SIGNUP));
  } catch (err) {
    console.log(err.response.data);
    dispatch(createAction(SIGNUP_ERROR, err.response.data.msg));
  }
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, user, {
      withCredentials: "include",
    });
    console.log(res);
    if (res.data.token) {
      localStorage.setItem("jwt_token", res.data.token);

      dispatch(createAction(LOGIN_USER));
      window.location.href = "/";
    }
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => {
  removeToken("jwt_token");
  return createAction(LOGOUT_USER);
};

export const getUserDetails = (token) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/users`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);

    dispatch(createAction(GET_USER_DETAILS, res.data));
  } catch (err) {
    console.log(err);
  }
};

export const getProfileUser = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/users/${userId}`);
    console.log(res);
    dispatch(createAction(GET_PROFILE_USER, res.data));
  } catch (err) {
    console.log(err);
  }
};

export const initiateSignUp = () => {
  return createAction(INITIATE_SIGNUP);
};
export const initialLogin = () => {
  return createAction(INITIATE_LOGIN);
};
