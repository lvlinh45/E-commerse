import { IconButton } from "@mui/material";
import EmblaCarousel from "../../../components/EmblaCarousel/EmblaCarousel";
import { IconNotRatingStar, IconStar } from "../../../assets/icons/Icons";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BreadScrumbs from "../../../components/Universal/Breadscrumb";
import { useParams } from "react-router-dom";
import { imgProduct } from "../../../constants/urlProduct";
import React, { useEffect, useState } from "react";
import { useCart } from "../../../context/CartContext"; // Import useCart hook
import { Product } from "../../../assets/types/Products";
import DrawerSiderBar from "../../../components/drawer";

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = imgProduct.find((item) => item.id === parseInt(id ?? "0"));
  const { cart, addToCart } = useCart(); // Destructure useCart

  const [cartItems, setCartItems] = React.useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  console.log("TCL: ProductDetailPage -> drawerOpen", open);
  useEffect(() => {
    if (product) {
      const existingCartItem = cartItems.find((item) => item.id === product.id);
      if (!existingCartItem) {
        setCartItems((prevItems) => [
          ...prevItems,
          { ...product, quantity: 1 },
        ]);
      }
    }
  }, [product, cartItems]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, (item.quantity ?? 0) + change) }
          : item
      )
    );
  };

  const currentProductInCart = cartItems.find(
    (item) => item.id === product?.id
  );
  const currentQuantity = currentProductInCart?.quantity ?? 1;

  const SLIDES = [];
  if (product?.imageUrl) {
    SLIDES.push(product?.imageUrl);
  }

  const handleAddToCart = () => {
    if (product) {
      const existingItem = cart.find((item) => item.id === product.id);
      const newQuantity = currentQuantity;

      if (existingItem) {
        addToCart(product, (existingItem.quantity ?? 0) + newQuantity);
      } else {
        addToCart(product, newQuantity);
      }
      setOpen(true);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <BreadScrumbs
        page={"Home"}
        subPage={"New Arrivals"}
        destination={product?.name ?? "Product"}
      ></BreadScrumbs>
      <DrawerSiderBar
        open={open}
        onClose={() => setOpen(false)}
      ></DrawerSiderBar>
      <div className="product-detail-container">
        <div className="product-wrapper">
          <EmblaCarousel slides={SLIDES}>
            {SLIDES.map((slide, index) => (
              <div key={index} className="relative">
                <img
                  className="h-full rounded-2xl w-full aspect-square object-cover"
                  src={slide}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </EmblaCarousel>
        </div>
        <div className="product-info">
          <h3 className="product-vendor">{product.vendor}</h3>
          <h2 className="product-title">{product.name}</h2>
          <h3 className="product-brand">
            <span>T-Shirts</span>
            <span>SKU A15164</span>
          </h3>
          <div className="icon-star product-star">
            {Array.from({ length: 5 }, (_, index) =>
              index < (product?.rating ?? 0) ? (
                <IconStar key={index} />
              ) : (
                <IconNotRatingStar key={index} />
              )
            )}
            <span>
              ({product?.rating} /5 đánh giá) Xem {product?.numberOfReviews}{" "}
              đánh giá
            </span>
          </div>
          <div className="product-price">
            {product?.price?.toLocaleString()} VNĐ
          </div>
          <div>
            <p className="product-quantity">Size</p>
            <div className="product-size">
              <div>A/XS</div>
              <div className="product-disable">A/S</div>
              <div>A/L</div>
              <div>A/XL</div>
            </div>
          </div>
          <div>
            <p className="product-quantity">Quantity</p>
            <div className="product-actions">
              <div className="product-calculate">
                <IconButton
                  onClick={() =>
                    product?.id && handleQuantityChange(product.id, -1)
                  }
                  disabled={currentQuantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <span>{currentQuantity}</span>
                <IconButton
                  onClick={() =>
                    product?.id && handleQuantityChange(product.id, 1)
                  }
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="product-button">
            <button>Buy it now</button>
            <button onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
