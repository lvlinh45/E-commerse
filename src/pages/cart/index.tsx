import BreadScrumbs from "../../components/Universal/Breadscrumb";
import CartItem from "./cartItem";

const CartPage = () => {
  return (
    <>
      <BreadScrumbs page={"Home"} destination={"Shopping Cart"}></BreadScrumbs>
      <div className="cartPage-container">
        <h1 className="cartPage-title">Shopping Cart</h1>
        <p className="cartPage-shopping">Continue shopping</p>
        <div className="cartPage-wrapper">
          <div style={{ flex: 1 }}>
            <CartItem cartTitle=""></CartItem>
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
              <div>
                <span className="cartPage-subHeading">(1) product</span>
                <span className="cartPage-total">599.000₫</span>
              </div>
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
                <span className="cartPage-subHeading"> Subtotal:</span>
                <span className="cartPage-total"> 599.000₫</span>
              </p>
              <button>CHECKOUT</button>
              <p className="cartPage-shipping">
                *Shipping fees and coupons applied at the payment page
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
