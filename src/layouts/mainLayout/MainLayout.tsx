import { Outlet } from "react-router-dom";
import HeaderLayout from "../header";
import FooterLayout from "../footer";
import ScrollToTop from "../../components/scrollToTop";
import ProgressBar from "../../components/progressBar/ProgressBar";

const MainLayout = () => {
  return (
    <>
      <ProgressBar></ProgressBar>
      <HeaderLayout></HeaderLayout>
      <Outlet></Outlet>
      <ScrollToTop></ScrollToTop>
      <FooterLayout></FooterLayout>
    </>
  );
};

export default MainLayout;
