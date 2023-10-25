import { applyMiddleware, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { rootReducer } from "./rootReducer";

const middleware = applyMiddleware(thunk);

export const store = legacy_createStore(rootReducer, middleware);
