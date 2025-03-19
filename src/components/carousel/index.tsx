import { imgUrl } from "../../constants/urlBanner";
import Slider from "react-slick";
import { IconNext, IconPrev } from "../../assets/icons/Icons";

const CarouselElement = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
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
  };
  return (
    <div className="carousel-container carousel-main mb-5 ">
      <Slider {...settings}>
        {imgUrl.map((item) => (
          <>
            <img
              height="500px"
              src={item.url}
              alt="img-banner"
              className="carousel-img"
            />
            <div className="carousel-overlay"></div>
          </>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselElement;
