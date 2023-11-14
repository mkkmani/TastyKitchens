/* eslint-disable react/no-unknown-property */
import {Link, withRouter} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'

const RestaurantCard = props => {
  const {details} = props
  const {id, imageUrl, name, cuisine, rating, totalReviews} = details

  return (
    <Link to={`restaurant/${id}`} className="home-link-item">
      <div testid="restaurant-item" className="home-restaurant-card">
        <div className="home-image-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="home-restaurant-img"
          />
        </div>
        <div className="home-resto-details-container">
          <h1 className="home-resto-name">{name}</h1>
          <p className="home-resto-cuisine">{cuisine}</p>
          <div className="home-resto-rating-div">
            <AiFillStar className="home-star" />
            <p className="home-rating-text">{rating}</p>
            <p className="home-reviews">{`(${totalReviews}) reviews`}</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default withRouter(RestaurantCard)
