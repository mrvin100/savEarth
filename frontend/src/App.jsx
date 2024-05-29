import Header from './components/Header'
import './css/styles.css'
import Home from './Home'
import Blog from './Blog'
import Login from './Login'
import Register from './Register'
import AddPost from './editor/AddPost'
import Dashboard from './editor/Dashboard'
import UpdatePost from './editor/UpdatePost'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Posts from './editor/Posts'
import { useEffect } from 'react'
import { setToken } from './services/requests'
import Notification from './components/Notification'
import { initialBlogs } from './stores/blogReducer'
import { useDispatch } from 'react-redux'
import { setUser } from './stores/userReducer'

import ViewPost from './ViewPost'
import UpdateProfile from './editor/UpdateProfile'
import MyCollections from './editor/MyCollections'

export default function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    const pureToken = window.localStorage.getItem('userToken')
    const data = pureToken ? JSON.parse(pureToken) : null
    if (data) {
      setToken(data)
      dispatch(setUser(data))
    }
    dispatch(initialBlogs())
  }, [])

  return (
    <BrowserRouter>
      <Notification />
      <Header />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/add-post' element={<AddPost />}></Route>
        <Route path='/update-post' element={<UpdatePost />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/posts/:id' element={<Posts />}></Route>
        <Route path='/my-collections' element={<MyCollections />}></Route>
        <Route path='/view-post/:id' element={<ViewPost />}></Route>
        <Route path='/update-profile/:id' element={<UpdateProfile />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
