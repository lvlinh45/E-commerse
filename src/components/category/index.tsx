import { useTranslation } from "react-i18next";
import { imgCategory } from "../../constants/urlCategory";
import Text from "../Universal/text";
import CategoryItem from "./CategoryItem";

const Category = () => {
  const { t } = useTranslation("homePage");

  return (
    <div className="text-center">
      <Text
        classname="mb-4 text-center"
        textCenter="justify-content-center"
        text={t("SHOP_BY_CATEGORY")}
      ></Text>
      <div className="category-container">
        {imgCategory.map((item) => (
          <CategoryItem
            key={item.id}
            url={item.url}
            name={item.name}
          ></CategoryItem>
        ))}
      </div>
    </div>
  );
};

export default Category;
