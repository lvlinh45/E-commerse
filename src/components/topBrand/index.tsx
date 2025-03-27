import { useTranslation } from "react-i18next";
import { imgTopBrand } from "../../constants/urlCollection";
import Text from "../Universal/text";

const TopBrand = () => {
  const { t } = useTranslation("homePage");
  return (
    <>
      <div className="mt-5 w-100">
        <Text text={t("TOP_BRANDS")} classname="mb-3"></Text>
        <div className="top-brand">
          {imgTopBrand.map((brand) => (
            <img
              className="w-100"
              key={brand.id}
              src={brand.imageUrl}
              alt={`Brand ${brand.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default TopBrand;
