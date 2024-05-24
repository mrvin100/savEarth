/* eslint-disable react/no-unknown-property */

import registerImg from "./img/user-with-bag.png";

export default function Register() {
  return (
    <section class="login-register-section container">
      <div class="content">
        <h1 class="heading">
          Sign up
          <span>
            {" "}
            to <strong>savEarth </strong>is simply.
          </span>
        </h1>
        <p>
          If you already have an account, <br />
          You can{" "}
          <a href="#" class="link">
            Login here!
          </a>
        </p>
        <img src={registerImg} alt="user with bag" />
      </div>
      <form
        action=""
        method="post"
        enctype="multipart/form-data"
        className="form-container register"
      >
        <h1 className="heading">Sign up</h1>
        <div className="input_box">
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            maxlength="50"
            className="box"
          />
        </div>
        <div className="input_box">
          <input
            id="profession"
            type="text"
            placeholder="Enter profession"
            name="profession"
            maxlength="50"
            className="box"
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
          />
        </div>
        <div className="input_box">
          <input
            id="pass"
            type="password"
            placeholder="Password"
            name="password"
            maxlength="20"
            className="box pass"
          />
          <i className="fas fa-eye-slash eye"></i>
        </div>
        <div className="input_box">
          <input
            id="cpass"
            type="password"
            placeholder="Confirm Password"
            name="cpass"
            maxlength="20"
            className="box cpass"
          />
        </div>
        <p className="privacy">
          <label for="remember-me">
            <input type="checkbox" id="remember-me" /> I agree with{" "}
            <strong>Privacy Policy</strong> and <strong>Terms of Use</strong>.
          </label>
        </p>
        <input type="submit" value="register" name="login" className="btn" />
      </form>
    </section>
  );
}
