import Post from './../components/Post'
import { getUser } from '../services/requests'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { setUserBlogs } from '../stores/userBlogsReducer'

export default function Posts() {
  // const [posts, setPosts] = useState('')
  const id = useParams().id
  const dispatch = useDispatch()
  // let posts
  // useEffect(() => {
  //   fetchUser(id)
  // }, [])
  // async function fetchUser(id) {
  //   const res = await getUser(id)
  //   setPosts(res.blogs.reverse())
  // }
  const posts = useSelector((state) => state.userBlogs)
  // if (blogs) {
  //   log('in react query user blogs')
  //   const res = useQuery({
  //     queryKey: ['userBlogs'],
  //     queryFn: () => getUser(id),
  //   })
  //   if (res.isLoading) return <div>loading...</div>

  //   if (res.isError) return <div>server internal error</div>
  //   posts = res.data
  //   dispatch(setUserBlogs(res.data))
  // } else {
  //   posts = blogs
  // }
  console.log(posts)
  return (
    <section className='blog posts container'>
      <h1 className='heading'>My Posts</h1>
      <div className='box_container'>
        {posts &&
          posts.blogs.map((post) => {
            return <Post key={posts.blogs.indexOf(post)} post={post} />
          })}
      </div>
    </section>
  )
}
