import { GET_FOLLOWERS_FOLLOWING } from "./followerTypes";

const initialState = {
  followers: [],
  following: [],
};
export const followerReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_FOLLOWERS_FOLLOWING: {
      return {
        ...state,
        followers: payload.followers,
        following: payload.following,
      };
    }
    default: {
      return state;
    }
  }
};
