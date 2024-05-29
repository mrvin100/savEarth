import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { updateUserInfos } from "../services/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "../stores/NotificationReducer";
import { setUserInfos } from "../stores/userInfosReducer";

export default function UpdateProfile() {
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
    profession: "",
    number: "",
  });
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  function handleInputs(e) {
    const { value, name } = e.target;
    setUserInfos({ ...userInfos, [name]: value });
  }

  const submitMutation = useMutation({
    mutationKey: ["submit"],
    mutationFn: () => updateUserInfos,
    onSuccess: (updatedUser) => {
      dispatch(setUserInfos(updatedUser));
      setUser(updatedUser);
    },
    onError: (error) => dispatch(setNotification(error.response.data.error)),
  });

  async function handleSubmit(e) {
    e.preventDefault();
    submitMutation.mutate(userInfos);
  }

  // const userinfo = useSelector(state => state.userInfos)

  return (
    <section className="login-register-section container">
      <form
        // action=""
        // method="post"
        // enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className="form-container register"
      >
        <h1 className="heading">update profile</h1>
        <div className="input_box">
          <input
            id="email"
            type="email"
            placeholder="New email"
            name="email"
            maxLength="50"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            id="profession"
            type="text"
            placeholder="New profession"
            name="profession"
            maxLength="50"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            id="number"
            type="number"
            placeholder="New number"
            name="number"
            min="000000000"
            max="999999999"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            id="lastpass"
            type="password"
            placeholder="Last Password"
            name="password"
            maxLength="20"
            className="box pass"
            onChange={handleInputs}
          />
          <i className="fas fa-eye-slash eye"></i>
        </div>
        <div className="input_box">
          <input
            id="pass"
            type="password"
            placeholder="New Password"
            name="password"
            maxLength="20"
            className="box pass"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            id="cpass"
            type="password"
            placeholder="Confirm New Password"
            name="cpass"
            maxLength="20"
            className="box cpass"
          />
        </div>
        <div className="input_box">
          <label htmlFor="image" className="label">
            choose your profile
            <input
              id="image"
              type="file"
              name="image"
              className="articleImage box"
            />
          </label>
        </div>
        <input
          type="submit"
          value="update"
          name="update-profile"
          className="btn"
        />
      </form>
    </section>
  );
}
