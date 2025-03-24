import CarouselElement from "../../components/carousel";
import Category from "../../components/category";
import ProductList from "../../components/productItem/ProductList";
import Brand from "../../components/brand";
import Poster from "../../components/poster";
import TopBrand from "../../components/topBrand";
import Trending from "../../components/trending";
import { imgCollection } from "../../constants/urlCollection";
import { posterUrl } from "../../constants/urlPoster";
import { imgProduct } from "../../constants/urlProduct";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <CarouselElement></CarouselElement>
      <div className="homepage-wrapper">
        <Category></Category>
        <ProductList
          products={imgCollection.map((item) => ({
            ...item,
            name: "Default Name",
          }))}
          textHeading="NEW COLLECTIONS"
          showAll="SHOW ALL"
        ></ProductList>
        <Brand
          products={imgProduct.slice(0, 10)}
          textHeading="NEW ARRIVAL"
          showAll="SHOW ALL"
        ></Brand>
        <Poster posterUrl={posterUrl[0].url}></Poster>
        <Brand products={imgProduct.slice(11, 20)}></Brand>
        <Poster posterUrl={posterUrl[1].url}></Poster>
        <Brand products={imgProduct.slice(21, 30)}></Brand>
        <Poster posterUrl={posterUrl[2].url}></Poster>
        <Brand products={imgProduct.slice(31, 40)}></Brand>
        <TopBrand></TopBrand>
        <ProductList
          products={imgCollection.map((item) => ({
            ...item,
            name: "Default Name",
          }))}
          textHeading="NEW COLLECTIONS"
          showAll="SHOW ALL"
        ></ProductList>
        <Trending></Trending>
      </div>
    </div>
  );
};

export default HomePage;
