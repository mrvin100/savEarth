/* ============ custom main editor js file made by @mrvin100 feat --- on github ============= */

/* listen event on element and do action */

// 1. when search-icon is clicked searchbar is show or hide
const searchBar = document.querySelector('.header .search_form')
const searchIcon = document.querySelector('#search-icon')

if(searchIcon){
  searchIcon.addEventListener('click', () => {
    hasThisClasName(searchBar, 'active') ? hideSearchBar() : showSearchBar()
  })
}


/* customs js functions to reuse */

// Show or hide searchbar functions

const showSearchBar = () => {
  searchBar.classList.add('active')
}
const hideSearchBar = () => {
  searchBar.classList.remove('active')
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