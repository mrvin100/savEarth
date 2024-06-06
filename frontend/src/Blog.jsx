import Post from "./components/Post";
import { useSelector } from "react-redux";

function Blog() {
  let posts = useSelector((state) => state.blogs);
  console.log(posts);

  return (
    <section className="blog container">
      <h1 className="heading">Recent blog posts</h1>
      <div className="box_container">
        {[...posts].slice(posts.length - 3).map((post) => {
          return <Post key={posts.indexOf(post)} post={post} />;
        })}
      </div>
      <h1 className="heading">All blog posts</h1>
      <div className="box_container">
        {posts.length ? (
          posts.map((post) => {
            return <Post key={posts.indexOf(post)} post={post} />;
          })
        ) : (
          <div className="message-box">
            <span>no post added, please add now!</span>
            <i className="bx bx-info-square icon"></i>
          </div>
        )}
      </div>
      <div className="navigations">
        <span className="prev">
          <i className="bx bx-left-arrow-alt"></i> Preview
        </span>
        <div className="items">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>..</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
        <span className="next">
          Next <i className="bx bx-right-arrow-alt"></i>
        </span>
      </div>
    </section>
  );
}

export default Blog;
