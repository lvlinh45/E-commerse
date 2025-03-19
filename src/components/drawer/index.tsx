import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { CSSTransition } from "react-transition-group";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

interface DrawerProps {
  open: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ open, onClose }) => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = React.useState<CartItem[]>([
    {
      id: 1,
      name: "Men's Under Armour Sportstyle Nylon Cap - Orange",
      price: 899000,
      quantity: 1,
      image:
        "//cdn.shopify.com/s/files/1/0456/5070/6581/files/ly_8-00336315946-1_1704438036.jpg?v=1704275084&width=1000",
      vendor: "UNDER AMOUR",
    },
    {
      id: 2,
      name: "Kids' Speedo Biofuse 2.0 Goggle - Blue",
      price: 599000,
      quantity: 1,
      image:
        "//cdn.shopify.com/s/files/1/0456/5070/6581/files/ly_8-00336315946-1_1704438036.jpg?v=1704275084&width=1000",
      vendor: "UNDER AMOUR",
    },
  ]);

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + change } : item
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const list = () => {
    if (cartItems.length === 0) {
      return (
        <Box className="cart-drawer">
          <div className="cart-header">
            <h2>Shopping Cart</h2>
            <button className="cart-icon" onClick={onClose}>
              x
            </button>
          </div>
          <div className="empty-cart-message">
            <p>Your cart is currently empty.</p>
          </div>
          <div className="hotline">HOTLINE: 1900 63 64 01</div>
        </Box>
      );
    }

    return (
      <Box className="cart-drawer">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="cart-icon" onClick={onClose}>
            x
          </button>
        </div>
        <div className="cart-container">
          <List className="cart-top">
            {cartItems.map((item) => (
              <CSSTransition
                key={item.id}
                timeout={300}
                classNames="cart-item-fade"
              >
                <ListItem className="cart-item">
                  <div className="cart-imgWrapper">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-item-wrapper">
                    <div className="cart-item-info">
                      <div className="item-vendor">{item.vendor}</div>
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">
                        {item.price.toLocaleString()}đ
                      </div>
                    </div>
                    <div>
                      <div className="cart-actions">
                        <div className="cart-calculate">
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <span>{item.quantity}</span>
                          <IconButton
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <AddIcon />
                          </IconButton>
                        </div>
                        <button
                          className="remove-button"
                          onClick={() => handleRemoveItem(item.id)}
                          color="error"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </ListItem>
              </CSSTransition>
            ))}
          </List>
          <div className="cart-bottom">
            <div className="card-subtotal">
              <span>Subtotal</span>
              <span>{subtotal.toLocaleString()}đ</span>
            </div>
            <div>
              <Button variant="contained" className="checkout-button" fullWidth>
                Checkout
              </Button>
              <Button
                variant="contained"
                className="shoppingCart-button"
                fullWidth
                onClick={() => navigate("/cart")}
              >
                Shopping Cart
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

export default Drawer;
