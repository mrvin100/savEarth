import { useState } from 'react'
import { Link } from 'react-router-dom'

const items = [
  { key: 'home', label: 'home' },
  { key: 'blog', label: 'blog', isdropdown: true },
  { key: 'donations', label: 'donations', isdropdown: true },
  { key: 'contact', label: 'contact' },
  { key: 'login', label: 'login' },
  { key: 'register', label: 'register' },
  { key: 'dashboard', label: 'dashboard' },
]

// Navbar component starts

const Navbar = ({ items, status, toggle }) => {
  return (
    <nav className={`navbar ${status ? 'show' : ''}`}>
      {items.map((item) => (
        <Link
          key={item.label}
          to={`/${item.label}`}
          onClick={toggle}
          className='nav_link'
        >
          {item.label}
          {item.isdropdown ? <i className='bx bx-chevron-down'></i> : ''}
        </Link>
      ))}
      <div className='icons'>
        <div id='moon-icon' className='bx bx-moon icon'></div>
        <div id='close-icon' className='bx bx-x icon' onClick={toggle}></div>
      </div>
    </nav>
  )
}

export default function Header() {
  const [navbar, setNavbar] = useState(false)

  const toggleNavbar = () => {
    setNavbar(!navbar)
  }
  return (
    <header className='header'>
      <div className='offers'>
        <i className='bx bx-sticker'></i>
        <p>join the 30% of activists who save a life!</p>
        <a href='#' className='link'>
          Donate now <i className='fas fa-bolt'></i>
        </a>
      </div>
      <div className='main-header container'>
        <a href='#' className='logo'>
          <sup>sav.</sup>Earth
        </a>

        {/* navbar component starts */}

        <Navbar items={items} status={navbar} toggle={toggleNavbar} />

        <form action='' method='post' className='search_form'>
          <input
            type='text'
            placeholder='what do you think.. ?'
            required
            className='box'
          />
          <button type='submit' className='icon bx bx-search'></button>
        </form>

        <div className='icons'>
          <div id='search-icon' className='bx bx-search icon'></div>
          <div id='user-icon' className='bx bx-user icon'></div>
          <div className='bx bx-shopping-bag icon'></div>
          <div
            id='menu-icon'
            className='bx bx-grid-alt icon'
            onClick={toggleNavbar}
          ></div>
        </div>
      </div>
      <Link
        to='/add-post'
        className='bx bx-notepad icon add_post'
        title='add post'
      ></Link>
    </header>
  )
}
