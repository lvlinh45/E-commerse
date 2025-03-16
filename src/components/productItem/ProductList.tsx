import ProductItem from "./ProductItem";
import Text from "../Universal/text";
import { imgCollection } from "../../constants/collection";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

const ProductList = () => {
  return (
    <div className="mt-5 slick-product">
      <Text text="NEW COLLECTIONS" classname="mb-3" showAll="SHOW ALL"></Text>
      <div className="productList-container overflow-hidden">
        <Swiper
          navigation={true}
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={4}
          modules={[Navigation, Autoplay]}
        >
          {imgCollection.map((item) => (
            <div key={item.id}>
              <div>
                <SwiperSlide>
                  <ProductItem key={item.id} url={item.url}></ProductItem>
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
