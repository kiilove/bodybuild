import { createSlice } from "@reduxjs/toolkit";
import { PlayerOrder } from "../Data";

const initialState = {
  orderNum: 0,
};

const players = PlayerOrder;

export const playerlistSlice = createSlice({
  name: "playerlist",
  initialState,
  reducers: {
    next: (state) => {
      if (state.orderNum < players.length - 1) {
        state.orderNum += 1;
      }
    },
    prev: (state) => {
      if (state.orderNum > 0) {
        state.orderNum -= 1;
      }
    },
    init: (state) => {
      state.orderNum = 0;
    },
  },
});

export const { next, prev, init } = playerlistSlice.actions;

export default playerlistSlice.reducer;
