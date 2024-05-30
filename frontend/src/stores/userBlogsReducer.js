import { createSlice, current } from "@reduxjs/toolkit";
import { deleteBlogRequest, updateBlogRequest } from "../services/requests";
import { setNotification } from "./NotificationReducer";

const userBlogsReducer = createSlice({
  name: "userBlogs",
  initialState: [],
  reducers: {
    setUserBlogs(state, action) {
      console.log(action.payload);
      console.log(action.payload);
      const ans = [...action.payload];
      return ans.reverse();
    },
    appendUserBlogs(state, action) {
      console.log("append", action.payload);
      return state.concat(action.payload);
    },
    deleteUserBlog(state, action) {
      const id = action.payload;
      return state.filter((s) => s.id !== id);
    },
    updateUserBlog(state, action) {
      const updatedBlog = action.payload;
      return state.filter((s) => (s.id === updatedBlog.id ? updatedBlog : s));
    },
  },
});

export function updatePost(newPost) {
  return async (dispatch) => {
    try {
      const res = await updateBlogRequest(newPost);
      dispatch(updateUserBlog(res));
      dispatch(
        setNotification({
          msg: `post updated successfully: ${res.title}`,
          clr: "green",
        })
      );
    } catch (error) {
      dispatch(setNotification({ msg: error.response.data.error, clr: "red" }));
    }
  };
}

export const { setUserBlogs, appendUserBlogs, deleteUserBlog, updateUserBlog } =
  userBlogsReducer.actions;
export default userBlogsReducer.reducer;
