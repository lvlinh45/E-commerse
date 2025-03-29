import { useNavigate } from "react-router-dom";
import { IconNotRatingStar, IconStar } from "../../assets/icons/Icons";
import { Product } from "../../assets/types/Products";
import { useTranslation } from "react-i18next";

const BrandItem = ({
  id,
  name,
  price,
  imageUrl,
  discount = 0,
  numberOfReviews,
  rating = 0,
  status,
  vendor,
}: Product) => {
  const finalPrice =
    discount > 0 ? (price ?? 0) * (1 - discount / 100) : price ?? 0;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="brand-item" onClick={() => navigate(`/products/${id}`)}>
      <div style={{ position: "relative" }}>
        <img
          src="https://cdn.shopify.com/s/files/1/0456/5070/6581/files/1741510674992-138236095-frame_EN.png?v=1741510724"
          alt=""
          className="brandItem-frame"
        />
        <img className="brandItem-imgPrimary" src={imageUrl} alt={name} />
        {(status === "new" || discount !== 0) && (
          <div
            className={`brandItem-status ${
              status === "new"
                ? "brandItem-status"
                : "brandItem-status-discount"
            }`}
          >
            {status === "new" && t("NEW")}
            {status !== "new" && <>-{discount}%</>}
          </div>
        )}
      </div>
      <div className="brandItem-wrapper">
        <div className="brandItem-text">
          {vendor && <p className="mb-2 mt-4 brandItem-vendor">{vendor}</p>}
          <h3 className={`brandItem-heading ${!vendor && "mt-4"}`}>{name}</h3>
        </div>
        <div
          className={`brandItem-review ${
            rating > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="icon-star">
            {Array.from({ length: 5 }, (_, index) =>
              index < rating ? (
                <IconStar key={index} />
              ) : (
                <IconNotRatingStar key={index} />
              )
            )}
          </div>
          <div className="brand-reviews">
            {numberOfReviews} {t("reviews")}
          </div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {discount > 0 && (
            <>
              <span className="brandItem-original-price">
                {finalPrice?.toLocaleString("de-DE")}đ
              </span>
              <span className="brandItem-discount">
                {price?.toLocaleString("de-DE")}đ
              </span>
            </>
          )}
        </div>

        {discount === 0 && (
          <span className="brandItem-original">
            {price?.toLocaleString("de-DE")}đ
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandItem;
