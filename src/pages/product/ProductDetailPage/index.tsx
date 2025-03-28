import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import EmblaCarousel from "../../../components/EmblaCarousel/EmblaCarousel";
import { IconNotRatingStar, IconStar } from "../../../assets/icons/Icons";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BreadScrumbs from "../../../components/Universal/Breadscrumb";
import { useParams, useNavigate } from "react-router-dom";
import { imgProduct } from "../../../constants/urlProduct";
import { useCart } from "../../../context/CartContext";
import { Product } from "../../../assets/types/Products";
import DrawerSiderBar from "../../../components/drawer";
import { useTranslation } from "react-i18next";
import NotFoundPage from "../../notFound";
import Brand from "../../../components/brand";

const ProductDetailPage = () => {
  const { id } = useParams();
  const { t } = useTranslation("detailPage");
  const navigate = useNavigate();

  const product = imgProduct.find((item) => item.id === parseInt(id ?? "0"));
  const { cart, addToCart } = useCart();

  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>("A/XS");

  useEffect(() => {
    if (product) {
      const existingCartItem = cartItems.find((item) => item.id === product.id);
      if (!existingCartItem) {
        setCartItems((prevItems) => [
          ...prevItems,
          { ...product, quantity: 1, selectedSize },
        ]);
      }
    }
  }, [product, cartItems, selectedSize]);

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

  const handleBuyNow = () => {
    if (product) {
      const newCart = [{ ...product, quantity: currentQuantity, selectedSize }];
      addToCart(product, currentQuantity);
      navigate("/checkout", { state: { cart: newCart } });
    }
  };

  const handleSizeChange = (
    event: React.MouseEvent<HTMLElement>,
    newSize: string
  ) => {
    console.log("TCL: ProductDetailPage -> event", event);
    setSelectedSize(newSize);
  };

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <>
      <BreadScrumbs
        page={"Home"}
        subPage={"Collection"}
        destination={product?.name ?? "Product"}
      />
      <DrawerSiderBar open={open} onClose={() => setOpen(false)} />
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
            <span>{product.category}</span>
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
              ({product?.rating} /5) {t("Watch")} {product?.numberOfReviews}{" "}
              {t("Reviews")}
            </span>
          </div>
          <div className="product-price">
            {product?.price?.toLocaleString()} ₫
          </div>

          <div>
            <p className="product-quantity">{t("Size")}</p>
            <ToggleButtonGroup
              value={selectedSize}
              exclusive
              onChange={handleSizeChange}
              className="product-size"
            >
              <ToggleButton value="A/XS">A/XS</ToggleButton>
              <ToggleButton value="A/S">A/S</ToggleButton>
              <ToggleButton value="A/L">A/L</ToggleButton>
              <ToggleButton value="A/XL">A/XL</ToggleButton>
            </ToggleButtonGroup>
          </div>

          <div>
            <p className="product-quantity">{t("Quantity")}</p>
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
            <button onClick={handleBuyNow}>{t("Buy it now")}</button>
            <button onClick={handleAddToCart}>{t("Add to cart")}</button>
          </div>
        </div>
      </div>
      <div className="product-detail-related">
        <Brand
          textCenter="justify-content-center mt-4 mb-2"
          products={imgProduct.slice(21, 30)}
          textHeading={t("Related Items")}
        ></Brand>
      </div>
    </>
  );
};

export default ProductDetailPage;
