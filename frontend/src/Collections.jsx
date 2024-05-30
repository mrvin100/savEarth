import { useSelector } from "react-redux";
import Collect from "./components/Collect";

export default function Collections() {
  let posts = useSelector((state) => state.blogs);
  return (
    <section className="collections container">
      <h1 className="heading">all collections</h1>
      <div className="box_container">
        {posts &&
          posts.map((collect) => {
            return <Collect key={posts.indexOf(collect)} post={collect} />;
          })}
      </div>
    </section>
  );
}
