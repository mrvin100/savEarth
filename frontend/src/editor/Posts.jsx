import Post from './../components/Post'
import { getUser } from '../services/requests'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Posts() {
  const [posts, setPosts] = useState('')
  const id = useParams().id
  useEffect(() => {
    fetchUser(id)
  }, [])
  async function fetchUser(id) {
    const res = await getUser(id)
    setPosts(res.blogs.reverse())
  }

  console.log(posts)
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
