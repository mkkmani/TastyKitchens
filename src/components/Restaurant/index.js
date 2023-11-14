/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import Context from '../../Context/Context'
import Header from '../Header'
import Footer from '../Footer'
import FoodItemCard from '../FoodItemCard'
import './index.css'

const apiStatusList = {
  init: 'INIT',
  success: 'SUCCESS',
  loading: 'LOADING',
}

class Restaurant extends Component {
  state = {
    apiStatus: apiStatusList.init,
    restaurantDetails: {},
  }

  componentDidMount() {
    this.getRestaurantDetails()
  }

  getRestaurantDetails = async () => {
    this.setState({apiStatus: apiStatusList.loading})
    const {
      match: {
        params: {id},
      },
    } = this.props

    const jwtToken = Cookies.get('jwt_token')
    const api = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = {
        rating: data.rating,
        id: data.id,
        name: data.name,
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        restoImageUrl: data.image_url,
        reviewsCount: data.reviews_count,
        opensAt: data.opens_at,
        location: data.location,
        itemsCount: data.items_count,
        foodItems: data.food_items.map(eachItem => ({
          name: eachItem.name,
          cost: eachItem.cost,
          foodType: eachItem.food_type,
          foodImageUrl: eachItem.image_url,
          id: eachItem.id,
          rating: eachItem.rating,
        })),
      }

      this.setState({
        restaurantDetails: updatedData,
        apiStatus: apiStatusList.success,
      })
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="restaurant-details-loader">
      <Loader type="Puff" color="orange" height={50} width={50} />
    </div>
  )

  renderRestoDetails = () => {
    const {restaurantDetails} = this.state
    return (
      <Context.Consumer>
        {context => {
          const {cartList, onAddToCart, onClickIncreaseOrDecrease} = context

          const {
            name,
            restoImageUrl,
            cuisine,
            rating,
            reviewsCount,
            location,
            costForTwo,
            foodItems,
          } = restaurantDetails

          const isItemAvailableInCart = itemId =>
            cartList.some(each => each.id === itemId)

          return (
            <div
              testid="restaurant-details-loader"
              className="restaurant-container"
            >
              <Header className="resto-header" />
              <div className="restaurant-details-banner">
                <div className="image-container">
                  <img
                    className="resto-image"
                    src={restoImageUrl}
                    alt="restaurant"
                  />
                </div>
                <div className="checking">
                  <div className="details-container">
                    <h1 className="resto-name">{name}</h1>
                    <p className="resto-cuisine">{cuisine}</p>
                    <p className="location">{location}</p>
                    <div className="rating-cost">
                      <div className="rating-div">
                        <div className="star-rating">
                          <AiFillStar className="star" />
                          <p className="rating">{rating}</p>
                        </div>
                        <p className="reviews">{`${reviewsCount}+ Ratings`}</p>
                      </div>
                      <hr className="line" />
                      <div className="cost-for-two">
                        <p className="cost">{`₹ ${costForTwo}`}</p>
                        <p className="for-two">Cost for two</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <ul className="items-list">
                  {foodItems.map(each => (
                    <FoodItemCard
                      key={each.id}
                      details={
                        isItemAvailableInCart(each.id)
                          ? cartList.find(item => item.id === each.id)
                          : each
                      }
                      isInCart={isItemAvailableInCart(each.id)}
                      onAddToCart={onAddToCart}
                      onClickIncreaseOrDecrease={onClickIncreaseOrDecrease}
                    />
                  ))}
                </ul>
              </div>
              <Footer />
            </div>
          )
        }}
      </Context.Consumer>
    )
  }

  renderRestoPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusList.loading:
        return this.renderLoader()

      case apiStatusList.success:
        return this.renderRestoDetails()

      default:
        return null
    }
  }

  render() {
    return this.renderRestoPage()
  }
}

export default Restaurant
