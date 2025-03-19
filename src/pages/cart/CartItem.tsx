import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  vendor: string;
}

const CartItem = ({ cartTitle = "Shopping Cart" }: { cartTitle?: string }) => {
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

  if (cartItems.length === 0) {
    return (
      <Box className="cart-drawer">
        <div className="cart-header">
          <h2>{cartTitle}</h2>
        </div>
        <div className="empty-cart-message">
          <p>Your cart is currently empty.</p>
        </div>
      </Box>
    );
  }

  return (
    <Box className="cart-drawer">
      <div className="cart-header">
        <h2>{cartTitle}</h2>
      </div>
      <div className="cart-container">
        <List className="cart-top">
          {cartItems.map((item) => (
            <ListItem className="cart-item cartPage-item ">
              <div className="cart-imgWrapper">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-wrapper cartPage-item-wrapper">
                <div className="cart-item-info">
                  <div className="item-vendor">{item.vendor}</div>
                  <div className="item-name">{item.name}</div>
                </div>
                <div className="d-flex item-custom">
                  <div className="item-price">
                    {item.price.toLocaleString()}đ
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
              </div>
            </ListItem>
          ))}
        </List>
        <div className="cart-bottom">
          <div className="card-subtotal">
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()}đ</span>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default CartItem;
