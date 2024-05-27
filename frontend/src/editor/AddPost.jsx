import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { postData } from '../services/requests'
import FormData from 'form-data'

export default function AddPost() {
  const [blogInfos, setBlogInfos] = useState({
    title: '',
    tags: '',
    description: '',
    file: '',
  })
  const navigate = useNavigate()

  function handleInputs(e) {
    const { value, name } = e.target
    setBlogInfos({ ...blogInfos, [name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(JSON.parse(window.localStorage.getItem('userToken')).token)
    const blogData = new FormData()
    blogData.append('title', blogInfos.title)
    blogData.append('tags', blogInfos.tags)
    blogData.append('description', blogInfos.description)
    blogData.append('file', blogInfos.file)
    try {
      fetch(`http://localhost:3000/api/blogs`, {
        body: blogData,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${
            JSON.parse(window.localStorage.getItem('userToken')).token
          }`,
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='login-register-section container'>
      <form className='form-container login' onSubmit={handleSubmit}>
        <h1 className='heading'>Add your Article</h1>
        <div className='input_box'>
          <input
            id='email'
            type='text'
            placeholder='Enter title'
            name='title'
            className='box'
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <input
            id='profession'
            type='text'
            placeholder='Enter tags t#t#...'
            name='tags'
            className='box'
            onChange={handleInputs}
          />
        </div>
        <div className='input_box'>
          <textarea
            name='description'
            id='description'
            className='box'
            placeholder='Enter description'
            min='000000000'
            max='999999999'
            rows='3'
            cols='10'
            onChange={handleInputs}
          ></textarea>
        </div>
        <div className='input_box'>
          <input
            type='file'
            name='file'
            className='articleImage box'
            onChange={({ target }) =>
              setBlogInfos({ ...blogInfos, file: target.files[0] })
            }
          />
        </div>
        <input type='submit' value='create' name='add-post' className='btn' />
      </form>
    </section>
  )
}
