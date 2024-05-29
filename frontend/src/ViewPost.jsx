import { useSelector } from "react-redux";
import Post from "./components/Post";
import postImg from "./img/post6.png";
import user from "./img/user-avatar.svg";
import reviewer from "./img/user-avatar1.svg";

export default function ViewPost() {
  let posts = useSelector((state) => state.blogs);
  return (
    <>
      <section className="view-post container">
        <div className="intro">
          <img className="post_img" src={postImg} alt="post image" />
          <img src={user} alt="user avatar" className="profile_img" />
        </div>
        <div className="details">
          <div className="infos">
            <span className="date">3 Jan 2024</span>
            <span className="name">Jean Doe</span>
          </div>
          <p className="description">
            lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo
            repellendus tempora incidunt voluptate, officiis consequuntur,
            obcaecati, illo laboriosam numquam sit explicabo. Aperiam
            exercitationem magni eligendi perferendis quo maiores beatae
            deleniti doloremque nesciunt tempore officia fuga alias in id, sequi
            recusandae!
          </p>
          <div className="tags">
            <span className="tag">climate</span>
            <span className="tag">save</span>
            <span className="tag">Research</span>
          </div>
          <div className="consulting">
            <span>
              +4K.<i className="like bx bx-like icon"></i>
            </span>
            <span>
              +1k<i className="read bx bx-bookmark icon"></i>
            </span>
            <span>
              +24k.<i className="messages bx bx-message icon"></i>
            </span>
          </div>
        </div>
        <h2 className="heading">related comments</h2>
        <div className="comments">
          <div className="comment">
            <p>
              This artile is to interresant because it&apos;s cover all the
              concepts about climate.
            </p>
            <img src={reviewer} alt="reviewer" className="user_img" />
          </div>
          <div className="comment">
            <p>
              This artile is to interresant because it&apos;s cover all the
              concepts about climate.
            </p>
            <img src={reviewer} alt="reviewer" className="user_img" />
          </div>
        </div>
      </section>
      <section className="blog container">
        <h2
          className="heading"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          more posts about author
        </h2>
        <div className="box_container">
          {[...posts].slice(posts.length - 3).map((post) => {
            return <Post key={posts.indexOf(post)} post={post} />;
          })}
        </div>
      </section>
    </>
  );
}
