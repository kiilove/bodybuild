import { createSlice } from "@reduxjs/toolkit";
import { PlayerOrder } from "../Data";
import {
  addDoc,
  collection,
  doc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

const handlePlayerUpdate = async (props) => {
  const res = await setDoc(doc(db, "currentOrder", "용인"), {
    orderNum: props.orderNum,
  });
};

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
        handlePlayerUpdate({ orderNum: state.orderNum });
      }
    },
    prev: (state) => {
      if (state.orderNum > 0) {
        state.orderNum -= 1;
        handlePlayerUpdate({ orderNum: state.orderNum });
      }
    },
    init: (state) => {
      state.orderNum = 0;
      handlePlayerUpdate({ orderNum: state.orderNum });
    },
  },
});

export const { next, prev, init } = playerlistSlice.actions;

export default playerlistSlice.reducer;
