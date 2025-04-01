import { useTranslation } from "react-i18next";
import { imgTopBrand } from "../../constants/urlCollection";
import Text from "../Universal/text";
import { useNavigate } from "react-router-dom";

const TopBrand = () => {
  const { t } = useTranslation("homePage");
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-5 w-100">
        <Text text={t("TOP_BRANDS")} classname="mb-3"></Text>
        <div className="top-brand">
          {imgTopBrand.map((brand) => (
            <div key={brand.id} onClick={() => navigate("/collection/all")}>
              <img
                className="w-100"
                key={brand.id}
                src={brand.imageUrl}
                alt={`Brand ${brand.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TopBrand;
