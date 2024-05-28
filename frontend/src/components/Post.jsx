/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

export default function Post({ post }) {
  const { src, date, title, description, tags } = post;
  return (
    <div className="box">
      <div className="tools">
        <Link
          to="/update-post"
          className="bx bx-edit icon"
          title="update post"
        ></Link>
        <div
          className="bx bx-trash icon"
          title="delete post"
          onClick={() => {
            return confirm("confirm delete this post?");
          }}
        ></div>
      </div>
      <div className="image">
        <img src={src} alt="post image" />
      </div>
      <div className="details">
        <div className="date">{date}</div>
        <Link to="/view-post" className="link hide_text">
          {title}
          <i className="bx bx-right-down-arrow-circle"></i>
        </Link>
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
