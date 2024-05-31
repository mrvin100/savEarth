import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getData, getUser } from "./services/requests";
import { Link, useParams } from "react-router-dom";
import Collect from "./components/Collect";
import { setUserCollections } from "./stores/userCollections";
import Loader from "./components/Loader";

export default function ViewCollect() {
  const collectionId = useParams().id;
  const dispatch = useDispatch();

  const userId = useSelector(({ user }) => user);
  let userCollects = useSelector(({ userCollections }) => userCollections);

  const collect = useSelector(({ userCollections }) => {
    return userCollections.find((b) => b.id === collectionId);
  });

  async function fetchUserCollections(id) {
    console.log(id);
    const res = await getData("collections");
    dispatch(setUserCollections(res));
    return res;
  }

  const res = useQuery({
    queryKey: ["userCollections"],
    queryFn: () => fetchUserCollections(userId.id),
    retry: 2,
  });

  if (res.isLoading) return <Loader />;

  if (res.isError) return <div>server internal error</div>;

  // console.log(blog, posts);

  return (
    <>
      <section className="view-collect container">
        <div className="details">
          <div className="infos">
            <span className="date">{collect.country}</span>
            <span className="country">{collect.country}</span>
          </div>
          <h3 className="heading">{collect.title}</h3>
          <p className="description">{collect.description}</p>
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
          {[...userCollects].slice(userCollects.length - 3).map((collect) => {
            return (
              <Collect key={userCollects.indexOf(collect)} collect={collect} />
            );
          })}
        </div>
      </section>
    </>
  );
}
