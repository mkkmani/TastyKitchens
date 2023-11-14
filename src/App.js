import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Context from './Context/Context'
import Profile from './components/Profile'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import Restaurant from './components/Restaurant'
import Cart from './components/Cart'
import NotFound from './components/NotFound'

import ProtectedRouter from './components/ProtectedRouter/protectedRouter'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  componentDidMount() {
    const savedCartList = localStorage.getItem('cartData')
    if (savedCartList) {
      this.setState({cartList: JSON.parse(savedCartList)})
    }
  }

  onAddToCart = item => {
    this.setState(({cartList}) => {
      const updatedCartList = [...cartList, item]
      localStorage.setItem('cartData', JSON.stringify(updatedCartList))
      return {cartList: updatedCartList}
    })
  }

  clearCartList = () => {
    this.setState({cartList: []})
    localStorage.removeItem('cartData')
  }

  onClickIncreaseOrDecrease = (item, quantity) => {
    this.setState(prevState => {
      const {cartList} = prevState

      const updatedCartList = cartList.map(cartItem => {
        if (cartItem.id === item.id) {
          const updatedQuantity = cartItem.quantity + quantity

          if (updatedQuantity > 0) {
            return {...cartItem, quantity: updatedQuantity}
          }
          return null
        }

        return cartItem
      })

      const filteredCartList = updatedCartList.filter(
        eachItem => eachItem !== null,
      )

      localStorage.setItem('cartList', JSON.stringify(filteredCartList))

      return {cartList: filteredCartList}
    })
  }

  render() {
    const {cartList} = this.state
    return (
      <Context.Provider
        value={{
          cartList,
          onClickIncreaseOrDecrease: this.onClickIncreaseOrDecrease,
          onAddToCart: this.onAddToCart,
          placeOrder: this.clearCartList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRouter exact path="/" component={HomeRoute} />
          <ProtectedRouter
            exact
            path="/restaurant/:id"
            component={Restaurant}
          />
          <ProtectedRouter exact path="/cart" component={Cart} />
          <ProtectedRouter exact path="/profile" component={Profile} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </Context.Provider>
    )
  }
}
export default App
