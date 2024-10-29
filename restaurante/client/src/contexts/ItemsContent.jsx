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
    const existingItem = cartItems.find(i => i.itemId === item.itemId);
  
    if (existingItem) {
      const updatedCartItems = cartItems.map(i => 
        i.itemId === item.itemId 
          ? { ...i, itemQuantity: i.itemQuantity + 1 } 
          : i
      );
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...item, itemQuantity: 1 };
      setCartItems([...cartItems, newItem]);
    }
  
    console.log(cartItems);
  };

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