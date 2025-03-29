import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Product } from "../assets/types/Products";

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product, quality: number) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  calculateTotal: (cart: Product[]) => number;
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

  const calculateTotal = useCallback((cart: Product[]) => {
    const productCounts: { [id: number]: number } = {};

    return cart.reduce((total, item) => {
      const { id, price, quantity, discount } = item;

      if (!id) return total;
      if (!productCounts[id]) {
        productCounts[id] = 0;
      }
      let priceToAdd = 0;
      let discountApplied = false;

      for (let i = 0; i < (quantity ?? 0); i++) {
        if (productCounts[id] === 0 && discount && !discountApplied) {
          priceToAdd = price! * (1 - discount / 100);
          discountApplied = true;
        } else {
          priceToAdd = price!;
        }

        total += priceToAdd;
        productCounts[id] += 1;
      }

      return total;
    }, 0);
  }, []);
  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, calculateTotal }}
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
