import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import appApi from "./appApi";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

const reducer = combineReducers({
  user: userSlice,
  [appApi.reducerPath]: appApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  blackList: [appApi.reducerPath],
};

const persetedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persetedReducer,
  middleware: [thunk, appApi.middleware],
});

export default store;
