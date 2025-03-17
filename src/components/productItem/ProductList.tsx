import ProductItem from "./ProductItem";
import Text from "../Universal/text";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ProductListProps } from "../../types/Products";

const ProductList = ({
  products,
  textHeading = "",
  quatitySlide = 4,
  showAll = "",
}: ProductListProps) => {
  return (
    <div className="mt-5 slick-product">
      <Text text={textHeading} classname="mb-3" showAll={showAll}></Text>
      <div className="productList-container">
        <Swiper
          navigation={true}
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={4}
          modules={[Navigation, Autoplay]}
          centerInsufficientSlides={true}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: quatitySlide,
              spaceBetween: 20,
            },
          }}
        >
          {products.map((item) => (
            <div key={item.id}>
              <div>
                <SwiperSlide>
                  <ProductItem key={item.id} url={item.imageUrl}></ProductItem>
                </SwiperSlide>
              </div>
            </div>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
