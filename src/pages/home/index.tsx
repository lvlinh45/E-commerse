import CarouselElement from "../../components/carousel";
import Category from "../../components/category";
import ProductList from "../../components/productItem/ProductList";
import Brand from "../../components/brand";
import Poster from "../../components/poster";
import TopBrand from "../../components/topBrand";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <CarouselElement></CarouselElement>
      <div className="px-5">
        <Category></Category>
        <ProductList></ProductList>
        <Brand></Brand>
        <Poster></Poster>
        <Brand></Brand>
        <Poster></Poster>
        <TopBrand></TopBrand>
      </div>
    </div>
  );
};

export default HomePage;
