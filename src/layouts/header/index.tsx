import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap"; // Import Dropdown component
import {
  IconCart,
  IconLocation,
  IconSearch,
  IconAngleDown,
} from "../../icons/Icons"; // Import your angle-down icon
import { Language } from "../../types/languages";

const HeaderLayout = () => {
  // State to track the selected language and its flag
  const [selectedLang, setSelectedLang] = useState<Language>({
    code: "en",
    flag: "//supersports.com.vn/cdn/shop/t/230/assets/en.png?v=94828056452989466101720174907",
    name: "English",
  });

  const handleLanguageSelect = (code: string, flag: string, name: string) => {
    setSelectedLang({ code, flag, name });
  };

  return (
    <>
      <Navbar expand="lg">
        <Navbar.Brand href="#home">
          <img
            src="files/LOGO_SSP_RGB-02.jpg"
            srcSet="//supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02.jpg?v=1718952262&width=2082 768w, //supersports.com.vn/cdn/shop/files/LOGO_SSP_RGB-02.jpg?v=1718952262&width=2082 500w"
            alt="Logo"
            className="header-logo"
          />
        </Navbar.Brand>

        <Nav>
          <div className="header-search">
            <input type="text" placeholder="Search" />
            <span className="header-icon ">
              <IconSearch />
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="d-flex header-iconContainer">
              <span className="header-icon">
                <IconCart />
              </span>
              <span className="header-icon location-icon">
                <IconLocation />
              </span>
            </div>
            {/* Language Dropdown */}
            <Dropdown className="position-relative">
              <Dropdown.Toggle
                variant="link"
                id="language-dropdown"
                className="p-0 d-flex align-items-center  outline-none"
              >
                <img
                  alt="iso-code-flag"
                  width="25px"
                  height="25px"
                  className="img-flag-current"
                  src={selectedLang.flag}
                  loading="lazy"
                />
                <span className="ms-2 angleDown-icon">
                  <IconAngleDown />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="position-absolute end-0 dropdown-right">
                <Dropdown.Item
                  href="#"
                  className="d-flex align-items-center gap-1"
                  onClick={() =>
                    handleLanguageSelect(
                      "vi",
                      "//supersports.com.vn/cdn/shop/t/230/assets/vi.png?v=78388546421581796491720174908",
                      "Tiếng Việt"
                    )
                  }
                >
                  <img
                    alt="vn-flag"
                    width="40px"
                    height="40px"
                    className="img-flag"
                    src="//supersports.com.vn/cdn/shop/t/230/assets/vi.png?v=78388546421581796491720174908"
                    loading="lazy"
                  />
                  <span>Tiếng Việt</span>
                </Dropdown.Item>

                <Dropdown.Item
                  href="#"
                  className="d-flex align-items-center gap-1"
                  onClick={() =>
                    handleLanguageSelect(
                      "en",
                      "//supersports.com.vn/cdn/shop/t/230/assets/en.png?v=94828056452989466101720174907",
                      "English"
                    )
                  }
                >
                  <img
                    alt="en-flag"
                    width="40px"
                    height="40px"
                    className="img-flag"
                    src="//supersports.com.vn/cdn/shop/t/230/assets/en.png?v=94828056452989466101720174907"
                    loading="lazy"
                  />
                  <span>English</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Nav>
      </Navbar>
    </>
  );
};

export default HeaderLayout;
