import "./css/styles.css";

import Header from "./components/Header";
import Home from "./Home";
import Blog from "./Blog";
import ViewPost from "./ViewPost";
import Login from "./Login";
import Register from "./Register";
import AddPost from "./editor/AddPost";
import Dashboard from "./editor/Dashboard";
import UpdatePost from "./editor/UpdatePost";
import Posts from "./editor/Posts";
import UpdateProfile from "./editor/UpdateProfile";
import Collections from "./Collections";
import MyCollections from "./editor/MyCollections";
import Notification from "./components/Notification";

import { useEffect } from "react";
import { setToken } from "./services/requests";
import { initialBlogs } from "./stores/blogReducer";
import { useDispatch } from "react-redux";
import { setUser } from "./stores/userReducer";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AddCollect from "./editor/AddCollect";
import UpdateCollect from "./editor/UpdateCollect";
import ViewCollect from "./ViewCollect";
import Donate from "./editor/Donate";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const pureToken = window.localStorage.getItem("userToken");
    const data = pureToken ? JSON.parse(pureToken) : null;
    if (data) {
      setToken(data);
      dispatch(setUser(data));
    }
    dispatch(initialBlogs());
  }, []);

  return (
    <BrowserRouter>
      <Notification />
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/collections" element={<Collections />}></Route>
        <Route path="/donate" element={<Donate />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/add-post" element={<AddPost />}></Route>
        <Route path="/update-collect/:id" element={<UpdateCollect />}></Route>
        <Route path="/update-post/:id" element={<UpdatePost />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/posts/:id" element={<Posts />}></Route>
        <Route path="/my-collections/:id" element={<MyCollections />}></Route>
        <Route path="/add-collect" element={<AddCollect />}></Route>
        <Route path="/view-post/:id" element={<ViewPost />}></Route>
        <Route path="/view-collect/:id" element={<ViewCollect />}></Route>
        <Route path="/update-profile/:id" element={<UpdateProfile />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
