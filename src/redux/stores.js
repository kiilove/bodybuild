import { configureStore } from "@reduxjs/toolkit";

import playerlistSlice from "./playerlistSlice";

export const playerStore = configureStore({
  reducer: {
    playerlist: playerlistSlice,
  },
});
