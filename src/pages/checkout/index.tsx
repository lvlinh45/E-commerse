import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { ILocation } from "../../assets/types/Location";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loadDistricts, loadProvinces, loadWards } from "../../utils";
import { Product } from "../../assets/types/Products";
import { useNavigate } from "react-router-dom";

// Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: yup.string().optional(),
  lastName: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  province: yup.string().required("Province is required"),
  district: yup.string().required("District is required"),
  village: yup.string().required("Village is required"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and policies"),
});

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [cloneCart, setCloneCart] = useState<Product[]>([]);
  useEffect(() => {
    setCloneCart(cart);
    console.log("TCL: CheckoutPage -> cloneCart", cloneCart);
  }, [cart, cloneCart]);
  const subtotal = cart.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
  useEffect(() => {
    if (
      (!cloneCart && !cart) ||
      (cart.length === 0 && cloneCart.length === 0)
    ) {
      navigate("/");
    }
  }, [cart, navigate]);
  const [provinces, setProvinces] = useState<ILocation[]>([]);
  const [districts, setDistricts] = useState<ILocation[]>([]);
  const [villages, setVillages] = useState<ILocation[]>([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [orderSuccess, setOrderSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      agreeTerms: true,
    },
  });

  const handleProvinceChange = (provinceCode: string) => {
    setSelectedProvince(provinceCode);
    setDistricts([]);
    setVillages([]);
    loadDistricts(provinceCode)("").then((data) => setDistricts(data));
  };

  const handleDistrictChange = (districtCode: string) => {
    setSelectedDistrict(districtCode);
    setVillages([]);
    loadWards(districtCode)("").then((data) => {
      setVillages(data);
    });
  };

  useEffect(() => {
    loadProvinces("").then((data) => setProvinces(data));
  }, []);

  const onSubmit = (data: { email: string }) => {
    console.log(data);
    setOrderSuccess(true);
    clearCart();
  };

  if (orderSuccess) {
    return (
      <div className="order-success-container">
        <h3>Order placed successfully!</h3>
        <p>Your order is being processed. Thank you for shopping with us!</p>
        <p>
          Your order ID: <strong>HAB123456</strong>
        </p>

        <div className="order-details">
          <h4>Order Details</h4>
          <div className="order-products">
            {cloneCart.map((item) => (
              <div className="order-product" key={item.id}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="product-image"
                />
                <div className="product-info">
                  <p className="product-name">{item.name}</p>
                  <p className="product-price">
                    {(
                      (item.price ?? 0) * (item.quantity ?? 0)
                    ).toLocaleString()}{" "}
                    VNĐ
                  </p>
                  <p className="product-quantity">Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>Total</span>
            <span>
              {cloneCart
                .reduce(
                  (total, item) =>
                    total + (item.price ?? 0) * (item.quantity ?? 0),
                  0
                )
                .toLocaleString()}
              VNĐ
            </span>
          </div>
        </div>

        <a href="/" className="order-success-link">
          Return to Home
        </a>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        {/* Contact Information Section */}
        <div className="checkout-heading">
          <h3 className="checkout-title">Contact information</h3>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="checkout-input"
                placeholder="Email"
                {...field}
              />
            )}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

          <div className="checkout-heading--notification">
            <input type="checkbox" name="notification" id="notification" />
            <label htmlFor="notification">Email me with news and offers</label>
          </div>
        </div>

        {/* Delivery Information Section */}
        <div className="checkout-heading">
          <h3 className="checkout-title">Delivery</h3>
          <h4 className="checkout-subTitle">
            This will also be used as your billing address for this order.
          </h4>
          <div className="checkout-groupInput">
            {/* Province Dropdown */}
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    handleProvinceChange(e.target.value);
                    field.onChange(e);
                  }}
                >
                  <option value="" disabled selected hidden>
                    Province
                  </option>
                  {provinces.map((province) => (
                    <option key={province.value} value={province.value}>
                      {province.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.province && (
              <p style={{ color: "red" }}>{errors.province.message}</p>
            )}

            {/* District Dropdown */}
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  onChange={(e) => {
                    handleDistrictChange(e.target.value);
                    field.onChange(e);
                  }}
                  disabled={!selectedProvince}
                >
                  <option value="" disabled selected hidden>
                    District
                  </option>
                  {districts.map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.district && (
              <p style={{ color: "red" }}>{errors.district.message}</p>
            )}

            {/* Village Dropdown */}
            <Controller
              name="village"
              control={control}
              render={({ field }) => (
                <select {...field} disabled={!selectedDistrict}>
                  <option value="" disabled selected hidden>
                    Village
                  </option>
                  {villages.map((village) => (
                    <option key={village.value} value={village.value}>
                      {village.label}
                    </option>
                  ))}
                </select>
              )}
            />
            {errors.village && (
              <p style={{ color: "red" }}>{errors.village.message}</p>
            )}

            {/* Additional Input Fields */}
            <div className="checkout-inputRow">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="First Name (optional)"
                    {...field}
                  />
                )}
              />
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="Last Name"
                    {...field}
                  />
                )}
              />
            </div>
            {errors.lastName && (
              <p style={{ color: "red" }}>{errors.lastName.message}</p>
            )}

            <div>
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder="Address"
                    {...field}
                  />
                )}
              />
              {errors.address && (
                <p style={{ color: "red" }}>{errors.address.message}</p>
              )}
            </div>
            <div className="checkout-heading--notification">
              <input
                type="checkbox"
                name="save-notification"
                id="save-notification"
              />
              <label htmlFor="save-notification">
                Save this information for next time
              </label>
            </div>
          </div>
        </div>

        {/* Shipping Section */}
        <div className="checkout-shipping">
          <h4>Shipping method</h4>
          <p>
            <span>Shipping fee</span>
            <span>FREE</span>
          </p>
        </div>

        {/* Terms & Checkout Section */}
        <div className="checkout-heading">
          <h3 className="checkout-title">Checkout</h3>
          <h4 className="checkout-subTitle">
            Your payment method’s billing address must match the shipping
            address. All transactions are secure and encrypted.
          </h4>
          <div className="checkout-heading--notification">
            <Controller
              name="agreeTerms"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  {...field}
                  checked={field.value}
                  value={undefined}
                />
              )}
            />
            <label htmlFor="agreeTerms">
              I agree with the Terms and Policies stipulated by Supersports
            </label>
          </div>
          {errors.agreeTerms && (
            <p style={{ color: "red" }}>{errors.agreeTerms.message}</p>
          )}
        </div>
        <button className="checkout-button" onClick={handleSubmit(onSubmit)}>
          Pay now
        </button>
      </div>

      {/* Checkout Right Section - Showing Cart Items */}
      <div className="checkout-right">
        {cart.map((item) => (
          <div className="checkout-product" key={item.id}>
            <div className="d-flex" style={{ gap: "10px" }}>
              <img src={item.imageUrl} alt={item.name} width={64} height={64} />
              <div>
                <h4>{item.name}</h4>
                <h5>{item?.size || "L"}</h5>
              </div>
            </div>
            <div className="checkout-total">
              {((item.price ?? 0) * (item.quantity ?? 0)).toLocaleString()} VNĐ
            </div>
          </div>
        ))}

        {/* Discount Code Section */}
        <div className="checkout-discount">
          <input
            type="text"
            className="checkout-input"
            style={{ marginBottom: 0 }}
            placeholder="Discount code or gift card"
          />
          <button className="checkout-discount--apply">Apply</button>
        </div>

        {/* Total Information Section */}
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
