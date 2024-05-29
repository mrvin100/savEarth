import { Link } from "react-router-dom";

export default function Donate({ donate }) {
  const { date, donator, description, amount } = donate;
  return (
    <div className="box">
      <div className="tools">
        <Link
          to="/update-donate"
          className="bx bx-edit icon"
          title="update donate"
        ></Link>
        <div
          className="bx bx-trash icon"
          title="delete donate"
          onClick={() => {
            return confirm("confirm delete this donate?");
          }}
        ></div>
      </div>
      <div className="details">
        <div className="date">
          {date}
          {amount}
        </div>
        <Link to="/view-donate" className="link hide_text">
          {donator}
          <i className="bx bx-right-down-arrow-circle"></i>
        </Link>
        <p className="hide_text">{description}</p>
      </div>
    </div>
  );
}
