import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";

const DrawerSiderBar: React.FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, calculateTotal } = useCart();
  const { t } = useTranslation("cartPage");

  const handleQuantityChange = (id: number, change: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      const updatedQuantity = (item.quantity ?? 0) + change;
      if (updatedQuantity >= 1) {
        addToCart(item, updatedQuantity);
      }
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  const list = () => {
    if (cart.length === 0) {
      return (
        <Box className="cart-drawer">
          <div className="cart-header">
            <h2>{t("Shopping_Cart")}</h2>
            <button className="cart-icon" onClick={onClose}>
              x
            </button>
          </div>
          <div className="empty-cart-message">
            <p>{t("empty")}</p>
          </div>
          <div className="hotline">HOTLINE: 1900 63 64 01</div>
        </Box>
      );
    }

    return (
      <Box className="cart-drawer">
        <div className="cart-header">
          <h2>{t("Shopping_Cart")}</h2>
          <button className="cart-icon" onClick={onClose}>
            x
          </button>
        </div>
        <div className="cart-container">
          <List className="cart-top">
            {cart.map((item) => (
              <ListItem key={item.id} className="cart-item">
                <div
                  className="cart-imgWrapper"
                  onClick={() => navigate(`/products/${item.id}`)}
                >
                  <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="cart-item-wrapper">
                  <div className="cart-item-info">
                    <div className="item-vendor">{item.vendor}</div>
                    <div
                      className="item-name"
                      onClick={() => navigate(`/products/${item.id}`)}
                    >
                      {item.name}
                    </div>
                    <div className="item-price d-flex align-items-center gap-2 product-price">
                      {(item.discount ?? 0) > 0 && (
                        <>
                          <span>
                            {((item.discount ?? 0) > 0
                              ? (item.price ?? 0) *
                                (1 - (item.discount ?? 0) / 100)
                              : item?.price ?? 0
                            ).toLocaleString("de-DE")}
                            đ
                          </span>
                          <span className="item-price-discount">
                            {(item?.price ?? 0).toLocaleString("de-DE")}đ
                          </span>
                        </>
                      )}
                      {item.discount === 0 && (
                        <span>
                          {(item?.price ?? 0).toLocaleString("de-DE")}đ
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="cart-actions">
                      <div className="cart-calculate">
                        <IconButton
                          onClick={() => handleQuantityChange(item.id ?? 0, -1)}
                          disabled={(item.quantity ?? 0) <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <span>{item.quantity}</span>
                        <IconButton
                          onClick={() => handleQuantityChange(item.id ?? 0, 1)}
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                      <button
                        className="remove-button"
                        onClick={() => handleRemoveItem(item.id ?? 0)}
                        color="error"
                      >
                        {t("Remove")}
                      </button>
                    </div>
                  </div>
                </div>
              </ListItem>
            ))}
          </List>
          <div className="cart-bottom">
            <div className="card-subtotal">
              <span>{t("Subtotal")}</span>
              <span>{calculateTotal(cart).toLocaleString("de-DE")}đ</span>
            </div>
            <div>
              <Button
                variant="contained"
                className="checkout-button"
                fullWidth
                onClick={() => navigate("/checkout")}
              >
                {t("checkout")}
              </Button>
              <Button
                variant="contained"
                className="shoppingCart-button"
                fullWidth
                onClick={() => navigate("/cart")}
              >
                {t("Shopping_Cart")}
              </Button>
            </div>
          </div>
        </div>
        <div className="hotline">HOTLINE: 1900 63 64 01</div>
      </Box>
    );
  };

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
    >
      {list()}
    </SwipeableDrawer>
  );
};

export default DrawerSiderBar;
