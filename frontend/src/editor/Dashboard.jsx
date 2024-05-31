import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserBlogs } from "../stores/userBlogsReducer";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/requests";
import avatar from "../img/user-avatar.svg";
import { useState } from "react";
import { setUserInfos } from "../stores/userInfosReducer";
import { setUserCollections } from "../stores/userCollections";
import Loader from "../components/Loader";

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector(({ user }) => user);
  const posts = useSelector(({ userBlogs }) => userBlogs);
  const userInfos = useSelector(({ userInfos }) => userInfos);
  const collections = useSelector(({ userCollections }) => userCollections);

  async function fetchUser() {
    const res = await getUser(user.id);
    dispatch(setUserInfos(res));
    dispatch(setUserBlogs(res.blogs));
    dispatch(setUserCollections(res.collections));
    return res;
  }

  const res = useQuery({
    queryKey: ["userBlogs"],
    queryFn: fetchUser,
    retry: 2,
  });

  if (res.isLoading) return <Loader />;

  if (res.isError) return <div>server internal error</div>;
  console.log(userInfos, user);

  return (
    <section className="dashboard container">
      <h1 className="heading">Your welcome {user.username}</h1>
      <div className="profile">
        <img src={userInfos.src} alt="user avatar" />
        <h3 className="heading">{user.email}</h3>
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
          <span className="subtitle">{collections.length}</span>
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
