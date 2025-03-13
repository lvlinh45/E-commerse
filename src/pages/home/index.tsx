import { Container } from "react-bootstrap";
import CarouselElement from "../../components/carousel";
import Category from "../../components/category";

const HomePage = () => {
  return (
    <>
      <CarouselElement></CarouselElement>
      <Container>
        <Category></Category>
      </Container>
    </>
  );
};

export default HomePage;
