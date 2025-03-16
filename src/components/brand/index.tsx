import Text from "../Universal/text";
import BrandItem from "./BrandItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { imgProduct } from "../../constants/urlProduct";

const Brand = () => {
  return (
    <>
      <div className="mt-5">
        <Text text="NEW ARRIVAL" classname="mb-3" showAll="SHOW ALL"></Text>
        <div className="mb-5">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            grabCursor={true}
            spaceBetween={48}
            slidesPerView={5}
          >
            {imgProduct.map((item) => (
              <div key={item.id}>
                <div>
                  <SwiperSlide>
                    <BrandItem
                      name={item.name}
                      price={item.price}
                      imageUrl={item.imageUrl}
                      discount={item.discount}
                      numberOfReviews={item.numberOfReviews}
                    ></BrandItem>
                  </SwiperSlide>
                </div>
              </div>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default Brand;
