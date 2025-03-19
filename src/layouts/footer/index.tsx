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
          <div className="footer-column">
            <h5>PAYMENT METHODS</h5>
            <ul>
              <li>MoMo</li>
              <li>Zalo Pay</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterLayout;
