import { Container } from "react-bootstrap";

const FooterLayout = () => {
  return (
    <div className="footer-container mt-5">
      <Container>
        <div className="footer-section">
          <div className="footer-column">
            <h5>GENERAL TRADING FASHIONS ONE MEMBER COMPANY LIMITED</h5>
            <p>
              <span>Office:</span> 163 Phan Dang Luu, Ward 1, Phu Nhuan
              District, Ho Chi Minh City, Viet Nam
            </p>
            <p>
              <span>E-commerce Warehouse:</span> TBS Logistics Tan Van, Binh
              Duong Province, Viet Nam
            </p>
            <p>
              <span>Hotline:</span> 1900 63 64 01
            </p>
            <p>
              <span>Business Code:</span> 0314635071, register changes on April
              20, 2020
            </p>
          </div>
          <div className="footer-column">
            <h5>About Supersports</h5>
            <ul>
              <li>About Us</li>
              <li>Store Locations</li>
              <li>Contact Us</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Support</h5>
            <ul>
              <li>Delivery Policy</li>
              <li>Returns & Exchanges</li>
              <li>Installment Policy</li>
              <li>Privacy Policy</li>
              <li>Help & FAQs</li>
              <li>How to Place an Order</li>
              <li>Size Guide</li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Group Business</h5>
            <ul>
              <li>Nguyen Kim</li>
              <li>Big C</li>
            </ul>
          </div>
          <div className="footer-column payment-methods">
            <h5>PAYMENT METHODS</h5>
            <div className="payment-icons">
              <img
                src="https://cdn.shopify.com/s/files/1/0456/5070/6581/files/ICON_PAYMENT_EN_13ad9f7a-8fce-4388-ae99-4f8da95ad0e0.png?v=1713840527"
                alt="bank"
              />
              <img
                src="https://cdn.shopify.com/s/files/1/0670/3484/1376/files/image_41_487e5803-f4d0-489f-ac14-7b301b6cbb92.png?v=1683197427"
                alt="BCT"
              />
              <img
                src="https://images.dmca.com/Badges/DMCA_logo-grn-btn100w.png?ID=82a9b6db-8bb5-4f59-b809-e909e4e33dda"
                alt="img-protected"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterLayout;
