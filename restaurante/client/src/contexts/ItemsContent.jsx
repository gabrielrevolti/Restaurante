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

  const addToCart = (item, quantity = 1) => {
    const existingItem = cartItems.find(i => i.itemId === item.itemId);
  
    if (existingItem) {
      // Atualiza o item existente com a nova quantidade
      const updatedCartItems = cartItems.map(i =>
        i.itemId === item.itemId
          ? { ...i, itemQuantity: i.itemQuantity + quantity }
          : i
      );
      setCartItems(updatedCartItems);
    } else {
      // Adiciona o novo item com a quantidade especificada
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
    user
  }
  
  return (
    <ItemsContext.Provider value={Items}>
      {children}
    </ItemsContext.Provider>
    ) 
}