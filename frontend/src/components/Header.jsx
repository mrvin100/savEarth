import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  { key: "blog", label: "blog", isdropdown: true },
  { key: "donations", label: "donations", isdropdown: true },
  { key: "login", label: "login" },
  { key: "register", label: "register" },
  { key: "dashboard", label: "dashboard" },
];

// Navbar component starts

const Navbar = ({ items, status, toggle }) => {
  const [theme, setTheme] = useState(false);
  const changeTheme = () => {
    setTheme(!theme);
    console.log(`theme is changed: ${theme}`);
    document.body.classList.toggle("dark");
  };

  return (
    <nav className={`navbar ${status ? "show" : ""}`}>
      <Link key="home" to="/" className="nav_link">
        home
      </Link>
      {items.map((item) => (
        <Link
          key={item.label}
          to={`/${item.label}`}
          // onClick={toggle}
          className="nav_link"
        >
          {item.label}
          {item.isdropdown ? <i className="bx bx-chevron-down"></i> : ""}
        </Link>
      ))}

      <div className="icons">
        <div
          id="moon-icon"
          className="bx bx-moon icon"
          onClick={changeTheme}
        ></div>
        <div id="close-icon" className="bx bx-x icon" onClick={toggle}></div>
      </div>
    </nav>
  );
};

export default function Header() {
  const [navbar, setNavbar] = useState(false);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };
  return (
    <header className="header">
      <div className="offers">
        <i className="bx bx-sticker"></i>
        <p>join the 30% of activists who save a life!</p>
        <Link to="donations" className="link">
          Donate now <i className="fas fa-bolt"></i>
        </Link>
      </div>
      <div className="main-header container">
        <Link to="/" className="logo">
          <sup>sav.</sup>Earth
        </Link>

        {/* navbar component starts */}

        <Navbar items={items} status={navbar} toggle={toggleNavbar} />

        <form action="" method="post" className="search_form">
          <input
            type="text"
            placeholder="what do you think.. ?"
            required
            className="box"
          />
          <button type="submit" className="icon bx bx-search"></button>
        </form>

        <div className="icons">
          <div id="search-icon" className="bx bx-search icon"></div>
          <Link
            to="/dashboard"
            id="user-icon"
            title="dashboard"
            className="bx bx-user icon"
          ></Link>
          <div className="bx bx-shopping-bag icon"></div>
          <div
            id="menu-icon"
            className="bx bx-grid-alt icon"
            onClick={toggleNavbar}
            style={{ opacity: navbar ? 0 : 1 }}
          ></div>
        </div>
      </div>
      <Link
        to="/add-post"
        className="bx bx-notepad icon add_post"
        title="add post"
      ></Link>
    </header>
  );
}
