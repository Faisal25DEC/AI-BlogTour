import axios from "axios";
import { GET_BLOG_LIKES } from "./likeTypes";
import { baseUrl, createAction } from "./../util";

export const getBlogLikes = (blogId) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/likes/${blogId}`);
    console.log(res);
    dispatch(createAction(GET_BLOG_LIKES, res.data));
  } catch (err) {
    console.log(err);
  }
};

export const likeBlog = (blogId, token, setLikeLoading) => async (dispatch) => {
  try {
    const res = await axios.patch(`${baseUrl}/likes/like/${blogId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    dispatch(getBlogLikes(blogId));
    setTimeout(() => {
      setLikeLoading(null);
    }, 1000);
  } catch (err) {
    console.log(err);
  }
};
export const unlikeBlog =
  (blogId, token, setLikeLoading) => async (dispatch) => {
    try {
      const res = await axios.patch(`${baseUrl}/likes/unlike/${blogId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getBlogLikes(blogId));
      setTimeout(() => {
        setLikeLoading(null);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
