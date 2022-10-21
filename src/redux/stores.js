import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const playerStore = configureStore({
  reducer: {
    player: counterReducer,
  },
});
