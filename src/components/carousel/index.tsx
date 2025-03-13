import Carousel from "react-bootstrap/Carousel";
import { imgUrl } from "../../constants/urlBanner";

const CarouselElement = () => {
  return (
    <div className="carousel-container">
      <Carousel interval={1000}>
        {imgUrl.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              width="100%"
              height="500px"
              src={item.url}
              alt="img-banner"
              className="carousel-img"
              draggable="true"
            />
            <div className="carousel-overlay"></div>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselElement;
