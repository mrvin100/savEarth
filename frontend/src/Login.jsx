import { useState } from 'react'
import loginImg from './img/user-with-bag.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginRequest, setToken } from './services/requests'
import { useMutation } from '@tanstack/react-query'
import { setNotification } from './stores/NotificationReducer'
import { useDispatch } from 'react-redux'
import { setUser } from './stores/userReducer'

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
    username: '',
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function handleInputs(e) {
    const { value, name } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      dispatch(setUser(res))
      setToken(res)
      dispatch(setNotification({ msg: 'login successfull', clr: 'green' }))
      navigate('/dashboard')
    },
    onError: (error) => {
      console.log(error)
      dispatch(setNotification({ msg: error.response.data.error, clr: 'red' }))
    },
  })

  async function handleSubmit(e) {
    e.preventDefault()
    loginMutation.mutate(userCredentials)
  }

  return (
    <section className='login-register-section container'>
      <div className='content'>
        <h1 className='heading'>
          Sign in
          <span>
            {' '}
            to <strong>savEarth </strong>is simply.
          </span>
        </h1>
        <p>
          If you don’t have an account <br />
          You can{' '}
          <Link to='/register' className='link'>
            Register here!
          </Link>
        </p>
        <img src={loginImg} alt='user with bag' />
      </div>
      <form
        // action=''
        // method='post'
        // enctype='multipart/form-data'
        className='form-container login'
        onSubmit={handleSubmit}
      >
        <h1 className='heading'>Sign in</h1>
        <div className='input_box'>
          <input
            id='login-email'
            type='text'
            placeholder='Enter username'
            name='username'
            maxLength='50'
            className='box'
            value={userCredentials.username}
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            name='email'
            maxLength='50'
            className='box'
            value={userCredentials.email}
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='pass'
            type='password'
            placeholder='Password'
            name='password'
            maxLength='20'
            className='box pass'
            value={userCredentials.password}
            onChange={handleInputs}
          />
          <i className='fas fa-eye-slash eye'></i>
        </div>
        <p className='remember'>
          <label htmlFor='remember-me'>
            <input type='checkbox' id='remember-me' disabled /> remember me{' '}
          </label>
          <a href='#' className='link'>
            forgot password?
          </a>
        </p>
        <button type='submit' name='login' className='btn'>
          login
        </button>
      </form>
    </section>
  )
}
