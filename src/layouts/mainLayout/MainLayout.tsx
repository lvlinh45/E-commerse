import { Outlet } from "react-router-dom";
import HeaderLayout from "../header";
import FooterLayout from "../footer";
import ScrollToTop from "../../components/scrollToTop";

const MainLayout = () => {
  return (
    <>
      <HeaderLayout></HeaderLayout>
      <Outlet></Outlet>
      <ScrollToTop></ScrollToTop>
      <FooterLayout></FooterLayout>
    </>
  );
};

export default MainLayout;
