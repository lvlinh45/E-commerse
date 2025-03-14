import Slider from "react-slick"; // Import Slider từ react-slick

import { IconNextLarge, IconPrevLarge } from "../../icons/Icons";
import ProductItem from "./ProductItem";
import Text from "../Universal/text";
import { imgCollection } from "../../constants/collection";

const ProductList = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <div className="slick-prev">
        <IconPrevLarge></IconPrevLarge>
      </div>
    ),
    prevArrow: (
      <div className="slick-next">
        <IconNextLarge></IconNextLarge>
      </div>
    ),
  };

  return (
    <div className="mt-5 ">
      <Text text="NEW COLLECTIONS" classname="mb-3" showAll="SHOW ALL"></Text>
      <div className="carousel-container carousel-main mb-5 ">
        <Slider {...settings}>
          {imgCollection.map((item) => (
            <>
              <ProductItem key={item.id} url={item.url}></ProductItem>
            </>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductList;
