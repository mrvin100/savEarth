import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCollectionRequest } from "../services/requests";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setNotification } from "../stores/NotificationReducer";
import { updateUserCollection } from "../stores/userCollections";

export default function UpdateCollect() {
  const [collectionInfos, setCollectionInfos] = useState({
    title: "",
    tags: "",
    description: "",
    country: "",
  });
  const id = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const updateCollectionMutation = useMutation({
    mutationFn: updateCollectionRequest,
    onSuccess: (res) => {
      console.log(res);
      dispatch(updateUserCollection(res));
      navigate(`/my-collections/${res.user}`);
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
    setCollectionInfos({ ...collectionInfos, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // collectionInfos.id = id
    updateCollectionMutation.mutate({ ...collectionInfos, id });
  }

  return (
    <section className="login-register-section container">
      <form className="form-container login" onSubmit={handleSubmit}>
        <h1 className="heading">Update collect</h1>
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
            onChange={handleInputs}
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
            name="country"
            className="box"
            placeholder="Enter country"
            onChange={handleInputs}
          />
        </div>
        <input
          type="submit"
          value="update"
          name="update-collect"
          className="btn"
        />
      </form>
    </section>
  );
}
