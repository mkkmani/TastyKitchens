import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {
    showError: false,
    errorMsg: '',
    showUsername: '',
    showPassword: '',
  }

  componentDidMount() {
    const token = Cookies.get('jwt_token')
    const {history} = this.props

    if (token) {
      history.replace('/')
    }
  }

  onChangeInput = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  onClickLogin = async e => {
    e.preventDefault()
    const {showUsername, showPassword} = this.state
    const {history} = this.props

    const userDetails = {
      username: 'rahul',
      password: 'rahul@2021',
    }
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(api, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {expires: 30})
        history.replace('/')
      } else {
        this.setState({errorMsg: 'Invalid Credentials'})
      }

    // if (showUsername === 'mani' && showPassword === 'Mani@123') {
    //   const response = await fetch(api, options)
    //   const data = await response.json()

    //   // if (response.ok) {
    //   //   Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    //   //   history.replace('/')
    //   // } else {
    //   //   this.setState({errorMsg: 'Invalid Credentials'})
    //   // }
    // } else {
    //   let errorMsg = ''

    //   // if (showUsername !== 'mani' && showPassword !== 'Mani@123') {
    //   //   errorMsg = 'Invalid Username and Password'
    //   // } else if (showUsername !== 'mani') {
    //   //   errorMsg = 'Invalid Username'
    //   // } else if (showPassword !== 'Mani@123') {
    //   //   errorMsg = 'Invalid Password'
    //   // } else {
    //   //   errorMsg = 'Invalid Login Details'
    //   // }
    //   this.setState({errorMsg, showError: true})
    // }
  }

  renderLoginPage = () => {
    const {showUsername, showPassword, showError, errorMsg} = this.state

    return (
      <div className="app-container">
        <div className="main-image-container">
          <div className="sm-image-container">
            <img
              src="https://res.cloudinary.com/dj1bucjya/image/upload/v1699219360/TastyKitchens/login-image-sm_tqn8el.png"
              alt="website login"
            />
          </div>
          <div className="lg-image-container">
            <img
              className="image"
              src="https://res.cloudinary.com/dj1bucjya/image/upload/v1699219361/TastyKitchens/login-image-lg_vra0d1.png"
              alt="website login"
            />
          </div>
        </div>
        <div className="main-input-container">
          <div className="input-container">
            <div className="logo-container">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dj1bucjya/image/upload/v1699219359/TastyKitchens/logo_pmueca.png"
                alt="website logo"
              />
              <h1 className="website-name">Tasty Kitchens</h1>
            </div>
            <h1 className="login-name">Login</h1>
            <form className="form-container" onSubmit={this.onClickLogin}>
              <div className="label-input">
                <label className="label" htmlFor="username">
                  USERNAME
                </label>
                <input
                  className="input"
                  type="text"
                  name="showUsername"
                  id="username"
                  value={showUsername}
                  onChange={this.onChangeInput}
                />
              </div>
              <div className="label-input">
                <label className="label" htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="input"
                  name="showPassword"
                  type="password"
                  id="password"
                  value={showPassword}
                  onChange={this.onChangeInput}
                />
              </div>
              {showError && <p className="error-text">{errorMsg}</p>}

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return this.renderLoginPage()
  }
}

export default LoginRoute
