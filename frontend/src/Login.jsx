import loginImg from "./img/user-with-bag.png";

export default function Login() {
  return (
    <section className="login-register-section container">
      <div className="content">
        <h1 className="heading">
          Sign in
          <span>
            {" "}
            to <strong>savEarth </strong>is simply.
          </span>
        </h1>
        <p>
          If you don’t have an account <br />
          You can{" "}
          <a href="#" className="link">
            Register here!
          </a>
        </p>
        <img src={loginImg} alt="user with bag" />
      </div>
      <form
        action=""
        method="post"
        enctype="multipart/form-data"
        className="form-container login"
      >
        <h1 className="heading">Sign in</h1>
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
            id="pass"
            type="password"
            placeholder="Password"
            name="password"
            maxlength="20"
            className="box pass"
          />
          <i className="fas fa-eye-slash eye"></i>
        </div>
        <p className="remember">
          <label for="remember-me">
            <input type="checkbox" id="remember-me" disabled /> remember me{" "}
          </label>
          <a href="#" className="link">
            forgot password?
          </a>
        </p>
        <button type="submit" name="login" className="btn">
          login
        </button>
      </form>
    </section>
  );
}
