import { useDispatch } from "react-redux";
import { setNotification } from "./stores/NotificationReducer";

import { useState } from "react";
import registerImg from "./img/user-with-bag.png";
import { registerRequest } from "./services/requests";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import FormData from "form-data";

export default function Register() {
  const [userInfos, setUserInfos] = useState({
    username: "",
    email: "",
    password: "",
    profession: "",
    number: "",
    userFile: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleInputs(e) {
    const { value, name } = e.target;
    setUserInfos({ ...userInfos, [name]: value });
  }

  const registerMutation = useMutation({
    mutationFn: registerRequest,
    onSuccess: () => navigate("/login"),
    onError: (error) => {
      console.log(error);
      dispatch(setNotification({ msg: error.response.data.error, clr: "red" }));
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", userInfos.username);
    userData.append("email", userInfos.email);
    userData.append("profession", userInfos.profession);
    userData.append("number", userInfos.number);
    userData.append("password", userInfos.password);
    userData.append("userFile", userInfos.userFile);

    registerMutation.mutate(userData);
  }

  const [showPass, setShowPass] = useState(false);
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <section className="login-register-section container">
      <div className="content">
        <h1 className="heading">
          Sign up
          <span>
            {" "}
            to <strong>savEarth </strong>is simply.
          </span>
        </h1>
        <p>
          If you already have an account, <br />
          You can{" "}
          <Link to="/login" className="link">
            Login here!
          </Link>
        </p>
        <img src={registerImg} alt="user with bag" />
      </div>
      <form
        // action=""
        // method="post"
        // enctype="multipart/form-data"
        onSubmit={handleSubmit}
        className="form-container register"
      >
        <h1 className="heading">Sign up</h1>
        <div className="input_box">
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            maxLength="50"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            type="email"
            placeholder="Enter email"
            name="email"
            maxLength="50"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            type="text"
            placeholder="Enter profession"
            name="profession"
            maxLength="50"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            type="number"
            placeholder="Enter number"
            name="number"
            min="000000000"
            max="999999999"
            className="box"
            onChange={handleInputs}
          />
        </div>
        <div className="input_box">
          <input
            id="pass"
            type={showPass ? "text" : "password"}
            placeholder="Password"
            name="password"
            maxLength="20"
            className="box pass"
            onChange={handleInputs}
          />
          <i
            className={`fas fa-eye${showPass ? "" : "-slash"} eye`}
            onClick={handleShowPass}
          ></i>
        </div>
        <div className="input_box">
          <input
            id="cpass"
            type={showPass ? "text" : "password"}
            placeholder="Confirm Password"
            name="cpass"
            maxLength="20"
            className="box cpass"
          />
        </div>
        <div className="input_box">
          <label htmlFor="image" className="label">
            choose your profile
            <input
              type="file"
              name="userFile"
              className="articleImage box"
              onChange={({ target }) =>
                setUserInfos({ ...userInfos, userFile: target.files[0] })
              }
            />
          </label>
        </div>
        <p className="privacy">
          <label htmlFor="remember-me">
            <input type="checkbox" id="remember-me" /> I agree with{" "}
            <strong>Privacy Policy</strong> and <strong>Terms of Use</strong>.
          </label>
        </p>
        <input type="submit" value="register" name="login" className="btn" />
      </form>
    </section>
  );
}
