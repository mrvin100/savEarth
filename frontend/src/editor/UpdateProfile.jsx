import { Link, useNavigate, useParams } from 'react-router-dom'

import { useState } from 'react'
import { updateUserRequest } from '../services/requests'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../stores/NotificationReducer'
import { setUserInfos } from '../stores/userInfosReducer'
import { setUser, updateUser } from '../stores/userReducer'
import FormData from 'form-data'

export default function UpdateProfile() {
  const user = useSelector(({ user }) => user)
  const [userInfos, setUserInfos] = useState({
    email: '',
    profession: '',
    number: '',
    username: '',
    updateUserImage: '',
  })
  // const [user, setUser] = useState(null)
  const id = useParams().id

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const queryClient = useQueryClient()

  function handleInputs(e) {
    const { value, name } = e.target
    setUserInfos({ ...userInfos, [name]: value })
  }

  async function updateUserInfos(data, id) {
    try {
      const res = await updateUserRequest(data, id)
      // dispatch(setUser(res))
      console.log(res)
      dispatch(updateUser(res))
      dispatch(
        setNotification({
          msg: 'modification completed successfully',
          clr: 'green',
        })
      )
      navigate(`/dashboard`)
    } catch (error) {
      dispatch(setNotification({ msg: error.response.data.error, clr: 'red' }))
    }
  }

  // const res = useQuery({
  //   queryKey: ['userInfos'],
  //   queryFn: fetchUser(id),
  // })

  // const submitMutation = useMutation({
  //   mutationKey: ['submit'],
  //   mutationFn: () => updateUserInfos,
  //   onSuccess: (updatedUser) => {
  //     dispatch(setUserInfos(updatedUser))
  //     setUser(updatedUser)
  //   },
  //   onError: (error) => dispatch(setNotification(error.response.data.error)),
  // })

  async function handleSubmit(e) {
    e.preventDefault()
    const data = new FormData()
    data.append('username', userInfos.username)
    data.append('email', userInfos.email)
    data.append('profession', userInfos.profession)
    data.append('updateUserImage', userInfos.updateUserImage)
    data.append('number', userInfos.number)
    // data.append('password', userInfos.password)

    updateUserInfos(data, user.id)
  }

  // const userinfo = useSelector(state => state.userInfos)

  return (
    <section className='login-register-section container'>
      <form
        // action=""
        // method="post"
        // enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className='form-container register'
      >
        <h1 className='heading'>update profile</h1>
        <div className='input_box'>
          <input
            id='username'
            type='text'
            placeholder='New username'
            name='username'
            maxLength='50'
            className='box'
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='email'
            type='email'
            placeholder='New email'
            name='email'
            maxLength='50'
            className='box'
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='profession'
            type='text'
            placeholder='New profession'
            name='profession'
            maxLength='50'
            className='box'
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='number'
            type='number'
            placeholder='New number'
            name='number'
            min='000000000'
            max='999999999'
            className='box'
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='pass'
            type='password'
            placeholder='Enter Password'
            name='password'
            maxLength='20'
            className='box pass'
            // onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <label htmlFor='image' className='label'>
            choose your profile image
            <input
              id='image'
              type='file'
              name='updateUserImage'
              className='articleImage box'
              onChange={({ target }) =>
                setUserInfos({ ...userInfos, updateUserImage: target.files[0] })
              }
            />
          </label>
        </div>
        <input
          type='submit'
          value='update'
          name='update-profile'
          className='btn'
        />
      </form>
    </section>
  )
}
