import axios from "axios";
import { createAction } from "./../util";
import {
  BLOG_COMMENTS_FAILURE,
  BLOG_COMMENTS_LOADING,
  BLOG_COMMENTS_SUCCESS,
} from "./commentTypes";
import { getCookie } from "../../utils/cookies";

const baseUrl = process.env.REACT_APP_BASE_URL;

export const getBlogComments = (blogId) => async (dispatch) => {
  console.log(blogId);
  dispatch(createAction(BLOG_COMMENTS_LOADING));
  try {
    const res = await axios.get(`${baseUrl}/comments/${blogId}`);
    console.log(res);
    dispatch(createAction(BLOG_COMMENTS_SUCCESS, res.data));
  } catch (err) {
    dispatch(createAction(BLOG_COMMENTS_FAILURE));
  }
};

export const postComment = (comment, blogId) => async (dispatch) => {
  try {
    const token = getCookie("jwttoken");
    const res = await axios.post(
      `${baseUrl}/comments`,
      { comment, blogId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getBlogComments(blogId));
  } catch (err) {}
};
