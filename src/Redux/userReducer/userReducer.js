import {
  GET_USER_DETAILS,
  GOOGLE_SIGN_IN,
  INITIATE_LOGIN,
  INITIATE_SIGNUP,
  LOGIN_USER,
  LOGOUT_USER,
} from "./userTypes";

const initialState = {
  isAuth: false,
  userDetails: null,
  signUp: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case INITIATE_SIGNUP: {
      return {
        ...state,
        isAuth: false,
        userDetails: null,
        signUp: true,
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        isAuth: true,
      };
    }
    case GOOGLE_SIGN_IN: {
      return {
        ...state,
        isAuth: true,
      };
    }
    case GET_USER_DETAILS: {
      return {
        ...state,
        isAuth: true,
        userDetails: payload,
      };
    }
    case LOGOUT_USER: {
      return {
        ...state,
        isAuth: false,
        userDetails: null,
      };
    }
    case INITIATE_LOGIN: {
      return {
        ...state,
        isAuth: false,
        userDetails: null,
        signUp: false,
      };
    }

    default: {
      return state;
    }
  }
};
