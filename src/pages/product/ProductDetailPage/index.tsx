import { IconButton } from "@mui/material";
import EmblaCarousel from "../../../components/EmblaCarousel/EmblaCarousel";
import { IconNotRatingStar, IconStar } from "../../../assets/icons/Icons";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import BreadScrumbs from "../../../components/Universal/Breadscrumb";

const ProductDetailPage = () => {
  const SLIDES = [
    "//cdn.shopify.com/s/files/1/0456/5070/6581/files/Hike_Cool_6.3_1545x500_EN.jpg?v=1741766230&width=2400",
    "https://cdn.shopify.com/s/files/1/0456/5070/6581/files/UNDER_ARMOUR_Spring_Meridian_12.3_EN_1545x500_fe751e95-a184-451a-9dce-5073083cbef0.jpg?v=1741767296&width=1920",
    "https://cdn.shopify.com/s/files/1/0456/5070/6581/files/UA_Unstoppable_Woven_12.3_1545x500_EN.jpg?v=1741767651&width=2400",
    "https://cdn.shopify.com/s/files/1/0456/5070/6581/files/Supernova_7.3_WEB_1545x500_EN.jpg?v=1741341262&width=2400",
    "https://cdn.shopify.com/s/files/1/0456/5070/6581/files/UNDER_ARMOUR_Spring_Meridian_12.3_EN_1545x500_fe751e95-a184-451a-9dce-5073083cbef0.jpg?v=1741767296&width=1920",
  ];

  return (
    <>
      <BreadScrumbs
        page={"Home"}
        subPage={"New Arrivals"}
        destination={"Kids' Speedo Biofuse 2.0 Goggle - Blue"}
      ></BreadScrumbs>
      <div className="product-detail-container">
        <div className="product-wrapper">
          <EmblaCarousel slides={SLIDES}>
            {SLIDES.map((slide, index) => (
              <div key={index} className="relative">
                <img
                  className="object-cover w-full h-full rounded-2xl aspect-square"
                  src={slide}
                  alt={`Slide ${index + 1}`}
                />
              </div>
            ))}
          </EmblaCarousel>
        </div>
        <div className="product-info">
          <h3 className="product-vendor">LFC</h3>
          <h2 className="product-title">
            Men's Lfc Geometric Print T-Shirt - Black
          </h2>
          <h3 className="product-brand">
            <span>T-Shirts</span>
            <span>SKU A15164</span>
          </h3>
          <div className="icon-star product-star">
            {Array.from({ length: 5 }, (_, index) =>
              index < 5 ? (
                <IconStar key={index} />
              ) : (
                <IconNotRatingStar key={index} />
              )
            )}
            <span>(4/5 đánh giá) Xem 2 đánh giá</span>
          </div>
          <div className="product-price">899.000₫</div>
          <div>
            <p className="product-quantity">Size</p>
            <div className="product-size">
              <div>A/XS</div>
              <div className="product-disable">A/S</div>
              <div>A/L</div>
              <div>A/XL</div>
            </div>
          </div>
          <div>
            <p className="product-quantity">Quantity</p>
            <div className="product-actions">
              <div className="product-calculate">
                <IconButton
                // onClick={() => handleQuantityChange(item.id, -1)}
                // disabled={item.quantity <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <span>1</span>
                <IconButton
                // onClick={() => handleQuantityChange(item.id, 1)}
                >
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          </div>
          <div className="product-button">
            <button>Buy it now</button>
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
