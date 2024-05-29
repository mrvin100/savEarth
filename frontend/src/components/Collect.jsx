import { Link } from "react-router-dom";

export default function Collect({ collect }) {
  const { date, title, description, tags } = collect;
  return (
    <div className="box">
      <div className="tools">
        <Link
          to="/update-collect"
          className="bx bx-edit icon"
          title="update collect"
        ></Link>
        <div
          className="bx bx-trash icon"
          title="delete collect"
          onClick={() => {
            return confirm("confirm delete this collect?");
          }}
        ></div>
      </div>
      <div className="details">
        <div className="date">{date}</div>
        <Link to="/view-collect" className="link hide_text">
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
