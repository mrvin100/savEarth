import { useDispatch } from "react-redux";
import { setNotification } from "./stores/NotificationReducer";

import { useState } from "react";
import registerImg from "./img/user-with-bag.png";
import { registerRequest } from "./services/requests";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [userInfos, setUserInfos] = useState({
    email: "",
    password: "",
    profession: "",
    number: "",
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
    registerMutation.mutate(userInfos);
  }

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
            id="email"
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
            id="profession"
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
            id="username"
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
            id="number"
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
            type="password"
            placeholder="Password"
            name="password"
            maxLength="20"
            className="box pass"
            onChange={handleInputs}
          />
          <i className="fas fa-eye-slash eye"></i>
        </div>
        <div className="input_box">
          <input
            id="cpass"
            type="password"
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
              id="image"
              type="file"
              name="image"
              className="articleImage box"
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
