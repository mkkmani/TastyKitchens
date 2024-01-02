import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {BiMenu} from 'react-icons/bi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    isMenuOpened: false,
  }

  toggleMenu = () => {
    this.setState(prev => ({
      isMenuOpened: !prev.isMenuOpened,
    }))
  }

  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  renderHeader = () => {
    const {isMenuOpened} = this.state
    const logoUrl =
      'https://res.cloudinary.com/dj1bucjya/image/upload/v1699219359/TastyKitchens/logo_pmueca.png'

    return (
      <>
        <nav className="nav-container">
          <div className="nav-website-logo">
            <Link to="/" className="nav-logo link-item">
              <img src={logoUrl} alt="website logo" />
              <p className="nav-site-name">Tasty Kitchens</p>
            </Link>
          </div>
          <div className="nav-menu-options">
            <BiMenu className="menu-icon" onClick={this.toggleMenu} />
            <ul className="nav-lg-menu-options">
              <Link to="/profile" className="link-item">
                <img
                  className="header-profile"
                  src="https://res.cloudinary.com/dj1bucjya/image/upload/c_crop,ar_1:1/v1704162352/WhatsApp_Image_2024-01-01_at_00.08.40_6e8bfbd9_pr6pcl.jpg"
                  alt="profile"
                />
              </Link>
              <Link to="/" className="link-item home">
                Home
              </Link>
              <Link to="/cart" className="link-item cart">
                Cart
              </Link>
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </ul>
          </div>
        </nav>
        {isMenuOpened && (
          <div className="nav-sm-menu-items">
            <ul className="nav-sm-menu-options">
              <Link to="/" className="link-item home">
                Home
              </Link>
              <Link to="/cart" className="link-item cart">
                Cart
              </Link>
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
              <Link to="/profile" className="link-item">
                <img
                  className="header-profile"
                  src="https://res.cloudinary.com/dj1bucjya/image/upload/c_crop,ar_1:1/v1704162352/WhatsApp_Image_2024-01-01_at_00.08.40_6e8bfbd9_pr6pcl.jpg"
                  alt="profile"
                />
              </Link>
            </ul>
            <AiFillCloseCircle
              className="menu-icon close"
              onClick={this.toggleMenu}
            />
          </div>
        )}
      </>
    )
  }

  render() {
    return this.renderHeader()
  }
}

export default withRouter(Header)
