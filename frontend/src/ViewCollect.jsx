import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./services/requests";
import { Link, useParams } from "react-router-dom";
import { setUserBlogs } from "./stores/userBlogsReducer";
import Collect from "./components/Collect";

export default function ViewCollect() {
  const blogId = useParams().id;
  const dispatch = useDispatch();
  const userId = useSelector(({ user }) => user);
  let posts = useSelector(({ userBlogs }) => userBlogs);
  const blog = useSelector(({ blogs }) => {
    return blogs.find((b) => b.id === blogId);
  });

  async function fetchUserBlogs(id) {
    console.log(id);
    const res = await getUser(id);
    dispatch(setUserBlogs(res.blogs));
    return res.blogs;
  }

  const res = useQuery({
    queryKey: ["viewBlog"],
    queryFn: () => fetchUserBlogs(userId.id),
    retry: 2,
  });

  if (res.isLoading) return <div>loading...</div>;

  if (res.isError) return <div>server internal error</div>;

  console.log(blog, posts);

  return (
    <>
      <section className="view-collect container">
        <div className="details">
          <div className="infos">
            <span className="date">{blog.date}</span>
            <span className="country">Cameroun</span>
          </div>
          <h3 className="heading">{blog.title}</h3>
          <p className="description">{blog.description}</p>
          <div className="consulting">
            <span>
              +4K.<i className="like bx bx-like icon"></i>
            </span>
            <span>
              +1k<i className="read bx bx-bookmark icon"></i>
            </span>
            <span>
              +2k. <i className="share bx bx-share icon"></i>
            </span>
          </div>
          <Link to="/donate" className="btn">
            donate
          </Link>
        </div>
      </section>
      <section className="collections container">
        <h2
          className="heading"
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          more collections for you
        </h2>
        <div className="box_container">
          {[...posts].slice(posts.length - 3).map((post) => {
            return <Collect key={posts.indexOf(post)} post={post} />;
          })}
        </div>
      </section>
    </>
  );
}
