import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import registerImg from "../img/user-with-bag.png";
import { postData } from "../services/requests";

export default function UpdateProfile() {
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
    profession: "",
    number: "",
  });

  const navigate = useNavigate();

  function handleInputs(e) {
    const { value, name } = e.target;
    setUserInfos({ ...userInfos, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await postData(
        { ...userInfos, number: Number(userInfos.number) },
        "user"
      );
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

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
