import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserBlogs } from '../stores/userBlogsReducer'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/requests'
import { getUserIds } from '../stores/userReducer'

export default function Dashboard() {
  const user = useSelector(({ user }) => {
    console.log(user)
    return user
  })

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserIds())
  }, [])
  const res = useQuery({
    queryKey: ['userBlogs'],
    queryFn: () => getUser(user.id),
    retry: 2,
  })

  if (res.isLoading) return <div>loading...</div>

  if (res.isError) return <div>server internal error</div>

  dispatch(setUserBlogs(res.data))

  return (
    <section className='dashboard container'>
      <h1 className='heading'>Your welcome {user.email}</h1>
      <div className='box_container'>
        <div className='box'>
          <h3 className='heading'>about me</h3>
          <span className='subtitle'>profile</span>
          <Link className='btn'>view profile</Link>
        </div>
        <div className='box'>
          <h3 className='heading'>posts</h3>
          <span className='subtitle'>{res.data.blogs.length}</span>
          <Link to={`/posts/${user.id}`} className='btn'>
            view posts
          </Link>
        </div>
        <div className='box'>
          <h3 className='heading'>Comments</h3>
          <span className='subtitle'>12+</span>
          <Link className='btn'>Read comments</Link>
        </div>
        <div className='box'>
          <h3 className='heading'>Donations</h3>
          <span className='subtitle'>02</span>
          <Link className='btn'>View Donations</Link>
        </div>
      </div>
    </section>
  )
}
