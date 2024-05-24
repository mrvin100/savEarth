import Header from "./components/Header";
import "./css/styles.css";
import Home from "./Home";
import Blog from "./Blog";
import Login from "./Login";
import Register from "./Register";
import AddPost from "./editor/AddPost";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/blog" element={<Blog />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/add-post" element={<AddPost />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
