import { Container } from "react-bootstrap";

const FooterLayout = () => {
  return (
    <div className="footer-container mt-5">
      <Container>
        <div className="footer-section">
          <div className="footer-column">
            <h5>Location</h5>
            <p>
              <span>Address 1: </span>VietNam
            </p>
            <p>
              <span>Address 2: </span>USA
            </p>
          </div>
          <div className="footer-column">
            <h5>About Supersports</h5>
            <ul>
              <li>About Us</li>
              <li>Store Locations</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div className="footer-column">
            <h5>Support</h5>
            <ul>
              <li>Delivery Policy</li>
              <li>Returns & Exchanges</li>
              <li>Installment Policy</li>
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
