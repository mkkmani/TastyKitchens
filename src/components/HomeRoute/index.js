/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {AiOutlineLeft, AiOutlineRight} from 'react-icons/ai'
import {FcSearch} from 'react-icons/fc'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import RestaurantCard from '../RestaurantCardItem'
import Footer from '../Footer'

import './index.css'

const apiStatusList = {
  init: 'INIT',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class HomeRoute extends Component {
  state = {
    offersList: [],
    restaurantsList: [],
    restaurantsApiStatus: apiStatusList.init,
    offersApiStatus: apiStatusList.init,
    activePage: 1,
    selectedSortByValue: sortByOptions[1].value,
    searchInput: '',
  }

  componentDidMount() {
    this.getRestaurantOffers()
    this.getRestaurantsList()
  }

  onChangeSearch = e => {
    this.setState({searchInput: e.target.value})
  }

  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.getRestaurantsList()
    }
  }

  renderOffersLoader = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="Circles" color="orange" height="50" width="60" />
    </div>
  )

  getRestaurantOffers = async () => {
    this.setState({offersApiStatus: apiStatusList.loading})
    const jwtToken = Cookies.get('jwt_token')
    const api = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearers ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()

    const updatedData = data.offers.map(each => ({
      imageUrl: each.image_url,
      id: each.id,
    }))

    this.setState({
      offersList: updatedData,
      offersApiStatus: apiStatusList.success,
    })
  }

  getRestaurantsList = async () => {
    this.setState({restaurantsApiStatus: apiStatusList.loading})
    const {activePage, selectedSortByValue, searchInput} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    const updatedData = data.restaurants.map(each => ({
      hasOnlineDelivery: each.has_online_delivery,
      ratingText: each.user_rating.rating_text,
      ratingColor: each.user_rating.rating_color,
      totalReviews: each.user_rating.total_reviews,
      rating: each.user_rating.rating,
      name: each.name,
      hasTableBooking: each.has_table_booking,
      isDeliveringNow: each.is_delivering_now,
      costForTwo: each.cost_for_two,
      cuisine: each.cuisine,
      imageUrl: each.image_url,
      id: each.id,
      menuType: each.menu_type,
      location: each.location,
      opensAt: each.opens_at,
      groupByTime: each.group_by_time,
    }))

    this.setState({
      restaurantsList: updatedData,
      restaurantsApiStatus: apiStatusList.success,
    })
  }

  onChangeSort = e => {
    this.setState(
      {
        selectedSortByValue: e.target.value,
      },
      this.getRestaurantsList,
    )
  }

  renderSlides = () => {
    const {offersList} = this.state
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div>
        <Slider {...settings} className="slider">
          {offersList.map(each => (
            <li className="slider-div" key={each.id}>
              <img className="slider-image" src={each.imageUrl} alt="offer" />
            </li>
          ))}
        </Slider>
      </div>
    )
  }

  renderOffersWithLoader = () => {
    const {offersApiStatus} = this.state

    switch (offersApiStatus) {
      case apiStatusList.loading:
        return this.renderOffersLoader()
      case apiStatusList.success:
        return this.renderSlides()

      default:
        return null
    }
  }

  renderSortAndSearch = () => {
    const {searchInput, selectedSortByValue} = this.state

    return (
      <div className="search-sort-div">
        <h1 className="popular-restaurants">Popular Restaurants</h1>
        <p className="popular-restaurants-desc">
          Select your favourite restaurant special dish and make your day
          happy...
        </p>
        <div className="sort-search">
          <div className="search-div">
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearch}
              className="search-bar"
              onKeyDown={this.onKeyDown}
            />
            <FcSearch className="search-icon" />
          </div>
          <div className="sort-div">
            <BsFilterLeft />
            <p className="option">Sort By</p>
            <select
              value={selectedSortByValue}
              onChange={this.onChangeSort}
              className="select"
            >
              {sortByOptions.map(each => (
                <option key={each.id} value={each.value} className="option">
                  {each.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
        <hr className="home-hr-line" />
      </div>
    )
  }

  renderPagination = () => {
    const {activePage, restaurantsList} = this.state

    const rightDisabled = restaurantsList.length < 9

    const leftDisabled = activePage === 1

    const onClickLeft = () => {
      if (activePage > 1) {
        this.setState(
          prev => ({
            activePage: prev.activePage - 1,
          }),
          this.getRestaurantsList,
        )
      }
    }

    const onClickRight = () => {
      this.setState(
        prev => ({
          activePage: prev.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }

    return (
      <div className="pagination-div">
        <button
          type="button"
          className="pagination-button"
          onClick={onClickLeft}
          aria-label="Previous Page"
          testid="pagination-left-button"
          disabled={leftDisabled}
        >
          <AiOutlineLeft />
        </button>
        <span testid="active-page-number" className="active-page-count">
          {activePage}
        </span>
        <button
          type="button"
          className="pagination-button"
          onClick={onClickRight}
          aria-label="Next Page"
          testid="pagination-right-button"
          disabled={rightDisabled}
        >
          <AiOutlineRight />
        </button>
      </div>
    )
  }

  renderRestaurantsList = () => {
    const {restaurantsList} = this.state

    return (
      <ul className="home-ul-list">
        {restaurantsList.map(each => (
          <RestaurantCard key={each.id} details={each} />
        ))}
      </ul>
    )
  }

  renderRestaurantsLoader = () => (
    <div className="loader-container" testid="restaurants-list-loader">
      <Loader type="Circles" color="orange" height="50" width="60" />
    </div>
  )

  renderRestosWithLoader = () => {
    const {restaurantsApiStatus} = this.state

    switch (restaurantsApiStatus) {
      case apiStatusList.loading:
        return this.renderRestaurantsLoader()
      case apiStatusList.success:
        return this.renderRestaurantsList()

      default:
        return null
    }
  }

  renderHomePageView = () => (
    <div className="home-main-container">
      <Header />
      <div testid="restaurants-offers-loader" className="offers-div">
        {this.renderOffersWithLoader()}
      </div>
      <div>{this.renderSortAndSearch()}</div>
      <div className="restaurants-list-div">
        {this.renderRestosWithLoader()}
      </div>
      <div>{this.renderPagination()}</div>
      <Footer />
    </div>
  )

  render() {
    return this.renderHomePageView()
  }
}

export default HomeRoute
