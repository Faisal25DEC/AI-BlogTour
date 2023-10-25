import { combineReducers } from "redux";
import { userReducer } from "./userReducer/userReducer";
import { blogReducer } from "./blogReducer/blogReducer";

export const rootReducer = combineReducers({
  userReducer,
  blogReducer,
});
