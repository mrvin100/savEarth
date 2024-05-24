/* eslint-disable react/no-unknown-property */

// function EditorHeader() {
//   return (
//     <header className="header">
//       <div className="main-header container">
//         <a href="dashboard.html" className="logo">
//           <sup>sav.</sup>Earth
//         </a>
//         <form action="" method="post" className="search_form">
//           <input
//             type="text"
//             placeholder="what do you think.. ?"
//             required
//             className="box"
//           />
//           <button type="submit" className="icon bx bx-search"></button>
//         </form>
//         <div className="icons">
//           <div id="search-icon" className="bx bx-search icon"></div>
//           <div id="user-icon" className="bx bx-user icon"></div>
//           <div id="moon-icon" className="bx bx-moon icon"></div>
//         </div>
//       </div>
//     </header>
//   );
// }

export default function AddPost() {
  return (
    <section className="login-register-section container">
      <form className="form-container login">
        <h1 className="heading">Add your Article</h1>
        <div className="input_box">
          <input
            id="email"
            type="text"
            placeholder="Enter Header"
            name="header"
            maxlength="50"
            className="box"
          />
        </div>
        <div className="input_box">
          <input
            id="profession"
            type="text"
            placeholder="Enter tags t#t#..."
            name="tags"
            maxlength="50"
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
        <input type="submit" value="create" name="login" className="btn" />
      </form>
    </section>
  );
}
