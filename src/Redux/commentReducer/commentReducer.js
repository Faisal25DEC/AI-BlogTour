import {
  BLOG_COMMENTS_FAILURE,
  BLOG_COMMENTS_LOADING,
  BLOG_COMMENTS_SUCCESS,
} from "./commentTypes";

const initialState = {
  blogComments: [],
  blogCommentsLoading: false,
  blogCommentsError: false,
};

export const commentReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case BLOG_COMMENTS_LOADING: {
      return {
        ...state,
        blogCommentsLoading: true,
      };
    }
    case BLOG_COMMENTS_SUCCESS: {
      return {
        ...state,
        blogCommentsLoading: false,
        blogCommentsError: false,
        blogComments: [...payload],
      };
    }
    case BLOG_COMMENTS_FAILURE: {
      return {
        ...state,
        blogCommentsError: true,
      };
    }
    default: {
      return state;
    }
  }
};
