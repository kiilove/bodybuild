import { configureStore } from "@reduxjs/toolkit";
import loginActionSlice from "./loginSlice";

import playerlistSlice from "./playerlistSlice";

export const playerStore = configureStore({
  reducer: {
    playerlist: playerlistSlice,
  },
});
export const loginUserStore = configureStore({
  reducer: {
    loginAction: loginActionSlice,
  },
});
