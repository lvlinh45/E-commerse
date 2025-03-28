import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { ILocation } from "../../assets/types/Location";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loadDistricts, loadProvinces, loadWards } from "../../utils";
import { Product } from "../../assets/types/Products";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("checkoutPage");
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const totalQuantity = cart.reduce(
    (total, item) => total + (item.quantity ?? 0),
    0
  );
  const [cloneCart, setCloneCart] = useState<Product[]>([]);
  useEffect(() => {
    setCloneCart(cart);
  }, [cloneCart]);

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
  }, [cart, cloneCart, navigate]);

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
        <h3>{t("Order placed successfully!")}</h3>
        <p>
          {t("Your order is being processed. Thank you for shopping with us!")}
        </p>
        <p>
          {t("Your order ID")}: <strong>HAB123456</strong>
        </p>

        <div className="order-details">
          <h4>{t("Order Details")}</h4>
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
                    ₫
                  </p>
                  <p className="product-quantity">
                    {t("Quantity")}: {item.quantity}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="order-total">
            <span>{t("Total")}</span>
            <span>
              {cloneCart
                .reduce(
                  (total, item) =>
                    total + (item.price ?? 0) * (item.quantity ?? 0),
                  0
                )
                .toLocaleString()}{" "}
              ₫
            </span>
          </div>
        </div>

        <p
          onClick={() => {
            navigate("/");
          }}
          className="order-success-link"
        >
          {t("Return to Home")}
        </p>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-left">
        <div className="checkout-heading">
          <h3 className="checkout-title">{t("Contact information")}</h3>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="checkout-input"
                placeholder={t("Email")}
                {...field}
              />
            )}
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}

          <div className="checkout-heading--notification">
            <input type="checkbox" name="notification" id="notification" />
            <label htmlFor="notification">
              {t("Email me with news and offers")}
            </label>
          </div>
        </div>

        <div className="checkout-heading">
          <h3 className="checkout-title">{t("Delivery")}</h3>
          <h4 className="checkout-subTitle">
            {t(
              "This will also be used as your billing address for this order."
            )}
          </h4>
          <div className="checkout-groupInput">
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
                    {t("Province")}
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

            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "space-between",
              }}
            >
              <div style={{ flex: "1" }}>
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
                        {t("District")}
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
              </div>

              <div style={{ flex: "1" }}>
                <Controller
                  name="village"
                  control={control}
                  render={({ field }) => (
                    <select {...field} disabled={!selectedDistrict}>
                      <option value="" disabled selected hidden>
                        {t("Village")}
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
              </div>
            </div>

            <div className="checkout-inputRow">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="checkout-input"
                    placeholder={t("First Name (optional)")}
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
                    placeholder={t("Last Name")}
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
                    placeholder={t("Address")}
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
                {t("Save this information for next time")}
              </label>
            </div>
          </div>
        </div>

        <div className="checkout-shipping">
          <h4>{t("Shipping method")}</h4>
          <p>
            <span>{t("Shipping fee")}</span>
            <span>{t("FREE")}</span>
          </p>
        </div>

        <div className="checkout-heading">
          <h3 className="checkout-title">{t("Checkout")}</h3>
          <h4 className="checkout-subTitle">
            {t(
              "Your payment method’s billing address must match the shipping address. All transactions are secure and encrypted."
            )}
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
              {t(
                "I agree with the Terms and Policies stipulated by Supersports"
              )}
            </label>
          </div>
          {errors.agreeTerms && (
            <p style={{ color: "red" }}>{errors.agreeTerms.message}</p>
          )}
        </div>
        <button className="checkout-button" onClick={handleSubmit(onSubmit)}>
          {t("Pay now")}
        </button>
      </div>

      <div className="checkout-right">
        {cart.map((item) => (
          <div className="checkout-product" key={item.id}>
            <div className="d-flex" style={{ gap: "18px" }}>
              <div className="checkout-wrapperImg">
                <img src={item.imageUrl} alt={item.name} />
                <p>{totalQuantity}</p>
              </div>
              <div>
                <h4>{item.name}</h4>
                <h5>Size {item?.size || "L"}</h5>
              </div>
            </div>
            <div className="checkout-total">
              {((item.price ?? 0) * (item.quantity ?? 0)).toLocaleString()} ₫
            </div>
          </div>
        ))}

        <div className="checkout-discount">
          <input
            type="text"
            className="checkout-input"
            style={{ marginBottom: 0 }}
            placeholder={t("Discount code or gift card")}
          />
          <button className="checkout-discount--apply">{t("Apply")}</button>
        </div>

        <div className="checkout-information">
          <div>
            <span>
              {t("Subtotal")} · {totalQuantity} mặt hàng
            </span>
            <span>{subtotal.toLocaleString()} ₫</span>
          </div>
          <div>
            <span>{t("Shipping costs")}</span>
            <span>{t("FREE")}</span>
          </div>
          <div className="checkout-totalCost">
            <span>{t("Total")}</span>
            <span>{subtotal.toLocaleString()} ₫</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
