import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => {
  const imageUrl =
    'https://res.cloudinary.com/dj1bucjya/image/upload/v1699513940/TastyKitchens/not_found_s8vh8q.png'

  return (
    <div className="not-found-container">
      <img src={imageUrl} alt="not found" className="not-found-img" />
      <h1 className="h1-not-found">Page Not Found</h1>
      <p className="not-found-desc">
        we are sorry, the page you requested could not be found.
      </p>
      <p className="not-found-desc"> Please go back to the homepage</p>
      <Link to="/" className="link-item">
        <button type="button" className="nf-button">
          Home Page
        </button>
      </Link>
    </div>
  )
}

export default NotFound
