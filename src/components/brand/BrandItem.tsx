import { IconNotRatingStar, IconStar } from "../../icons/Icons";
import { Product } from "../../types/Products";

const BrandItem = ({
  name,
  price,
  imageUrl,
  discount = 0,
  numberOfReviews,
  rating = 0,
  status,
}: Product) => {
  const finalPrice =
    discount > 0 ? (price ?? 0) * (1 - discount / 100) : price ?? 0;

  return (
    <div className="brand-item">
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
            {status === "new" && status}
            {status !== "new" && <>-{discount}%</>}
          </div>
        )}
      </div>
      <div className="brandItem-wrapper">
        <h3 className="brandItem-heading mt-4">{name}</h3>
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
          <div className="brand-reviews">{numberOfReviews} reviews</div>
        </div>

        <div className="d-flex align-items-center gap-2">
          {discount > 0 && (
            <span className="brandItem-original-price">
              {finalPrice?.toLocaleString("de-DE")}đ
            </span>
          )}

          {discount > 0 && (
            <span className="brandItem-discount">
              {price?.toLocaleString("de-DE")}đ
            </span>
          )}
        </div>

        {discount === 0 && (
          <span className="brandItem-original-price">
            {price?.toLocaleString()}đ
          </span>
        )}
      </div>
    </div>
  );
};

export default BrandItem;
