import axios from "axios";
import { baseUrl, createAction } from "../util";
import { GET_FOLLOWERS_FOLLOWING } from "./followerTypes";
import { getCookie } from "../../utils/cookies";

export const getFollowersFollowing = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/followers/${userId}`);
    console.log(res);
    dispatch(createAction(GET_FOLLOWERS_FOLLOWING, res.data));
  } catch (err) {
    console.log(err);
  }
};

export const followUser = (followerId, userId) => async (dispatch) => {
  try {
    const token = getCookie("jwttoken");
    const res = await axios.post(
      `${baseUrl}/followers`,
      { followerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getFollowersFollowing(userId));
  } catch (err) {
    console.log(err);
  }
};

export const unfollowUser = (followerId, userId) => async (dispatch) => {
  const token = getCookie("jwttoken");
  try {
    const res = await axios.patch(
      `${baseUrl}/followers/decrease`,
      { followerId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getFollowersFollowing(userId));
  } catch (err) {
    console.log(err);
  }
};
