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

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('userToken'))
    userData && setToken(userData)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
    </QueryClientProvider>
  )
}

export default App
