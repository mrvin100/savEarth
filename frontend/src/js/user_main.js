/* ============== custom main editor js file made by @mrvin100 feat @stackvirus on github ============= */



/* listen event on element and do action */

// 1. when search-icon is clicked searchbar is show or hide
const searchBar = document.querySelector('.header .search_form')
const searchIcon = document.querySelector('#search-icon')

if(searchIcon){
  searchIcon.addEventListener('click', () => {
    hasThisClasName(searchBar, 'active') ? hideSearchBar() : showSearchBar()
  })
}


// 2. when menu-icon is clicked navbar is show
const navBar = document.querySelector('.header .navbar')
const menuIcon = document.querySelector('#menu-icon')

if(menuIcon){
  menuIcon.addEventListener('click', () => {
    showNavBar()
  })
}

// 3. when close-icon is clicked navbar is hide
const closeIcon = document.querySelector('#close-icon')

if(closeIcon){
  closeIcon.addEventListener('click', () => {
    hideNavBar()
  })
}

// 4. when window is scrolled some action is done

  window.addEventListener('scroll', () => {
    hideSearchBar()  // hide search bar
    activeHearder() // active header
  }, scrollY > 0)


/* customs js functions to reuse */

// Show or hide searchbar functions

const showNavBar = () => {
  navBar.classList.add('active')
}
const hideNavBar = () => {
  navBar.classList.remove('active')
}

// Show or hide searchbar functions

const showSearchBar = () => {
  searchBar.classList.add('active')
}
const hideSearchBar = () => {
  searchBar.classList.remove('active')
}

// active header
const header = document.querySelector('.header')

const activeHearder = () => {
  header.classList.toggle('active', scrollY > 0)
}

/* builded functions to reuse it */

// function to check if a tag have a className

const hasThisClasName = (tag, classname) => {
  let result = false
  if(tag.classList.contains(classname)){
    result = true
  }
  return result
}




















// function to show or hide password on login or register form

const showHiddenPassword = (passField, passEye) => {
  const input = document.querySelector(passField),
    iconEye = document.querySelector(passEye)

  if (input && iconEye) {
    iconEye.addEventListener('click', () => {
      // Change password to text
      if (input.type === 'password') {
        //Switch to text
        input.type = 'text'
        // Icon change
        iconEye.classList.add('fa-eye')
        iconEye.classList.remove('fa-eye-slash')
      } else {
        // Change to password
        input.type = 'password'

        //Icon change
        iconEye.classList.remove('fa-eye')
        iconEye.classList.add('fa-eye-slash')
      }
    })
  }
}

showHiddenPassword('.pass', '.eye')
showHiddenPassword('.cpass', '.eye')









/* ===================== backend part starts : build by @stackvirus on github ========================== */

// const changeClassList
//fetch function

function getData(target, data) {
  fetch(`http://localhost:3000/api/${target}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => (window.location.href = 'index.html'))
    .catch((error) => console.error(error))
}

//login procedures and functions

const loginForm = document.querySelector('.login')
const loginDatas = {}

const loginInputs = document.querySelectorAll('.login input')

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    loginInputs.forEach((input) => {
      const name = input.name
      name === 'email' || 'password' ? (loginDatas[name] = input.value) : null
    })

    getData('login', loginDatas)
  })
}

//register procedures and funcitons

const registerForm = document.querySelector('.register')
const registerDatas = {}

if (registerForm) {
  const registerInputs = registerForm.querySelectorAll('input')

  registerForm.addEventListener('submit', (e) => {
    e.preventDefault()
    registerInputs.forEach((input) => {
      const name = input.name
      name === 'email' || 'password'
        ? (registerDatas[name] = input.value)
        : null
    })

    getData('user', registerDatas)
  })
  // console.log(registerInputs)
}
