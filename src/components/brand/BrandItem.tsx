import Slider from "react-slick";
import { IconNext, IconPrev } from "../../icons/Icons";
import Text from "../Universal/text";
import BrandItem from "./BrandItem";
import { imgCollection } from "../../constants/collection";

const Brand = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: (
      <div className="slick-prev">
        <IconPrev></IconPrev>
      </div>
    ),
    prevArrow: (
      <div className="slick-next">
        <IconNext></IconNext>
      </div>
    ),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mt-5">
      <Text text="NEW COLLECTIONS" classname="mb-3" showAll="SHOW ALL"></Text>
      <div className="mb-5">
        <Slider {...settings}>
          {imgCollection.map((item) => (
            <div key={item.id} className="slick-slide">
              <div style={{ marginRight: "10px" }}>
                <BrandItem />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Brand;
