import { deleteCollectionRequest, getUser } from '../services/requests'
import { Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useMutation, useQuery } from '@tanstack/react-query'
import { setUserBlogs } from '../stores/userBlogsReducer'
import Collect from '../components/Collect'
import {
  deleteUserCollection,
  setUserCollections,
} from '../stores/userCollections'
import { setNotification } from '../stores/NotificationReducer'

export default function MyCollections() {
  const id = useParams().id
  const dispatch = useDispatch()

  let collections = useSelector((state) => state.userCollections)

  async function fetchUserCollections(id) {
    const { collections } = await getUser(id)
    dispatch(setUserCollections(collections))
    console.log(collections)
    return collections
  }

  function handleDeleteCollection(id) {
    deletePostMutation.mutate(id)
  }

  const res = useQuery({
    queryKey: ['userCollection'],
    queryFn: () => fetchUserCollections(id),
  })

  const deletePostMutation = useMutation({
    mutationFn: deleteCollectionRequest,
    onSuccess: (res) => {
      dispatch(deleteUserCollection(res))
    },
    onError: (error) =>
      setNotification({ msg: error.response.data.error, clr: 'red' }),
  })

  if (res.isLoading) return <div>loading...</div>

  if (res.isError) return <div>server internal error</div>

  return (
    <section className='collections my_collections container'>
      <h1 className='heading'>My collections</h1>
      <div className='box_container'>
        <div className='box'>
          <h3 className='heading'>add new collection</h3>
          <Link to='/add-collect' className='btn'>
            add collection
          </Link>
        </div>
        {collections &&
          collections.map((collect) => {
            return (
              <Collect
                key={collections.indexOf(collect)}
                post={collect}
                Delete={handleDeleteCollection}
              />
            )
          })}
      </div>
    </section>
  )
}
