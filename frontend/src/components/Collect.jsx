import { Link } from 'react-router-dom'

export default function Collect({ post, Delete }) {
  const { date, title, description, id } = post
  return (
    <div className='box'>
      <div className='tools'>
        <Link
          to={`/update-collect/${id}`}
          className='bx bx-edit icon'
          title='update collect'
        ></Link>
        <div
          className='bx bx-trash icon'
          title='delete collect'
          onClick={() => {
            confirm('confirm delete this collect?') && Delete(id)
          }}
        ></div>
      </div>
      <div className='details'>
        <span className='date'>{date}</span>
        <Link to={`/view-collect/${id}`} className='link hide_text'>
          {title}
          <i className='bx bx-right-down-arrow-circle'></i>
        </Link>
        <p className='hide_text'>{description}</p>
      </div>
    </div>
  )
}
