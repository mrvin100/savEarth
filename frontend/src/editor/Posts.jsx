import Post from './../components/Post'
import { getUser } from '../services/requests'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { setUserBlogs } from '../stores/userBlogsReducer'

export default function Posts() {
  const id = useParams().id
  const dispatch = useDispatch()

  let posts = useSelector((state) => state.userBlogs)
  if (posts[0] == undefined) {
    console.log('in react query user blogs')
    const res = useQuery({
      queryKey: ['userBlogs'],
      queryFn: () => getUser(id),
    })
    if (res.isLoading) return <div>loading...</div>

    if (res.isError) return <div>server internal error</div>
    const ans = [...res.data.blogs]

    posts = ans.reverse()
    dispatch(setUserBlogs(res.data))
  }
  console.log(posts[0])

  return (
    <section className='blog posts container'>
      <h1 className='heading'>My Posts</h1>
      <div className='box_container'>
        {posts &&
          posts.map((post) => {
            return <Post key={posts.indexOf(post)} post={post} />
          })}
      </div>
    </section>
  )
}
