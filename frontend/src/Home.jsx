import { Link } from "react-router-dom";
import homeImg from "./img/home-image.svg";
import about1 from "./img/about1.svg";
import about2 from "./img/about2.svg";
import about3 from "./img/about3.svg";
import Footer from "./components/Footer";

function Home() {
  return (
    // <!-- home section starts -->
    <>
      <section className="home container">
        <div className="content">
          <h1 className="heading">Teach worldwide</h1>
          <p>
            Our planet needs us! A global movement for change is underway, from
            small acts like ditching plastic to big solutions like solar power.
            Every step counts. Join the fight, raise your voice, take action!
            Let&apos;s be the generation that heals the Earth.
          </p>
          <div className="btns">
            <Link className="btn" to="/blog">
              our articles
            </Link>
            <Link className="link" to="/donations">
              donate now
            </Link>
          </div>
          <div className="partners">
            <span>Partners of acts :</span>
            <i class="bx bxl-yelp icon"></i>
            <i class="bx bxl-digitalocean icon"></i>
            <i class="bx bxl-quora icon"></i>
            <i class="bx bxl-yelp icon"></i>
            <i class="bx bxl-wix icon"></i>
          </div>
        </div>
        <div className="image">
          <img src={homeImg} alt="home image" />
        </div>
      </section>
      <section className="about container">
        <h2 className="heading">
          about us <span>#</span>savEarth!
        </h2>
        <div className="box_container">
          <div className="box">
            <img src={about1} alt="about image" />
            <h3 className="title">Get Up!</h3>
            <p>
              Our planet needs heroes. Will you be one? Fight climate change
              with a donation to leading experts & organizations.
            </p>
          </div>
          <div className="box">
            <img src={about2} alt="about image" />
            <h3 className="title">Change Mind</h3>
            <p>
              Small actions, big impact. Donate today and join the fight for a
              healthier planet with trusted climate experts & NGOs.
            </p>
          </div>
          <div className="box">
            <img src={about3} alt="about image" />
            <h3 className="title">Try it yourself</h3>
            <p>
              Our planet is our shared home. Together, let&apos;s rise to the
              climate challenge. Every contribution, big or small, makes a
              difference.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
