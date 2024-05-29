import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserBlogs } from '../stores/userBlogsReducer'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '../services/requests'

export default function Dashboard() {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => user)
  const posts = useSelector(({ userBlogs }) => userBlogs)

  async function fetchUser() {
    const res = await getUser(user.id)
    dispatch(setUserBlogs(res.blogs))
    return res
  }

  const res = useQuery({
    queryKey: ['userBlogs'],
    queryFn: fetchUser,
    retry: 2,
  })

  if (res.isLoading) return <div>loading...</div>

  if (res.isError) return <div>server internal error</div>

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
          <span className='subtitle'>{posts.length}</span>
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
