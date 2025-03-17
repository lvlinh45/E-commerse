import Text from "../Universal/text";
import BrandItem from "./BrandItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { imgProduct } from "../../constants/urlProduct";

const Brand = () => {
  return (
    <>
      <div className="mt-5">
        <Text text="NEW ARRIVAL" classname="mb-3" showAll="SHOW ALL"></Text>
        <Swiper
          // loop={true}
          navigation={true}
          grabCursor={true}
          spaceBetween={60}
          slidesPerGroup={5}
          modules={[Navigation, Autoplay]}
          className="swiper-brand"
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          <div className="testa">
            {imgProduct.map((item) => (
              <div key={item.id}>
                <SwiperSlide>
                  <BrandItem
                    name={item.name}
                    price={item.price}
                    imageUrl={item.imageUrl}
                    discount={item.discount}
                    numberOfReviews={item.numberOfReviews}
                    rating={item.rating}
                    status={item.status}
                  ></BrandItem>
                </SwiperSlide>
              </div>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
};

export default Brand;
