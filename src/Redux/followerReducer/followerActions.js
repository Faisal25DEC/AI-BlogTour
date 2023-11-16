import axios from "axios";
import { baseUrl, createAction } from "../util";
import { GET_FOLLOWERS_FOLLOWING } from "./followerTypes";
import { getToken } from "../../utils/cookies";

export const getFollowersFollowing = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/followers/${userId}`);

    dispatch(createAction(GET_FOLLOWERS_FOLLOWING, res.data));
  } catch (err) {
    console.log(err);
  }
};

export const followUser =
  (followerId, userId, setFollowerLoading) => async (dispatch) => {
    try {
      const token = getToken("jwt_token");
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
      setTimeout(() => {
        setFollowerLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

export const unfollowUser =
  (followerId, userId, setFollowerLoading) => async (dispatch) => {
    const token = getToken("jwt_token");
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
      setTimeout(() => {
        setFollowerLoading(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };
