import CarouselElement from "../../components/carousel";
import Category from "../../components/category";
import ProductList from "../../components/productItem/ProductList";
import Brand from "../../components/brand";
import Poster from "../../components/poster";
import TopBrand from "../../components/topBrand";
import Trending from "../../components/trending";
import { imgCollection } from "../../constants/urlCollection";
import { imgArrival } from "../../constants/urlArrival";
import { posterUrl } from "../../constants/urlPoster";
import { imgProduct } from "../../constants/urlProduct";
import { imgProductSale } from "../../constants/urlProductSale";
import { imgSport } from "../../constants/urlSport";
import { imgShopSport } from "../../constants/urlShopSport";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <CarouselElement></CarouselElement>
      <div className="px-5">
        <Category></Category>
        <ProductList
          products={imgCollection}
          textHeading="NEW COLLECTIONS"
          showAll="SHOW ALL"
        ></ProductList>
        <Brand
          products={imgArrival}
          textHeading="NEW ARRIVAL"
          showAll="SHOW ALL"
        ></Brand>
        <Poster posterUrl={posterUrl[0].url}></Poster>
        <Brand products={imgProduct}></Brand>
        <Poster posterUrl={posterUrl[1].url}></Poster>
        <Brand products={imgProductSale}></Brand>
        <Poster posterUrl={posterUrl[2].url}></Poster>
        <Brand products={imgSport}></Brand>
        <TopBrand></TopBrand>
        <ProductList
          products={imgShopSport}
          textHeading="SHOP BY SPORTS"
          quatitySlide={6}
        ></ProductList>
        <Trending></Trending>
      </div>
    </div>
  );
};

export default HomePage;
