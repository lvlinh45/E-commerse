import { Container } from "react-bootstrap";
import CarouselElement from "../../components/carousel";
import Category from "../../components/category";
import ProductList from "../../components/productItem/ProductList";

const HomePage = () => {
  return (
    <div className="overflow-hidden">
      <CarouselElement></CarouselElement>

      <Container>
        <Category></Category>
        <ProductList></ProductList>
      </Container>
    </div>
  );
};

export default HomePage;
