import Post from './../components/Post'
import { deleteBlogRequest, getUser } from '../services/requests'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery, useMutation } from '@tanstack/react-query'
import { deleteUserBlog, setUserBlogs } from '../stores/userBlogsReducer'
import { setNotification } from '../stores/NotificationReducer'

export default function Posts() {
  let posts = useSelector((state) => state.userBlogs)

  const id = useParams().id
  const dispatch = useDispatch()

  async function fetchUserBlogs(id) {
    const { blogs } = await getUser(id)
    dispatch(setUserBlogs(blogs))

    return blogs
  }

  function handleDeleteBlog(id) {
    deletePostMutation.mutate(id)
  }

  const res = useQuery({
    queryKey: ['userBlogs'],
    queryFn: () => fetchUserBlogs(id),
  })

  const deletePostMutation = useMutation({
    mutationFn: deleteBlogRequest,
    onSuccess: (id) => {
      dispatch(deleteUserBlog(id))
    },
    onError: (error) =>
      setNotification({ msg: error.response.data.error, clr: 'red' }),
  })

  if (res.isLoading) return <div>loading...</div>

  if (res.isError) return <div>server internal error</div>

  return (
    <section className='blog posts container'>
      <h1 className='heading'>My Posts</h1>
      <div className='box_container'>
        {posts &&
          posts.map((post) => {
            return (
              <Post
                key={posts.indexOf(post)}
                post={post}
                Delete={handleDeleteBlog}
              />
            )
          })}
      </div>
    </section>
  )
}
