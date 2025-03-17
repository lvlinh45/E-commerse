import { imgCategory } from "../../constants/urlCategory";
import Text from "../Universal/text";
import CategoryItem from "./CategoryItem";

const Category = () => {
  return (
    <div className="text-center">
      <Text
        classname="mb-4 text-center"
        textCenter="justify-content-center"
        text="SHOP BY CATEGORY"
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
