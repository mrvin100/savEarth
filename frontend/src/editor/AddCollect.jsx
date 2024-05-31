import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCollectionRequest } from "../services/requests";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../stores/NotificationReducer";
import { appendUserCollection } from "../stores/userCollections";
import { setToken } from "../services/requests";

export default function AddCollect() {
  const [collectionInfos, setCollectionInfos] = useState({
    title: "",
    tags: "",
    description: "",
    country: "",
  });
  const user = useSelector(({ user }) => user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(user);
  user && setToken(user);

  // async function addCollection(data) {
  //   const res = await postCollectionRequest(data)

  // }

  const addCollectionMutation = useMutation({
    mutationFn: postCollectionRequest,
    onSuccess: (res) => {
      console.log(res);
      navigate(`/my-collections/${res.user}`);
      dispatch(appendUserCollection(res));
      dispatch(
        setNotification({
          msg: `${res.title} added successfully`,
          clr: "green",
        })
      );
    },
    onError: (error) =>
      dispatch(
        setNotification({
          msg: error.response.data.error
            ? error.response.data.error
            : error.message,
          clr: "red",
        })
      ),
  });

  function handleInputs(e) {
    const { value, name } = e.target;
    setCollectionInfos({ ...collectionInfos, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    addCollectionMutation.mutate(collectionInfos);
  }

  return (
    <section className="login-register-section container">
      <form className="form-container login" onSubmit={handleSubmit}>
        <h1 className="heading">Add collect</h1>
        <div className="input_box">
          <input
            type="text"
            placeholder="Enter title"
            name="title"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            type="text"
            placeholder="Enter tags t#t#..."
            name="tags"
            className="box"
          />
        </div>
        <div className="input_box">
          <input
            type="text"
            placeholder="Enter country"
            name="country"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <textarea
            name="description"
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
            type="text"
            placeholder="Enter country"
            name="country"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <input type="submit" value="create" name="add-post" className="btn" />
        <input
          type="submit"
          value="create"
          name="add-collect"
          className="btn"
        />
      </form>
    </section>
  );
}
