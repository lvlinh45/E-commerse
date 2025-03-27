import { useNavigate } from "react-router-dom";

import "./404Page.scss";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h1 className="error-code">404 Page Not Found</h1>
      <p className="error-message">Trang bạn yêu cầu không tồn tại.</p>
      <button
        className="continue-shopping-button"
        onClick={() => navigate("/collection/all")}
      >
        TIẾP TỤC MUA SẮM
      </button>
    </div>
  );
};

export default NotFound;
