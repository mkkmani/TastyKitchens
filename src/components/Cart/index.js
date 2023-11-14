/* eslint-disable react/no-unknown-property */
import {Component} from 'react'
import {Link} from 'react-router-dom'
import {AiOutlineMinusSquare, AiOutlinePlusSquare} from 'react-icons/ai'
import {BsCheckCircleFill} from 'react-icons/bs'
import Context from '../../Context/Context'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const FoodItemCard = props => {
  const {details, onClickIncreaseOrDecrease} = props
  const {name, cost, foodImageUrl, quantity} = details
  const price = cost * quantity

  return (
    <li className="cart-food-item-container">
      <img className="food-image" src={foodImageUrl} alt="food item" />
      <div className="cart-food-item-details">
        <h1 className="food-name">{name}</h1>
        <div className="button-cart-div">
          <AiOutlineMinusSquare
            className="increase-decrease"
            testid="decrement-quantity"
            onClick={() => onClickIncreaseOrDecrease(details, -1)}
          />
          <p className="quantity-count" testid="item-quantity">
            {quantity}
          </p>
          <AiOutlinePlusSquare
            className="increase-decrease"
            testid="increment-quantity"
            onClick={() => onClickIncreaseOrDecrease(details, 1)}
          />
        </div>
        <p className="cart-price" testid="total-price">{`₹ ${price}`}</p>
      </div>
    </li>
  )
}

class Cart extends Component {
  state = {
    orderPlaced: false,
  }

  renderCartPage = () => (
    <Context.Consumer>
      {context => {
        const {cartList, onClickIncreaseOrDecrease, placeOrder} = context
        const {history} = this.props
        const totalAmount =
          cartList.length > 0
            ? cartList.reduce(
                (total, item) => total + item.cost * item.quantity,
                0,
              )
            : 0

        const onClickOrderNow = () => {
          history.replace('/')
        }

        const onClickPlaceOrder = () => {
          placeOrder()
          this.setState({orderPlaced: true})
        }
        return (
          <div className="cart-container">
            <div>
              {cartList.length > 0 ? (
                <ul className="cart-ul">
                  {cartList.map(each => (
                    <FoodItemCard
                      testid="cartItem"
                      details={each}
                      onClickIncreaseOrDecrease={onClickIncreaseOrDecrease}
                      key={each.id}
                    />
                  ))}
                </ul>
              ) : (
                <div className="cart-no-items-container">
                  <img
                    src="https://res.cloudinary.com/dj1bucjya/image/upload/v1699492365/TastyKitchens/no_cart_items_rlq5zp.png"
                    alt="empty cart"
                  />
                  <h1 className="cart-empty-heading">No Order Yet!</h1>
                  <p className="empty-cart-desc">
                    Your cart is empty. Add something from the menu.
                  </p>
                  <Link to="/" className="link-item">
                    <button
                      type="button"
                      className="cart-home-button"
                      onClick={onClickOrderNow}
                    >
                      Order now
                    </button>
                  </Link>
                </div>
              )}
            </div>

            <div>
              {cartList.length > 0 && (
                <div>
                  <hr className="dashed-line" />
                  <div className="total-cost-div">
                    <h1 className="total-cost-h1">Order Total:</h1>
                    <h1 className="total-amount" testid="total-price">
                      <span>&#x20B9;</span>
                      {totalAmount.toFixed(2)}
                    </h1>
                  </div>
                  <div className="place-order-button-div">
                    <button
                      className="place-order"
                      type="button"
                      onClick={onClickPlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="cart-footer">
              {cartList.length > 0 && <Footer />}
            </div>
          </div>
        )
      }}
    </Context.Consumer>
  )

  renderPayment = () => (
    <div className="payment-container">
      <div className="payment-details">
        <BsCheckCircleFill className="check-circle" />
        <h1 className="payment-h1">Payment Successful</h1>
        <p className="payment-desc">
          Thank you for ordering Your payment is successfully completed.
        </p>
        <Link to="/" className="link-item">
          <button className="goto-home-btn" type="button">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  )

  renderView = () => {
    const {orderPlaced} = this.state

    switch (orderPlaced) {
      case true:
        return this.renderPayment()
      case false:
        return this.renderCartPage()

      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default Cart
