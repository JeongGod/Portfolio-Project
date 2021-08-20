import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import token from "./token";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  token,
});

export default persistReducer(persistConfig, rootReducer);
