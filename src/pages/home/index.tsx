import CarouselElement from "../../components/carousel";
import Category from "../../components/category";
import ProductList from "../../components/productItem/ProductList";
import Brand from "../../components/brand";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <CarouselElement></CarouselElement>
      <div className="px-5">
        <Category></Category>
        <ProductList></ProductList>
        <Brand></Brand>
      </div>
    </div>
  );
};

export default HomePage;
