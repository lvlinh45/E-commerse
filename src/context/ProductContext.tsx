import React, { createContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../assets/types/Products";
import { imgProduct } from "../constants/urlProduct";

// Define the structure of the context value
interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | null>(null);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(imgProduct);
      localStorage.setItem("products", JSON.stringify(imgProduct));
    }
  }, []);

  const addProduct = (product: Product) => {
    const newProducts = [...products, product];
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
