import { Link, useNavigate } from 'react-router-dom'

import { useState } from 'react'
import registerImg from './img/user-with-bag.png'
import { postData } from './services/requests'

export default function Register() {
  const [userInfos, setUserInfos] = useState({
    email: '',
    password: '',
    profession: '',
    number: '',
  })

  const navigate = useNavigate()

  function handleInputs(e) {
    const { value, name } = e.target
    setUserInfos({ ...userInfos, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await postData({ ...userInfos, number: Number(userInfos.number) }, 'user')
      navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section class='login-register-section container'>
      <div class='content'>
        <h1 class='heading'>
          Sign up
          <span>
            {' '}
            to <strong>savEarth </strong>is simply.
          </span>
        </h1>
        <p>
          If you already have an account, <br />
          You can{' '}
          <Link to='/login' class='link'>
            Login here!
          </Link>
        </p>
        <img src={registerImg} alt='user with bag' />
      </div>
      <form
        // action=""
        // method="post"
        // enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className='form-container register'
      >
        <h1 className='heading'>Sign up</h1>
        <div className='input_box'>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
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
            placeholder='Enter profession'
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
            placeholder='Enter number'
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
            placeholder='Password'
            name='password'
            maxLength='20'
            className='box pass'
            onChange={handleInputs}
          />
          <i className='fas fa-eye-slash eye'></i>
        </div>
        <div className='input_box'>
          <input
            id='cpass'
            type='password'
            placeholder='Confirm Password'
            name='cpass'
            maxLength='20'
            className='box cpass'
          />
        </div>
        <p className='privacy'>
          <label for='remember-me'>
            <input type='checkbox' id='remember-me' /> I agree with{' '}
            <strong>Privacy Policy</strong> and <strong>Terms of Use</strong>.
          </label>
        </p>
        <input type='submit' value='register' name='login' className='btn' />
      </form>
    </section>
  )
}
