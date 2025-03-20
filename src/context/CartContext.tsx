import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../assets/types/Products";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product, quality: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getCartFromLocalStorage = (): Product[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

const saveCartToLocalStorage = (cart: Product[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<Product[]>(getCartFromLocalStorage());

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);
  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingCartItem = prevCart.find((item) => item.id === product.id);

      if (existingCartItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: quantity } : item
        );
      } else {
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
