import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserBlogs } from "../stores/userBlogsReducer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/requests";
import avatar from "../img/user-avatar.png";
import { useState } from "react";

export default function Dashboard() {
  const [userInfos, setUserInfos] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const posts = useSelector(({ userBlogs }) => userBlogs);

  async function fetchUser() {
    const res = await getUser(user.id);
    setUserInfos(res);
    dispatch(setUserBlogs(res.blogs));
    return res;
  }

  const res = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchUser,
    retry: 2,
  });

  if (res.isLoading) return <div>loading...</div>;

  if (res.isError) return <div>server internal error</div>;
  console.log(userInfos);

  return (
    <section className="dashboard container">
      <h1 className="heading">Your welcome {user.email}</h1>
      <div className="profile">
        <img src={avatar} alt="user avatar" />
        <h3 className="heading">name</h3>
        <span>{userInfos ? userInfos.profession : "profession"}</span>
      </div>
      <div className="box_container">
        <div className="box">
          <h3 className="heading">about me</h3>
          <span className="subtitle">profile</span>
          <Link to={`/update-profile/${user.id}`} className="btn">
            update profile
          </Link>
        </div>
        <div className="box">
          <h3 className="heading">posts</h3>
          <span className="subtitle">{posts.length}</span>
          <Link to={`/posts/${user.id}`} className="btn">
            my posts
          </Link>
        </div>
        <div className="box">
          <h3 className="heading">Donations</h3>
          <span className="subtitle">02</span>
          <Link to="/my-donations" className="btn">
            my Donations
          </Link>
        </div>
        <div className="box">
          <h3 className="heading">collections</h3>
          <span className="subtitle">10+</span>
          <Link to={`/my-collections/${user.id}`} className="btn">
            my collections
          </Link>
        </div>
        <div className="box">
          <h3 className="heading">Comments</h3>
          <span className="subtitle">12+</span>
          <Link className="btn">my comments</Link>
        </div>
      </div>
    </section>
  );
}
