import { configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "./NotificationReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import userBlogsReducer from "./userBlogsReducer";
import userInfosReducer from "./userInfosReducer";

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blogs: blogReducer,
    user: userReducer,
    userBlogs: userBlogsReducer,
    userInfos: userInfosReducer,
  },
});

export default store;
