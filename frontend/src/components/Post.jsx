/* eslint-disable react/prop-types */

export default function Post({ post }) {
  const { src, date, title, description, tags } = post;
  return (
    <div className="box">
      <div className="image">
        <img src={src} alt="post image" />
      </div>
      <div className="details">
        <div className="date">{date}</div>
        <a href="#" className="link hide_text">
          {title}
          <i className="bx bx-right-down-arrow-circle"></i>
        </a>
        <p className="hide_text">{description}</p>
        <div className="tags">
          {tags.map((tag) => {
            return (
              <span key={tags.indexOf(tag)} className="tag">
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
