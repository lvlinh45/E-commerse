import { useState, useEffect, useCallback } from "react";
import { useCart } from "../../context/CartContext";
import { ILocation } from "../../assets/types/Location";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loadDistricts, loadProvinces, loadWards } from "../../shared/utils";
import { Product } from "../../assets/types/Products";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { IDiscountCode } from "../../assets/types/Discount";

const schema = yup.object().shape({
  email: yup.string().email("invalid_email").required("email_required"),
  firstName: yup.string().optional(),
  lastName: yup.string().required("last_name_required"),
  address: yup.string().required("address_required"),
  province: yup.string().required("province_required"),
  district: yup.string().required("district_required"),
  village: yup.string().required("village_required"),
  agreeTerms: yup.boolean().oneOf([true], "agree_terms_required"),
});

const CheckoutPage = () => {
  const { t } = useTranslation("checkoutPage");
  const savedVouchers = JSON.parse(localStorage.getItem("vouchers") || "");

  const navigate = useNavigate();
  const { cart, clearCart, calculateTotal } = useCart();
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

  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [ship, setShip] = useState<number>(0);

  const [discountInput, setDiscountInput] = useState<string>("");
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [discountError, setDiscountError] = useState<string>("");

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

  const onSubmit = () => {
    setOrderSuccess(true);
    clearCart();
  };

  const handleShip = useCallback(() => {
    if (calculateTotal(cart) < 300000) {
      return setShip(30000);
    }
    return setShip(0);
  }, [cloneCart, calculateTotal]);
  useEffect(() => {
    loadProvinces("").then((data) => setProvinces(data));
    handleShip();
  }, [handleShip]);

  const handleApplyDiscount = () => {
    const code = discountInput.trim().toUpperCase();
    const foundDiscount = savedVouchers.find(
      (dc: IDiscountCode) => dc.code === code
    );
    if (!foundDiscount) {
      setDiscountError(t("Invalid discount code"));
      setAppliedDiscount(0);
      return;
    }
    const currentDate = new Date();
    const expiryDate = new Date(foundDiscount.expiry);
    if (currentDate > expiryDate) {
      setDiscountError(t("Discount code expired"));
      setAppliedDiscount(0);
      return;
    }
    if (calculateTotal(cart) < Number(foundDiscount.minOrder)) {
      setDiscountError(
        t("Order must be at least ") +
          foundDiscount.minOrder.toLocaleString("de-DE") +
          t(" ₫ to use this discount code")
      );
      setAppliedDiscount(0);
      return;
    }
    setDiscountError("");
    setAppliedDiscount(Number(foundDiscount.discountAmount));
    setDiscountInput("");
  };

  if (orderSuccess) {
    return (
      <div className="order-success-container">
        <h3>{t("Order placed successfully!")}</h3>
        <p>
          {t("Your order is being processed. Thank you for shopping with us!")}
        </p>
        <p>
          {t("Your order ID")}:{" "}
          <strong>MVĐ{Math.floor(100000 + Math.random() * 900000)}</strong>
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
                    {(item.discount ?? 0) > 0 && (
                      <>
                        <span className="product-price-final">
                          {((item.discount ?? 0) > 0
                            ? (item.price ?? 0) *
                              (1 - (item.discount ?? 0) / 100)
                            : item?.price ?? 0
                          ).toLocaleString("de-DE")}
                          đ
                        </span>
                      </>
                    )}
                    {item.discount === 0 && (
                      <span className="product-price-noDiscount">
                        {(item?.price ?? 0).toLocaleString("de-DE")}đ
                      </span>
                    )}
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
              {Math.max(
                0,
                calculateTotal(cloneCart) + ship - appliedDiscount
              ).toLocaleString("de-DE")}{" "}
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
            <p className="checkout-error-yup">
              {t(errors.email.message || "unknown_error")}
            </p>
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
              <p className="checkout-error-yup">
                {t(errors.province.message || "unknown_error")}
              </p>
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
                  <p className="checkout-error-yup">
                    {t(errors.district.message || "unknown_error")}
                  </p>
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
                  <p className="checkout-error-yup">
                    {t(errors.village.message || "unknown_error")}
                  </p>
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
              <p className="checkout-error-yup">
                {t(errors.lastName.message || "unknown_error")}
              </p>
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
                <p className="checkout-error-yup">
                  {t(errors.address.message || "unknown_error")}
                </p>
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
            <span>
              {ship !== 0 ? (
                <span style={{ fontWeight: 600 }}>
                  {ship.toLocaleString("de-DE")} ₫
                </span>
              ) : (
                <span style={{ fontWeight: 600 }}>{t("FREE")}</span>
              )}
            </span>
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
            <p className="checkout-error-yup" style={{ marginTop: "8px" }}>
              {t(errors.agreeTerms.message || "unknown_error")}
            </p>
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
                <p>{item.quantity}</p>
              </div>
              <div>
                <h4>{item.name}</h4>
                <h5>Size {item?.size || "L"}</h5>
              </div>
            </div>
            <div className="checkout-total" style={{ fontWeight: 500 }}>
              {(item.discount ?? 0) > 0 && (
                <div className="d-flex flex-column">
                  <span style={{ color: "#FF0000", fontWeight: 600 }}>
                    {((item.discount ?? 0) > 0
                      ? (item.price ?? 0) * (1 - (item.discount ?? 0) / 100)
                      : item?.price ?? 0
                    ).toLocaleString("de-DE")}
                    đ
                  </span>
                  <span className="item-price-discount">
                    {(item?.price ?? 0).toLocaleString("de-DE")}đ
                  </span>
                </div>
              )}
              {item.discount === 0 && (
                <span style={{ fontWeight: 600 }}>
                  {(item?.price ?? 0).toLocaleString("de-DE")}đ
                </span>
              )}
            </div>
          </div>
        ))}

        <div className="checkout-discount-wrapper">
          <div className="checkout-discount">
            <input
              type="text"
              className="checkout-input"
              style={{ marginBottom: 0 }}
              placeholder={t("Discount code or gift card")}
              value={discountInput}
              onChange={(e) => {
                setDiscountInput(e.target.value);
                if (e.target.value.trim() === "") {
                  setDiscountError("");
                }
              }}
            />
            <button
              className="checkout-discount--apply"
              onClick={() => {
                if (discountInput.trim() !== "") {
                  handleApplyDiscount();
                }
              }}
              style={{
                opacity: discountInput.trim() === "" ? 0.6 : 1,
                cursor: discountInput.trim() === "" ? "not-allowed" : "pointer",
              }}
            >
              {t("Apply")}
            </button>
          </div>
          {discountError && (
            <p className="discountCode-error" style={{}}>
              {discountError}
            </p>
          )}
        </div>

        <div className="checkout-information">
          <div>
            <span>
              {t("Subtotal")} · {totalQuantity} {t("commodity")}
            </span>
            <span style={{ fontWeight: 600 }}>
              {subtotal.toLocaleString("de-DE")} ₫
            </span>
          </div>
          {Number(subtotal) - Number(calculateTotal(cart)) === 0 ? (
            ""
          ) : (
            <div>
              <span>{t("Total amount with discount")}</span>
              <span style={{ color: "red", fontWeight: 600 }}>
                -{" "}
                {(
                  Number(subtotal) - Number(calculateTotal(cart))
                ).toLocaleString("de-DE")}{" "}
                ₫
              </span>
            </div>
          )}
          {Number(appliedDiscount) > 0 && (
            <div>
              <span>{t("Voucher")}</span>
              <span style={{ color: "red", fontWeight: 600 }}>
                - {Number(appliedDiscount).toLocaleString("de-DE")} ₫
              </span>
            </div>
          )}
          <div>
            <span>{t("Shipping costs")}</span>
            {ship !== 0 ? (
              <span style={{ fontWeight: 600 }}>
                {ship.toLocaleString("de-DE")} ₫
              </span>
            ) : (
              <span style={{ fontWeight: 600 }}>{t("FREE")}</span>
            )}
          </div>
          <div className="checkout-totalCost">
            <span>{t("Total")}</span>
            <span>
              {Math.max(
                0,
                calculateTotal(cart) + ship - appliedDiscount
              ).toLocaleString("de-DE")}{" "}
              ₫
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
