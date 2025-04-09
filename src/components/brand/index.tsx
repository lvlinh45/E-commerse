import Slider from "react-slick";
import Text from "../Universal/text";
import BrandItem from "./BrandItem";
import { ProductListProps } from "../../assets/types/Products";

import { IconNext, IconPrev } from "../../assets/icons/Icons";

const Brand = ({
  products,
  textHeading = "",
  showAll = "",
  textCenter = "",
}: ProductListProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    // autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: (
      <div className="slick-prev slick-prev--brand">
        <IconPrev></IconPrev>
      </div>
    ),
    prevArrow: (
      <div className="slick-next slick-next--brand">
        <IconNext></IconNext>
      </div>
    ),
  };

  return (
    <>
      <div className="mt-5 brand-main">
        <Text
          text={textHeading}
          textCenter={textCenter}
          classname="mb-3"
          showAll={showAll}
        ></Text>
        <Slider {...settings} className="slider-brand">
          {products.map((item) => (
            <div key={item.id}>
              <BrandItem
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                discount={item.discount}
                numberOfReviews={item.numberOfReviews}
                rating={item.rating}
                status={item.status}
                vendor={item.vendor}
              ></BrandItem>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Brand;
