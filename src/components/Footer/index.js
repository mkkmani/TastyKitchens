/* eslint-disable react/no-unknown-property */
import {
  FaFacebookSquare,
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="logo-name">
        <img
          src="https://res.cloudinary.com/dj1bucjya/image/upload/v1699315289/TastyKitchens/footer_logo_lsvrnv.png"
          alt="website-footer-logo"
        />
        <h1 className="name">Tasty Kitchens</h1>
      </div>
      <p className="description">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="icons-div">
        <li className="social-media-icon" testid="pintrest-social-icon">
          <FaPinterestSquare />
        </li>

        <li className="social-media-icon" testid="instagram-social-icon">
          <FaInstagram />
        </li>
        <li className="social-media-icon" testid="twitter-social-icon">
          <FaTwitter />
        </li>
        <li className="social-media-icon" testid="facebook-social-icon">
          <FaFacebookSquare />
        </li>
      </ul>
    </div>
  )
}
