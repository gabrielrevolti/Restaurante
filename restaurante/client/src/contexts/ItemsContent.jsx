import { createContext, useEffect, useState } from "react"
import httpClient from "../hooks/httpClient"

export const ItemsContext = createContext({})

export const ItemsContextProvider = ({children}) => {

  const [user, setUser] = useState(null)

  useEffect(() => {
    const getUser = async () => {
    const response = await httpClient.get("//localhost:5000/userinfo");

    if (response.data.error) {
      setUser(null)
    } else {
      setUser(response.data)
    }
    };

    getUser();
  }, [])

  const [cartItems, setCartItems] = useState([])

  const addToCart = (item) => {
    const verify = cartItems.filter(i => i.itemId == item.itemId)
    console.log(verify)
    if(verify.length >= 1){
      item.itemQuantity += 1
    }
    else {
      const updatedCartItems = [...cartItems, item]
      setCartItems(updatedCartItems)
      item.itemQuantity = 1
    }
   console.log(cartItems)
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
    user
  }
  
  return (
    <ItemsContext.Provider value={Items}>
      {children}
    </ItemsContext.Provider>
    ) 
}