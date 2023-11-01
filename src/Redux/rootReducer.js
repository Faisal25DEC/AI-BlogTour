import { combineReducers } from "redux";
import { userReducer } from "./userReducer/userReducer";
import { blogReducer } from "./blogReducer/blogReducer";
import { commentReducer } from "./commentReducer/commentReducer";
import { followerReducer } from "./followerReducer/followerReducer";
import { likeReducer } from "./likeReducer/likeReducer";

export const rootReducer = combineReducers({
  userReducer,
  blogReducer,
  commentReducer,
  followerReducer,
  likeReducer,
});
