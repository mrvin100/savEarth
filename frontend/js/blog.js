const mainBox = document.querySelector('.box_container')

function addArticle(data) {
  console.log(data)
  data.forEach((object) => {
    const blog = document.createElement('div')
    blog.classList.add('box')

    const imageBox = document.createElement('div')
    imageBox.classList.add('image')
    imageBox.innerHTML = `<img src=${object.image.replace(
      ' ',
      '_'
    )} alt="post image" />`

    const detailsBox = document.createElement('div')
    detailsBox.classList.add('details')

    const dateBox = document.createElement('div')
    dateBox.classList.add('date')
    dateBox.innerHTML = object.date

    const linkBox = document.createElement('div')
    linkBox.innerHTML = `<a href=${object.header} class="link hide_text">
      ${object.header}
      <iclass="bx bx-right-down-arrow-circle"></i>
    </a>`

    const description = document.createElement('p')
    description.textContent = object.description
    description.classList.add('hide_text')

    const tagsBox = document.createElement('div')
    tagsBox.classList.add('tags')
    object.tags.forEach((tag) => {
      tagsBox.innerHTML += `<span class="tag">${tag}</span>`
    })
    blog.appendChild(imageBox)
    // console.log(dateBox, imageBox)
    detailsBox.appendChild(dateBox)
    detailsBox.appendChild(linkBox)
    detailsBox.appendChild(description)
    detailsBox.appendChild(tagsBox)

    blog.appendChild(detailsBox)
    mainBox.appendChild(blog)
  })
}

if (mainBox) {
  fetch('http://localhost:3000/api/blogs')
    .then((res) => res.json())
    .then((data) => addArticle(data))
    .catch((error) => console.log(error.message))
}

// fetch api

function blogEndpoints(param, data, method) {
  fetch(`http://localhost:3000/api/blogs/${param}`, {
    method: method,
    body: data,
  })
    .then((res) => res.json())
    .then((data) => addArticle([data]))
    .catch((error) => console.log(error.message))
}

// create article procedures with image upload procedure

const articleForm = document.querySelector('.createArticle')

if (articleForm) {
  const articleInputs = articleForm.querySelectorAll('input')
  const description = articleForm.querySelector('textarea')

  const imageInput = document.querySelector('.articleImage')
  let file = null

  imageInput.addEventListener('change', (e) => {
    console.log(e.target.files[0])
    file = e.target.files[0]
  })

  console.log(articleInputs)
  articleForm.addEventListener('submit', (e) => {
    e.preventDefault()
    // console.log(articleInputs[articleInputs.length - 2])
    const articleDatas = new FormData()

    articleInputs.forEach((input) => {
      const name = input.name
      input.type === 'text' ? articleDatas.append([name], input.value) : null
    })
    articleDatas.append('description', description.value)
    articleDatas.append('file', file)
    console.log(articleDatas, articleDatas.get('description'))
    blogEndpoints('', articleDatas, 'POST')
  })
}
