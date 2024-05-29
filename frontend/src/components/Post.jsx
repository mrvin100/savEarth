import { Link } from 'react-router-dom'

export default function Post({ post, Delete }) {
  const { src, date, title, description, tags, id } = post

  return (
    <div className='box'>
      <div className='tools'>
        <Link
          to={`/update-post/${id}`}
          className='bx bx-edit icon'
          title='update post'
        ></Link>
        <div
          className='bx bx-trash icon'
          title='delete post'
          onClick={() =>
            confirm('are you sure to delete this blog?:', title) && Delete(id)
          }
        ></div>
      </div>
      <div className='image'>
        <img src={src} alt='post image' />
      </div>
      <div className='details'>
        <div className='date'>{date}</div>
        <Link to='/view-post' className='link hide_text'>
          {title}
          <i className='bx bx-right-down-arrow-circle'></i>
        </Link>
        <p className='hide_text'>{description}</p>
        <div className='tags'>
          {tags.map((tag) => {
            return (
              <span key={tags.indexOf(tag)} className='tag'>
                {tag}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
