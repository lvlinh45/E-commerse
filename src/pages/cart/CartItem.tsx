import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useCart } from "../../context/CartContext";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const { cart, addToCart, removeFromCart } = useCart();
  const { t } = useTranslation("cartPage");
  const navigate = useNavigate();
  const handleQuantityChange = (id: number, change: number) => {
    const item = cart.find((item) => item.id === id);
    if (item) {
      addToCart(
        {
          ...item,
          quantity: (item.quantity ?? 0) + change,
        },
        (item.quantity ?? 0) + change
      );
    }
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  if (cart.length === 0) {
    return (
      <Box className="cart-drawer">
        <div className="cart-header"></div>
        <div className="empty-cart-message">
          <p> {t("empty")}</p>
        </div>
      </Box>
    );
  }

  return (
    <Box className="cart-drawer">
      <div className="cart-container">
        <List className="cart-top">
          {cart.map((item) => (
            <ListItem key={item.id} className="cart-item cartPage-item">
              <div
                className="cart-imgWrapper"
                onClick={() => navigate(`/products/${item.id}`)}
              >
                <img
                  src={
                    Array.isArray(item.imageUrl)
                      ? item.imageUrl[0]
                      : item.imageUrl
                  }
                  alt={item.name}
                />
              </div>
              <div className="cart-item-wrapper cartPage-item-wrapper">
                <div className="cart-item-info">
                  <div className="item-vendor">{item.brand}</div>
                  <div
                    className="item-name"
                    onClick={() => navigate(`/products/${item.id}`)}
                  >
                    {item.name}
                  </div>
                </div>
                <div className="d-flex item-custom" style={{ lineHeight: 1 }}>
                  <div className="item-price">
                    {(item.discount ?? 0) > 0 && (
                      <div className="d-flex flex-column">
                        <span style={{ marginBottom: "10px" }}>
                          {((item.discount ?? 0) > 0
                            ? (item.price ?? 0) *
                              (1 - (item.discount ?? 0) / 100)
                            : item?.price ?? 0
                          ).toLocaleString("de-DE")}
                          đ
                        </span>
                        <span
                          style={{ marginBottom: "10px" }}
                          className="item-price-discount"
                        >
                          {(item?.price ?? 0).toLocaleString("de-DE")}đ
                        </span>
                      </div>
                    )}
                    {item.discount === 0 && (
                      <span>{(item?.price ?? 0).toLocaleString("de-DE")}đ</span>
                    )}
                  </div>
                  <div className="item-subCustomWrapper">
                    <div className="cart-actions">
                      <div className="cart-calculate">
                        <IconButton
                          onClick={() =>
                            item.id !== undefined &&
                            handleQuantityChange(item.id, -1)
                          }
                          disabled={(item.quantity ?? 0) <= 1}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <span>{item.quantity}</span>
                        <IconButton
                          onClick={() =>
                            item.id !== undefined &&
                            handleQuantityChange(item.id, 1)
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div className="cartItem-utils">
                      <p className="cartItem-total">
                        {(
                          (item?.price ?? 0) * (item?.quantity ?? 0)
                        ).toLocaleString("de-DE")}
                        đ
                      </p>
                      <button
                        className="remove-button"
                        onClick={() =>
                          item.id !== undefined && handleRemoveItem(item.id)
                        }
                      >
                        {t("Remove")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </ListItem>
          ))}
        </List>
      </div>
    </Box>
  );
};

export default CartItem;
