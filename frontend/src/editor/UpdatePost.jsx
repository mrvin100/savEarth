export default function UpdatePost() {
  return (
    <section className="login-register-section container">
      <form className="form-container login">
        <h1 className="heading">update your Article</h1>
        <div className="input_box">
          <input
            id="email"
            type="text"
            placeholder="Enter Header"
            name="header"
            className="box"
          />
        </div>
        <div className="input_box">
          <input
            id="profession"
            type="text"
            placeholder="Enter tags t#t#..."
            name="tags"
            className="box"
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
          ></textarea>
        </div>
        <div className="input_box">
          <input type="file" name="file" className="articleImage box" />
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
