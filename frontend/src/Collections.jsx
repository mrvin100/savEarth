import { useDispatch, useSelector } from "react-redux";
import Collect from "./components/Collect";
import { useQuery } from "@tanstack/react-query";
import { getData } from "./services/requests";
import { setCollections } from "./stores/collectionReducer";
import Loader from "./components/Loader";

export default function Collections() {
  const dispatch = useDispatch();
  let posts = useSelector((state) => {
    console.log(state);
    return state.collections;
  });

  const res = useQuery({
    queryKey: ["collections"],
    queryFn: () => getData("collections"),
  });
  if (res.isLoading) return <Loader />;
  dispatch(setCollections(res.data));
  return (
    <section className="collections container">
      <h1 className="heading">all collections</h1>
      <div className="box_container">
        {posts.length ? (
          posts.map((collect) => {
            return <Collect key={posts.indexOf(collect)} collect={collect} />;
          })
        ) : (
          <div className="message-box">
            <span>no collections added yet!</span>
            <i className="bx bx-info-square icon"></i>
          </div>
        )}
      </div>
    </section>
  );
}
