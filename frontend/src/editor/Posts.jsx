import { useEffect, useState } from "react";
import Post from "./../components/Post";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/blogs")
      .then((datas) => datas.json())
      .then((res) => {
        console.log(res);
        setPosts(posts.concat(...res));
      });
  }, []);

  return (
    <section className="blog posts container">
      <h1 className="heading">My Posts</h1>
      <div className="box_container">
        {[...posts].slice(posts.length - 3).map((post) => {
          return <Post key={posts.indexOf(post)} post={post} />;
        })}
      </div>
    </section>
  );
}
