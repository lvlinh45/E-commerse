import { Outlet } from "react-router-dom";
import HeaderLayout from "../header";
import FooterLayout from "../footer";

const MainLayout = () => {
  return (
    <>
      <HeaderLayout></HeaderLayout>
      <Outlet></Outlet>
      <FooterLayout></FooterLayout>
    </>
  );
};

export default MainLayout;
