import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { getUser } from '../services/requests'

export default function Dashboard() {
  // const [user, setUser] = useState('')
  // useEffect(() => {
  //   getUser('user').then((res) => setUser(res))
  // }, [])

  return (
    <section className='dashboard container'>
      <h1 className='heading'>Your welcome user</h1>
      <div className='box_container'>
        <div className='box'>
          <h3 className='heading'>about me</h3>
          <span className='subtitle'>profile</span>
          <Link className='btn'>view profile</Link>
        </div>
        <div className='box'>
          <h3 className='heading'>posts</h3>
          <span className='subtitle'>05</span>
          <Link to='/posts' className='btn'>
            view posts
          </Link>
        </div>
        <div className='box'>
          <h3 className='heading'>Comments</h3>
          <span className='subtitle'>12+</span>
          <Link className='btn'>Read comments</Link>
        </div>
        <div className='box'>
          <h3 className='heading'>Donations</h3>
          <span className='subtitle'>02</span>
          <Link className='btn'>View Donations</Link>
        </div>
      </div>
    </section>
  )
}
