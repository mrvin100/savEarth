export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <span className="logo">
          <sup>sav.</sup>Earth
        </span>
        <div className="box_container">
          <div className="box">
            <h3 className="heading">#follow us</h3>
            <div className="socials">
              <i className="bx bxl-facebook"></i>
              <i className="bx bxl-youtube"></i>
              <i className="bx bxl-github"></i>
              <i className="bx bxl-linkedin"></i>
              <i className="bx bxl-slack-old"></i>
            </div>
          </div>
          <div className="box">
            <h3 className="heading">#contact us</h3>
            <div className="locate">
              <a href="tel:658778110" className="link">
                +237 658778110
              </a>
              <a href="mailto:savearth@gmail.com" className="link">
                savearth@gmail.com
              </a>
              <span>Tradex-Emana, Yaounde Cameroon.</span>
            </div>
          </div>
        </div>
        <p className="copyright">
          &copy;2024 <span>SavEarth</span> Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
