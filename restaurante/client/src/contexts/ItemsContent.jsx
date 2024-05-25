import { createContext, useState } from "react"

export const ItemsContext = createContext({})

export const ItemsContextProvider = ({children}) => {

  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    const updatedCartItems = [...cartItems, item]
    setCartItems(updatedCartItems)
  }

  const removeToCart = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.itemId !== itemId)
    console.log("removendo")
    setCartItems(updatedCartItems)
  }

  const Items = {
    cartItems,
    addToCart,
    removeToCart,
  }
  
  return (
    <ItemsContext.Provider value={Items}>
      {children}
    </ItemsContext.Provider>
    ) 
}