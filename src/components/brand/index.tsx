import Text from "../Universal/text";
import BrandItem from "./BrandItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ProductListProps } from "../../types/Products";

const Brand = ({
  products,
  textHeading = "",
  showAll = "",
}: ProductListProps) => {
  return (
    <>
      <div className="mt-5">
        <Text text={textHeading} classname="mb-3" showAll={showAll}></Text>
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
            {products.map((item) => (
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
                    vendor={item.vendor}
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
