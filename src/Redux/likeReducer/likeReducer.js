import { GET_BLOG_LIKES, LIKE_BLOG, UNLIKE_BLOG } from "./likeTypes";

const initialState = {
  likes: [],
};
export const likeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_BLOG_LIKES:
      return {
        ...state,
        likes: [...payload],
      };

    default:
      return state;
  }
};
