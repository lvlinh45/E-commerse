import { useCart } from "../../context/CartContext";

const CheckoutPage = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <div>
          <div className="checkout-heading">
            <h3 className="checkout-title">Contact information</h3>
            <input type="text" className="checkout-input" placeholder="Email" />
            <div className="checkout-heading--notification">
              <input type="checkbox" name="" id="notification" />
              <label htmlFor="notification">
                Email me with news and offers
              </label>
            </div>
          </div>

          <div className="checkout-heading">
            <h3 className="checkout-title">Delivery</h3>
            <h4 className="checkout-subTitle">
              This will also be used as your billing address for this order.
            </h4>
            <div className="checkout-groupInput">
              <select>
                <option value="">VN</option>
                <option value="">VN</option>
                <option value="">VN</option>
              </select>
              <div className="checkout-inputRow">
                <select>
                  <option value="">VN</option>
                  <option value="">VN</option>
                  <option value="">VN</option>
                </select>
                <select>
                  <option value="">VN</option>
                  <option value="">VN</option>
                  <option value="">VN</option>
                </select>
              </div>
              <div className="checkout-inputRow">
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="First Name (optional)"
                />
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="Last Name"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="Address"
                />
              </div>
              <div className="checkout-inputRow">
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="First Name (optional)"
                />
                <input
                  type="text"
                  className="checkout-input"
                  placeholder="Last Name"
                />
              </div>
              <div className="checkout-heading--notification">
                <input type="checkbox" name="" id="save-notification" />
                <label htmlFor="save-notification">
                  Save this information for next time
                </label>
              </div>
            </div>
          </div>
          <div className="checkout-shipping">
            <h4>Shipping method</h4>
            <p>
              <span>Shipping fee</span>
              <span>FREE</span>
            </p>
          </div>
          <div className="checkout-heading">
            <h3 className="checkout-title">Checkout</h3>
            <h4 className="checkout-subTitle">
              Your payment method’s billing address must match the shipping
              address. All transactions are secure and encrypted.
            </h4>
            <div className="checkout-heading--notification">
              <input type="checkbox" name="" id="term" />
              <label htmlFor="term">
                I agree with the Terms and Policies stipulated by Supersports
              </label>
            </div>
          </div>
        </div>
        <button className="checkout-button">Pay now</button>
      </div>

      {/* Checkout Right Section - Showing Cart Items */}
      <div className="checkout-right">
        {cart.map((item) => (
          <div className="checkout-product">
            <div key={item.id} className="d-flex" style={{ gap: "10px" }}>
              <img src={item.imageUrl} alt={item.name} width={64} height={64} />
              <div>
                <h4>{item.name}</h4>
                <h5>{item?.size || "L"}</h5> {/* Assuming you have size data */}
              </div>
            </div>

            <div className="checkout-total">
              {((item.price ?? 0) * (item.quantity ?? 0)).toLocaleString()}
              VNĐ
            </div>
          </div>
        ))}

        <div className="checkout-discount">
          <input
            type="text"
            className="checkout-input"
            style={{ marginBottom: 0 }}
            placeholder="Discount code or gift card"
          />
          <button className="checkout-discount--apply">Apply</button>
        </div>

        <div className="checkout-information">
          <div>
            <span>Subtotal</span>
            <span>{subtotal.toLocaleString()} VNĐ</span>
          </div>
          <div>
            <span>Shipping costs</span>
            <span>Free</span>
          </div>
          <div className="checkout-totalCost">
            <span>Total</span>
            <span>VND {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
