import { createContext, useEffect, useState } from "react"

export const ItemsContext = createContext({})

export const ItemsContextProvider = ({children}) => {

  const [cartItems, setCartItems] = useState([])

  const addToCart = (item, quantity = 1) => {
    const existingItem = cartItems.find(i => i.itemId === item.itemId);
  
    if (existingItem) {
      const updatedCartItems = cartItems.map(i =>
        i.itemId === item.itemId
          ? { ...i, itemQuantity: i.itemQuantity + quantity }
          : i
      );
      setCartItems(updatedCartItems);
    } else {
      const newItem = { ...item, itemQuantity: quantity };
      setCartItems([...cartItems, newItem]);
    }
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
  }
  
  return (
    <ItemsContext.Provider value={Items}>
      {children}
    </ItemsContext.Provider>
    ) 
}