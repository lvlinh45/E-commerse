import React from "react";
import Slider from "react-slick";
import ProductItem from "./ProductItem";
import Text from "../Universal/text";
import { ProductListProps } from "../../assets/types/Products";

// Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconNext, IconPrev } from "../../assets/icons/Icons";

const ProductList = ({
  products,
  textHeading = "",
  quatitySlide = 4,
  showAll = "",
}: ProductListProps) => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: quatitySlide,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: quatitySlide,
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
      <div className="slick-prev">
        <IconPrev size="42px"></IconPrev>
      </div>
    ),
    prevArrow: (
      <div className="slick-next">
        <IconNext size="42px"></IconNext>
      </div>
    ),
  };

  return (
    <div className="mt-5 carousel-container">
      <Text text={textHeading} classname="mb-3" showAll={showAll}></Text>
      <div className="productList-container productList-container--collection ">
        <Slider {...settings} className="slider-product">
          {products.map((item) => (
            <div key={item.id}>
              <ProductItem
                key={item.id}
                url={
                  Array.isArray(item.imageUrl)
                    ? item.imageUrl.join(", ")
                    : item.imageUrl
                }
              ></ProductItem>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
