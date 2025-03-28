import { useNavigate } from "react-router-dom";

import "./404Page.scss";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("notFoundPage");

  return (
    <div className="error-container">
      <h1>404 Page Not Found</h1>
      <p>{t("The page you requested does not exist.")}.</p>
      <button onClick={() => navigate("/collection/all")}>
        {t("Continue shopping")}
      </button>
    </div>
  );
};

export default NotFoundPage;
