import { combineReducers, configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";

const rootReducer = combineReducers({
  menu : menuReducer,
})

const store = configureStore({
  reducer : rootReducer,
})

export default store;