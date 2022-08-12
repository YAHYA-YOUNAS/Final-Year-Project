import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaEnvelope, FaPhone, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import {
  faFacebookSquare,
  faInstagramSquare,
  faYoutubeSquare,
  faTwitterSquare,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <hr />
      <div className="container">
        <div className="footer-item">
          <h2> Links</h2>
          <div className="footer-links">
            <NavHashLink
              className="footer-link"
              to="/#video-section"
              activeClassName="selected"
              smooth
            >
              Videos
            </NavHashLink>

            <NavHashLink
              className="footer-link"
              to="/#featured-section"
              activeClassName="selected"
              smooth
            >
              Featured
            </NavHashLink>
            <Link
              className="footer-link"
              to="/trending"
              onClick={() => window.scrollTo(0, 0)}
            >
              Trending Hotels
            </Link>
          </div>
        </div>
        <div className="footer-item">
          <h2>Quick Links</h2>
          <div className="footer-links">
            <Link
              className="footer-link"
              to="/"
              onClick={() => window.scrollTo(0, 0)}
            >
              Home
            </Link>

            <Link
              className="footer-link"
              to="/about"
              onClick={() => window.scrollTo(0, 0)}
            >
              About Us
            </Link>

            <Link
              className="footer-link"
              to="/contact"
              onClick={() => window.scrollTo(0, 0)}
            >
              Contact Us
            </Link>

            <Link
              className="footer-link"
              to="/privacyPolicy"
              onClick={() => window.scrollTo(0, 0)}
            >
              Privacy Policy
            </Link>
            <Link
              className="footer-link"
              to="/termsAndConditions"
              onClick={() => window.scrollTo(0, 0)}
            >
              Terms & Conditions
            </Link>
          </div>
        </div>
        <div className="footer-item">
          <h2>Contacts</h2>
          <div className="footer-links">
            <div className="footer-links-contacts">
              <p className="footer-link">
                <FaEnvelope /> &nbsp; info@pakitours.pk
              </p>
              <p className="footer-link">
                <FaPhone /> &nbsp; 057 00000000
              </p>
              <p className="footer-link">
                <FaWhatsapp /> &nbsp; +92 300 0000000
              </p>
              <p className="footer-link">
                CUI Attock Campus Near Kamra Road Attock City
              </p>
            </div>
          </div>
        </div>
        <br />
        <hr />
        <div className="copyrights-social-links">
          <p className="copyrights">&copy; All Rights Reserved.</p>
          <div className="social-links">
            <h3>CONNECT WITH US</h3>
            <a className="social-link" href="/">
              <FontAwesomeIcon
                icon={faFacebookSquare}
                size="2x"
                color="#4267B2"
              />
            </a>
            <a className="social-link" href="/">
              <FontAwesomeIcon
                icon={faInstagramSquare}
                size="2x"
                color="#e95950"
              />
            </a>
            <a className="social-link" href="/">
              <FontAwesomeIcon
                icon={faYoutubeSquare}
                size="2x"
                color="#c4302b"
              />
            </a>
            <a className="social-link" href="/">
              <FontAwesomeIcon
                icon={faTwitterSquare}
                size="2x"
                color="#1DA1F2"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
