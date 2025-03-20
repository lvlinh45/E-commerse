import BreadScrumbs from "../../components/Universal/Breadscrumb";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext"; // Import useCart hook
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (total, item) => total + (item?.price ?? 0) * (item.quantity ?? 0),
    0
  );

  return (
    <>
      <BreadScrumbs
        page={"Home"}
        destination={"Shopping Cart"}
        navigateSubPage="/"
      />
      {cart.length === 0 && (
        <>
          <div className="cartPage-emptyWrapper">
            <p className="cartPage-empty">Your cart is empty!</p>
            <p
              className="cartPage-shopping"
              onClick={() => navigate("/collection/all")}
            >
              Continue shopping
            </p>
          </div>
        </>
      )}
      {cart.length !== 0 && (
        <div className="cartPage-container">
          <h1 className="cartPage-title">Shopping Cart</h1>
          <p
            className="cartPage-shopping"
            onClick={() => navigate("/collection/all")}
          >
            Continue shopping
          </p>
          <div className="cartPage-wrapper">
            <div style={{ flex: 1 }}>
              <CartItem />
            </div>
            <div className="cart-checkout">
              <div className="cartPage-heading">
                <p>
                  <span className="cartPage-signUp">SIGN UP NOW </span>{" "}
                  <span>|</span> GET 150,000 VND
                </p>
                <p>
                  VOUCHER NOW <span>FOR YOUR FIRST ORDER</span>
                </p>
              </div>
              <div className="cartPage-information">
                {/* Display number of products in the cart */}
                <div>
                  <span className="cartPage-subHeading">
                    ({cart.length}) product{cart.length > 1 ? "s" : ""}
                  </span>
                  <span className="cartPage-total">
                    {subtotal.toLocaleString()}₫
                  </span>
                </div>

                {/* Display discount and shipping fee */}
                <div>
                  <span className="cartPage-subHeading">Discount</span>
                  <span className="cartPage-span">Applied at checkout</span>
                </div>
                <p>
                  <span className="cartPage-subHeading">Shipping Fee</span>
                  <span className="cartPage-span">
                    Applied at the payment page
                  </span>
                </p>

                <p>
                  <span className="cartPage-subHeading">Subtotal:</span>
                  <span className="cartPage-total">
                    {subtotal.toLocaleString()}₫
                  </span>
                </p>
                <button onClick={() => navigate("/checkout")}>CHECKOUT</button>
                <p className="cartPage-shipping">
                  *Shipping fees and coupons applied at the payment page
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
