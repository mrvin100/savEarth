import { useState } from 'react'
import loginImg from './img/user-with-bag.png'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from './services/requests'

export default function Login() {
  const [userCredentials, setUserCredentials] = useState({
    email: '',
    password: '',
  })
  const navigate = useNavigate()

  function handleInputs(e) {
    const { value, name } = e.target
    setUserCredentials({ ...userCredentials, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const res = await postData(userCredentials, 'login')
      window.localStorage.setItem('userToken', JSON.stringify(res))
      navigate('/dashboard')
    } catch (error) {
      console.log(error)
    }
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
            id='email'
            type='email'
            placeholder='Enter email'
            name='email'
            maxlength='50'
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
            maxlength='20'
            className='box pass'
            value={userCredentials.password}
            onChange={handleInputs}
          />
          <i className='fas fa-eye-slash eye'></i>
        </div>
        <p className='remember'>
          <label for='remember-me'>
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
