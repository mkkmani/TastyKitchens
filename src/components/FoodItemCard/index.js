/* eslint-disable react/no-unknown-property */
import {
  AiFillStar,
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
} from 'react-icons/ai'

const FoodItemCard = props => {
  const {details, isInCart, onAddToCart, onClickIncreaseOrDecrease} = props
  const {name, cost, rating, foodImageUrl, quantity} = details

  const onClickAddToCart = () => {
    onAddToCart({...details, quantity: 1})
  }

  return (
    <li className="food-item-container" testid="foodItem">
      <img className="food-image" src={foodImageUrl} alt="food item" />
      <div className="food-item-details">
        <h1 className="food-name">{name}</h1>
        <p className="price">{`₹ ${cost}`}</p>
        <div className="item-rating">
          <AiFillStar className="star" />
          <p className="food-rating">{rating}</p>
        </div>
        {isInCart ? (
          <div className="button-cart-div">
            <AiOutlineMinusSquare
              className="increase-decrease"
              testid="decrement-count"
              onClick={() => onClickIncreaseOrDecrease(details, -1)}
            />
            <p className="quantity-count" testid="active-count">
              {quantity}
            </p>
            <AiOutlinePlusSquare
              className="increase-decrease"
              testid="increment-count"
              onClick={() => onClickIncreaseOrDecrease(details, 1)}
            />
          </div>
        ) : (
          <button
            type="button"
            className="add-button"
            onClick={onClickAddToCart}
          >
            Add
          </button>
        )}
      </div>
    </li>
  )
}

export default FoodItemCard
