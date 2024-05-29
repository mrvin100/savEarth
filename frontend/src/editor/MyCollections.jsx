import { getUser } from "../services/requests";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { setUserBlogs } from "../stores/userBlogsReducer";
import Collect from "../components/Collect";

export default function MyCollections() {
  const id = useParams().id;
  const dispatch = useDispatch();

  let collections = useSelector((state) => state.userBlogs);
  if (collections[0] == undefined) {
    console.log("in react query user blogs");
    const res = useQuery({
      queryKey: ["userBlogs"],
      queryFn: () => getUser(id),
    });
    if (res.isLoading) return <div>loading...</div>;

    if (res.isError) return <div>server internal error</div>;
    const ans = [...res.data.blogs];

    collections = ans.reverse();
    dispatch(setUserBlogs(res.data));
  }
  console.log(collections[0]);

  return (
    <section className="collections container">
      <h1 className="heading">My collections</h1>
      <div className="box_container">
        {collections &&
          collections.map((collect) => {
            return (
              <Collect key={collections.indexOf(collect)} post={collect} />
            );
          })}
      </div>
    </section>
  );
}
