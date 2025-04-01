import Breadcrumb from "../../components/Universal/Breadscrumb";
import CartItem from "./CartItem";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CartPage = () => {
  const { cart, calculateTotal } = useCart();
  const navigate = useNavigate();
  const { t } = useTranslation("cartPage");

  return (
    <>
      <Breadcrumb page={"Home"} destination={"Shopping Cart"} />
      {cart.length === 0 && (
        <>
          <div className="cartPage-emptyWrapper">
            <p className="cartPage-empty">{t("empty")}</p>
            <p
              className="cartPage-shopping"
              onClick={() => navigate("/collection/all")}
            >
              {t("Continue_shopping")}
            </p>
          </div>
        </>
      )}
      {cart.length !== 0 && (
        <div className="cartPage-container">
          <h1 className="cartPage-title"> {t("Shopping_Cart")}</h1>
          <p
            className="cartPage-shopping"
            onClick={() => navigate("/collection/all")}
          >
            {t("Continue_shopping")}
          </p>
          <div className="cartPage-wrapper">
            <div style={{ flex: 1 }}>
              <CartItem />
            </div>
            <div className="cart-checkout">
              <div className="cartPage-heading">
                <p>
                  <span className="cartPage-signUp">{t("SIGN UP NOW")}</span>{" "}
                  <span>|</span> {t("GET 150,000 VND")}
                </p>
                <p>
                  {t("VOUCHER NOW")} <span> {t("FOR YOUR FIRST ORDER")}</span>
                </p>
              </div>
              <div className="cartPage-information">
                <div>
                  <span className="cartPage-subHeading">
                    ({cart.length}) {t("product")}
                  </span>
                  <span className="cartPage-total">
                    {calculateTotal(cart).toLocaleString("de-DE")}₫
                  </span>
                </div>

                <div>
                  <span className="cartPage-subHeading">{t("Discount")}</span>
                  <span className="cartPage-span">
                    {t("Applied at checkout")}
                  </span>
                </div>
                <p>
                  <span className="cartPage-subHeading">
                    {t("Shipping_Fee")}
                  </span>
                  <span className="cartPage-span">
                    {t("Applied at the payment page")}
                  </span>
                </p>

                <p>
                  <span className="cartPage-subHeading">{t("Subtotal")}:</span>
                  <span className="cartPage-total">
                    {calculateTotal(cart).toLocaleString("de-DE")}₫
                  </span>
                </p>
                <button onClick={() => navigate("/checkout")}>
                  {t("checkout")}
                </button>
                <p className="cartPage-shipping">
                  {t("*Shipping fees and coupons applied at the payment page")}
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
