import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [schedule, setSchedule] = useState(null);

  function addToCart(product) {
    const exists = cart.find(item => item.id === product.id);

    if (exists) {
      if (exists.quantity >= product.stock) {
        return false;
      }

      setCart(prev =>
        prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      return true;
    }

    if (product.stock <= 0) {
      return false;
    }

    setCart(prev => [...prev, { ...product, quantity: 1 }]);
    return true;
  }

  function removeFromCart(id) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
    setSchedule(null);
  }

  function selectSchedule(schedule) {
    setSchedule(schedule);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        schedule,
        selectSchedule,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
