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
import { useEffect, useState } from 'react'
import { getUser, setToken } from './services/requests'
import Notification from './components/Notification'

import { useQuery } from '@tanstack/react-query'
import { initialBlogs } from './stores/blogReducer'
import { useDispatch } from 'react-redux'
import { setUserBlogs } from './stores/userBlogsReducer'

function App() {
  const [userData, setUserData] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    const data = JSON.parse(window.localStorage.getItem('userToken'))
    setUserData(data)
    setToken(data)

    dispatch(initialBlogs())
  }, [])

  // if (userData) {
  //   const res = useQuery({
  //     queryKey: ['userBlogs'],
  //     queryFn: () => getUser(userData.id),
  //   })
  //   if (res.isLoading) return <div>loading...</div>

  //   console.log(res.data)

  //   dispatch(setUserBlogs(res.data))
  // }

  return (
    <BrowserRouter>
      <Notification />
      <Header />
      <Routes>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/blog' element={<Blog />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/add-post' element={<AddPost />}></Route>
        <Route path='/update-post' element={<UpdatePost />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/posts/:id' element={<Posts />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
