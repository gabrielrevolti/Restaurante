import { createContext, useState } from "react";

export const ItemsContext = createContext({});

export const ItemsContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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
    const updatedCartItems = cartItems.filter(item => item.itemId !== itemId);
    setCartItems(updatedCartItems);
  };

  const increaseQuantity = (itemId) => {
    const updatedCartItems = cartItems.map(item =>
      item.itemId === itemId
        ? { ...item, itemQuantity: item.itemQuantity + 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems
      .map(item =>
        item.itemId === itemId && item.itemQuantity > 1
          ? { ...item, itemQuantity: item.itemQuantity - 1 }
          : item
      )
    setCartItems(updatedCartItems);
  };

  const Items = {
    cartItems,
    addToCart,
    removeToCart,
    increaseQuantity,
    decreaseQuantity,
  };

  return (
    <ItemsContext.Provider value={Items}>
      {children}
    </ItemsContext.Provider>
  );
};
