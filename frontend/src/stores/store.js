import { configureStore } from "@reduxjs/toolkit";
import NotificationReducer from "./NotificationReducer";
import blogReducer from "./blogReducer";
import userReducer from "./userReducer";
import userBlogsReducer from "./userBlogsReducer";
import userInfosReducer from "./userInfosReducer";
import userCollectionReducer from "./userCollections";
import collectionReducer from "./collectionReducer";

const store = configureStore({
  reducer: {
    notification: NotificationReducer,
    blogs: blogReducer,
    user: userReducer,
    collections: collectionReducer,
    userBlogs: userBlogsReducer,
    userInfos: userInfosReducer,
    userCollections: userCollectionReducer,
  },
});

export default store;
