import { getUser } from '../services/requests'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { setUserBlogs } from '../stores/userBlogsReducer'
import Collect from '../components/Collect'

export default function MyCollections() {
  const id = useParams().id
  const dispatch = useDispatch()

  let posts = useSelector((state) => state.userBlogs)

  async function fetchUserBlogs(id) {
    const { blogs } = await getUser(id)
    dispatch(setUserBlogs(blogs))

    return blogs
  }

  // function handleDeleteBlog(id) {
  //   deletePostMutation.mutate(id)
  // }

  const res = useQuery({
    queryKey: ['userBlogs'],
    queryFn: () => fetchUserBlogs(id),
  })

  // const deletePostMutation = useMutation({
  //   mutationFn: deleteBlogRequest,
  //   onSuccess: (id) => {
  //     dispatch(deleteUserBlog(id))
  //   },
  //   onError: (error) =>
  //     setNotification({ msg: error.response.data.error, clr: 'red' }),
  // })

  if (res.isLoading) return <div>loading...</div>

  if (res.isError) return <div>server internal error</div>

  return (
    <section className='collections container'>
      <h1 className='heading'>My collections</h1>
      <div className='box_container'>
        {posts &&
          posts.map((collect) => {
            return <Collect key={posts.indexOf(collect)} post={collect} />
          })}
      </div>
    </section>
  )
}
