import { createSlice } from "@reduxjs/toolkit";
import { getData } from "../services/requests";

const collectionSlice = createSlice({
  name: "collections",
  initialState: [],
  reducers: {
    setCollections(state, action) {
      return action.payload;
    },
  },
});

export function initialBlogs() {
  return async (dispatch) => {
    const res = await getData("collections");
    dispatch(setCollections(res));
  };
}

export const { setCollections } = collectionSlice.actions;
export default collectionSlice.reducer;
