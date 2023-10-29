import axios from "axios";
import { baseUrl, createAction } from "../util";
import { GET_FOLLOWERS_FOLLOWING } from "./followerTypes";

export const getFollowersFollowing = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/followers/${userId}`);
    console.log(res);
    dispatch(createAction(GET_FOLLOWERS_FOLLOWING, res.data));
  } catch (err) {
    console.log(err);
  }
};
