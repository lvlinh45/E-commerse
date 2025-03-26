import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Dropdown } from "react-bootstrap"; // Import Dropdown component
import {
  IconCart,
  IconLocation,
  IconSearch,
  IconAngleDown,
} from "../../assets/icons/Icons";
import { Language } from "../../assets/types/languages";
import DrawerSiderBar from "../../components/drawer";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Product } from "../../assets/types/Products";
import { imgProduct } from "../../constants/urlProduct";

const HeaderLayout = () => {
  const [selectedLang, setSelectedLang] = useState<Language>({
    code: "en",
    flag: "//supersports.com.vn/cdn/shop/t/230/assets/en.png?v=94828056452989466101720174907",
    name: "English",
  });
  const navigate = useNavigate();
  const { cart } = useCart();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);

  const handleLanguageSelect = (code: string, flag: string, name: string) => {
    setSelectedLang({ code, flag, name });
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      const filtered = imgProduct.filter((product) =>
        product.name?.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(imgProduct.slice(0, 8));
    }
  };

  const handleFocus = () => {
    setShowSearchResults(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (
        !event.relatedTarget ||
        !event.relatedTarget.classList.contains("product-item")
      ) {
        setShowSearchResults(false);
      }
    }, 100);
  };

  const handleProductClick = (productId: number) => {
    navigate(`/products/${productId}`);
  };

  const productsToDisplay = searchTerm
    ? filteredProducts
    : imgProduct.slice(0, 8);

  return (
    <>
      <DrawerSiderBar open={drawerOpen} onClose={toggleDrawer(false)} />
      <Navbar expand="lg">
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
          <div
            className="header-search-wrapper"
            style={{ position: "relative" }}
          >
            <div className="header-search">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={handleSearch}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
              <span
                className="header-icon header-icon-search"
                onClick={() => navigate(`/collection/all?q=${searchTerm}`)}
              >
                <IconSearch />
              </span>
            </div>

            {showSearchResults &&
            searchTerm &&
            filteredProducts.length === 0 ? (
              <div className="product-grid-wrapper">
                <p className="text-center" style={{ marginBottom: 0 }}>
                  Not Found Product
                </p>
              </div>
            ) : (
              showSearchResults && (
                <div className="product-grid-wrapper">
                  <h4>PRODUCT</h4>
                  <div className="product-grid">
                    {productsToDisplay.slice(0, 8).map((product) => (
                      <div
                        className="product-item"
                        key={product.id}
                        onClick={() => handleProductClick(product?.id || 0)}
                      >
                        <img src={product.imageUrl} alt={product.name} />
                        <div>
                          <p>{product.name}</p>
                          <p>
                            <span>
                              {new Intl.NumberFormat("en-US", {
                                style: "currency",
                                currency: "VND",
                              }).format(product.price ?? 0)}
                            </span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex header-iconContainer">
              <span
                className="header-icon-cart"
                style={{ cursor: "pointer" }}
                onClick={toggleDrawer(true)}
              >
                <IconCart />
                <p>{cart.length}</p>
              </span>
              <span
                className="header-icon location-icon"
                style={{ cursor: "pointer" }}
              >
                <IconLocation />
              </span>
            </div>
            <Dropdown className="position-relative">
              <Dropdown.Toggle
                variant="link"
                id="language-dropdown"
                className="d-flex align-items-center p-0 outline-none"
              >
                <img
                  alt="iso-code-flag"
                  width="25px"
                  height="25px"
                  className="img-flag-current"
                  src={selectedLang.flag}
                  loading="lazy"
                />
                <span className="angleDown-icon ms-2">
                  <IconAngleDown />
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="dropdown-right position-absolute end-0">
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
