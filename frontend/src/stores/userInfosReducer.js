import { createSlice } from "@reduxjs/toolkit";

const userInfosReducer = createSlice({
  name: "userInfos",
  initialState: [],
  reducers: {
    setUserInfos(state, action) {
      return action.payload;
    },
    removeUserInfos(state, action) {
      return null;
    },
  },
});

export const { setUserInfos, removeUserInfos } = userInfosReducer.actions;
export default userInfosReducer;
