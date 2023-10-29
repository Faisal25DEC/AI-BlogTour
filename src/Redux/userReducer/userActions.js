import axios from "axios";
import {
  INITIATE_LOGIN,
  LOGIN_USER,
  LOGOUT_USER,
  INITIATE_SIGNUP,
  SIGNUP_USER,
  GET_USER_DETAILS,
} from "./userTypes";
import { removeCookie } from "../../utils/cookies";

const createAction = (type, payload) => {
  return { type, payload };
};

const baseUrl = `http://localhost:7700`;

export const signupUser = (user) => async (dispatch) => {
  const res = await axios.post(`${baseUrl}/users/signup`, user);
  console.log(res.data);
  dispatch(loginUser(user));
};

export const loginUser = (user) => async (dispatch) => {
  try {
    const res = await axios.post(`${baseUrl}/users/login`, user, {
      withCredentials: "include",
    });
    console.log(res);

    dispatch(createAction(LOGIN_USER));
  } catch (err) {
    console.log(err);
  }
};

export const logoutUser = () => {
  removeCookie("jwttoken");
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

export const initiateSignUp = () => {
  return createAction(INITIATE_SIGNUP);
};
export const initialLogin = () => {
  return createAction(INITIATE_LOGIN);
};
