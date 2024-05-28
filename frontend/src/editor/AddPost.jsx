import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postBlogRequest } from "../services/requests";
import FormData from "form-data";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { appendBlog } from "../stores/blogReducer";
import { setNotification } from "../stores/NotificationReducer";

export default function AddPost() {
  const [blogInfos, setBlogInfos] = useState({
    title: "",
    tags: "",
    description: "",
    file: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addPostMutation = useMutation({
    mutationFn: postBlogRequest,
    onSuccess: (res) => {
      console.log(res);
      dispatch(appendBlog(res));
      navigate(`/posts/${res.user}`);
    },
    onError: (error) =>
      dispatch(
        setNotification({
          msg: error.response.data.error,
          clr: "red",
        })
      ),
  });

  function handleInputs(e) {
    const { value, name } = e.target;
    setBlogInfos({ ...blogInfos, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const blogData = new FormData();
    blogData.append("title", blogInfos.title);
    blogData.append("tags", blogInfos.tags);
    blogData.append("description", blogInfos.description);
    blogData.append("file", blogInfos.file);

    addPostMutation.mutate(blogData);
  }

  return (
    <section className="login-register-section container">
      <form className="form-container login" onSubmit={handleSubmit}>
        <h1 className="heading">Add your Article</h1>
        <div className="input_box">
          <input
            id="email"
            type="text"
            placeholder="Enter title"
            name="title"
            className="box"
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
            onChange={handleInputs}
          ></textarea>
        </div>
        <div className="input_box">
          <input
            type="file"
            name="file"
            className="articleImage box"
            onChange={({ target }) =>
              setBlogInfos({ ...blogInfos, file: target.files[0] })
            }
          />
        </div>
        <input type="submit" value="create" name="add-post" className="btn" />
      </form>
    </section>
  );
}
