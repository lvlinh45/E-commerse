import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IconCart } from "../../assets/icons/Icons";
import { Outlet, useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/scrollToTop";

const HeaderCheckout = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar-checkout">
        <Navbar expand="lg" style={{ padding: "12px 100px !important" }}>
          <Navbar.Brand
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <img
              src="files/LOGO_SSP_RGB-02.jpg"
              srcSet="//supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02.jpg?v=1718952262&width=2082 768w, //supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02.jpg?v=1718952262&width=2082 500w"
              alt="Logo"
              className="header-logo"
            />
          </Navbar.Brand>

          <Nav>
            <div className="d-flex align-items-center gap-3">
              <div className="d-flex header-iconContainer">
                <span
                  className="header-icon-cart"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/cart")}
                >
                  <IconCart />
                </span>
              </div>
            </div>
          </Nav>
        </Navbar>
      </div>
      <Outlet></Outlet>
      <ScrollToTop></ScrollToTop>
    </>
  );
};

export default HeaderCheckout;
