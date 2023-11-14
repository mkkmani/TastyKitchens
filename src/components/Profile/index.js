import {Component} from 'react'
import {FaCheck} from 'react-icons/fa'
import {MdEdit} from 'react-icons/md'
import Header from '../Header'
import './index.css'

class Profile extends Component {
  state = {
    profileImage:
      'https://res.cloudinary.com/dj1bucjya/image/upload/v1699809652/profile_movdab.jpg',
    name: 'Manikanta',
    phone: '8985123346',
    email: 'manikantaketha1@gmail.com',
    editName: false,
    editPhone: false,
    editMail: false,
  }

  onChangeInput = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  onClickEdit = name => {
    this.setState({[name]: true})
  }

  onClickSave = name => {
    this.setState({[name]: false})
  }

  renderProfilePage = () => {
    const {
      profileImage,
      name,
      phone,
      email,
      editMail,
      editName,
      editPhone,
    } = this.state

    return (
      <div className="profile-container">
        <div className="profile-img-div">
          <img className="img" src={profileImage} alt="mani" />
        </div>
        <div className="details-profile">
          {editName ? (
            <div className="input-edit-div">
              <input
                className="profile-input"
                type="text"
                value={name}
                onChange={this.onChangeInput}
                name="name"
              />
              <FaCheck
                className="icon check-icon"
                onClick={() => this.onClickSave('editName')}
              />
            </div>
          ) : (
            <div className="name-display-div">
              <h2 className="profile-name">{name}</h2>
              <MdEdit
                className="icon"
                onClick={() => this.onClickEdit('editName')}
              />
            </div>
          )}
          {editPhone ? (
            <div className="input-edit-div">
              <input
                className="profile-input"
                type="number"
                value={phone}
                onChange={this.onChangeInput}
                name="phone"
              />
              <FaCheck
                className="icon check-icon"
                onClick={() => this.onClickSave('editPhone')}
              />
            </div>
          ) : (
            <div className="name-display-div">
              <h3 className="phone-mail">{phone}</h3>
              <MdEdit
                className="icon"
                onClick={() => this.onClickEdit('editPhone')}
              />
            </div>
          )}
          {editMail ? (
            <div className="input-edit-div">
              <input
                className="profile-input"
                type="email"
                name="email"
                onChange={this.onChangeInput}
                value={email}
              />
              <FaCheck
                className="icon check-icon"
                onClick={() => this.onClickSave('editMail')}
              />
            </div>
          ) : (
            <div className="name-display-div">
              <h3 className="phone-mail">{email}</h3>
              <MdEdit
                className="icon"
                onClick={() => this.onClickEdit('editMail')}
              />
            </div>
          )}
        </div>
        <div className="personal-div">
          <a
            href="https://drive.google.com/drive/folders/10waWmGPdtu15AmwUzZzqAtfDD1ygjBoM?usp=sharing"
            target="_blank"
            rel="noreferrer"
          >
            Resume
          </a>
          <a
            href="https://github.com/mkkmani/TastyKitchens"
            target="_blank"
            rel="noreferrer"
          >
            src code for this application
          </a>
          <a href="https://github.com/mkkmani" target="_blank" rel="noreferrer">
            Git page
          </a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderProfilePage()}
      </div>
    )
  }
}

export default Profile
