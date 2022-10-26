import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: undefined,
  group: "guest",
};
export const loginActionSlice = createSlice({
  name: "loginAction",
  initialState,
  reducers: {
    isLogin: (state, action) => {
      // state.email = action.email;
      // state.group = action.group;

      state.email = action.payload.email;
      state.group = action.payload.group;
    },
  },
});

export const { isLogin } = loginActionSlice.actions;

export default loginActionSlice.reducer;
