import React from 'react'

const Context = React.createContext({
  cartList: [],
  onAddToCart: () => {},
  onClickIncreaseOrDecrease: () => {},
  placeOrder: () => {},
})

export default Context
