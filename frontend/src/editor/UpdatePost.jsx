import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updatePost } from "../stores/userBlogsReducer";
import FormData from "form-data";
import { setNotification } from "../stores/NotificationReducer";
import { useQuery } from "@tanstack/react-query";
import { getBlogRequest } from "../services/requests";
import Post from "../components/Post";

export default function UpdatePost() {
  // const [image, setImage] = useState('')
  const [postInfos, setPostInfos] = useState({
    title: "",
    tags: "",
    description: "",
    file: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useParams().id;

  let ancientPost = useSelector(({ userBlogs }) => {
    return userBlogs.find((u) => u.id === id);
  });
  const user = useSelector(({ user }) => user);

  if (!ancientPost) {
    const res = useQuery({
      queryKey: ["updateBlog"],
      queryFn: () => getBlogRequest(id),
      retry: 2,
      refetchOnWindowFocus: false,
    });

    if (res.isLoading) return <div>loading...</div>;

    if (res.isError) return <div>internale server error</div>;
    ancientPost = res.data;
  }

  function handleInputs(e) {
    const { value, name } = e.target;
    setPostInfos({ ...postInfos, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("title", postInfos.title);
    data.append("tags", postInfos.tags);
    data.append("description", postInfos.description);
    data.append("file", postInfos.file);
    data.append("id", ancientPost.id);

    dispatch(updatePost(data));
    navigate(`/posts/${user.id}`);
  }
  console.log(ancientPost);
  return (
    <section className="login-register-section container">
      <Post post={ancientPost} />
      <form className="form-container login" onSubmit={handleSubmit}>
        <h1 className="heading">update post</h1>
        <div className="input_box">
          <input
            id="email"
            type="text"
            placeholder="Enter title"
            name="title"
            className="box"
            value={postInfos.title}
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            id="profession"
            type="text"
            placeholder="Enter tags t#t#..."
            name="tags"
            className="box"
            value={postInfos.tags}
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <textarea
            name="description"
            id="description"
            className="box"
            placeholder="Enter description"
            min="000000000"
            max="999999999"
            rows="3"
            cols="10"
            value={postInfos.description}
            onChange={({ target }) =>
              setPostInfos({ ...postInfos, description: target.value })
            }
          ></textarea>
        </div>
        <div className="input_box">
          <input
            type="file"
            name="file"
            className="articleImage box"
            onChange={({ target }) =>
              setPostInfos({ ...postInfos, file: target.files[0] })
            }
          />
        </div>
        <input
          type="submit"
          value="update"
          name="update-post"
          className="btn"
        />
      </form>
    </section>
  );
}
