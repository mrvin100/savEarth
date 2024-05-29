import { useDispatch, useSelector } from 'react-redux'
import Post from './components/Post'
import postImg from './img/post6.png'
import user from './img/user-avatar.svg'
import reviewer from './img/user-avatar1.svg'
import { useQuery } from '@tanstack/react-query'
import { getUser } from './services/requests'
import { useParams } from 'react-router-dom'
import { setUserBlogs } from './stores/userBlogsReducer'

export default function ViewPost() {
  const blogId = useParams().id
  const dispatch = useDispatch()
  const userId = useSelector(({ user }) => user)
  let posts = useSelector(({ userBlogs }) => userBlogs)
  const blog = useSelector(({ blogs }) => {
    return blogs.find((b) => b.id === blogId)
  })

  async function fetchUserBlogs(id) {
    console.log(id)
    const res = await getUser(id)
    dispatch(setUserBlogs(res.blogs))
    return res.blogs
  }

  const res = useQuery({
    queryKey: ['viewBlog'],
    queryFn: () => fetchUserBlogs(userId.id),
    retry: 2,
  })

  if (res.isLoading) return <div>loading...</div>

  if (res.isError) return <div>server internal error</div>

  console.log(blog, posts)

  return (
    <>
      <section className='view-post container'>
        <div className='intro'>
          <img className='post_img' src={blog.src} alt='blog image' />
          <img src={user} alt='user avatar' className='profile_img' />
        </div>
        <div className='details'>
          <div className='infos'>
            <span className='date'>{blog.date}</span>
            <span className='name'>{blog.email}</span>
          </div>
          <p className='description'>{blog.description}</p>
          <div className='tags'>
            {blog.tags.map((p, key) => (
              <span className='tag' key={key}>
                {p}
              </span>
            ))}

            {/* <span className='tag'>save</span>
            <span className='tag'>Research</span> */}
          </div>
          <div className='consulting'>
            <span>
              +4K.<i className='like bx bx-like icon'></i>
            </span>
            <span>
              +1k<i className='read bx bx-bookmark icon'></i>
            </span>
            <span>
              +24k.<i className='messages bx bx-message icon'></i>
            </span>
          </div>
        </div>
        <h2 className='heading'>related comments</h2>
        <div className='comments'>
          <div className='comment'>
            <p>
              This artile is to interresant because it&apos;s cover all the
              concepts about climate.
            </p>
            <img src={reviewer} alt='reviewer' className='user_img' />
          </div>
          <div className='comment'>
            <p>
              This artile is to interresant because it&apos;s cover all the
              concepts about climate.
            </p>
            <img src={reviewer} alt='reviewer' className='user_img' />
          </div>
        </div>
      </section>
      <section className='blog container'>
        <h2
          className='heading'
          style={{ textAlign: 'center', marginBottom: '1rem' }}
        >
          more posts about author
        </h2>
        <div className='box_container'>
          {[...posts].slice(posts.length - 3).map((post) => {
            return <Post key={posts.indexOf(post)} post={post} />
          })}
        </div>
      </section>
    </>
  )
}
