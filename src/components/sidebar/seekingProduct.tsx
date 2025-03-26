import { useState, useEffect } from "react";
import { IconSearch } from "../../assets/icons/Icons";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Filters } from "../../assets/types/Filters";
import { Product } from "../../assets/types/Products";
import BrandItem from "../brand/BrandItem";

const getPriceRange = (priceLabel: string) => {
  if (priceLabel === "UNDER 500.000đ") {
    return { min: 0, max: 500000 };
  } else if (priceLabel === "ABOVE 5.000.000đ") {
    return { min: 5000000, max: Infinity };
  } else {
    const [minPrice, maxPrice] = priceLabel.split(" - ").map((price) => {
      return parseInt(price.replace(/[^0-9]/g, ""), 10);
    });
    return { min: minPrice, max: maxPrice };
  }
};

const SeekingProduct: React.FC<{ filters: Filters }> = ({ filters }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("manual");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const filteredProducts = products.filter((item) => {
    const matchesSearchQuery =
      searchQuery.trim() === "" ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase().trim());

    const matchesFilters = Object.keys(filters).every((category) => {
      const filterCategory = category as keyof Filters;

      if (category === "price" && filters[filterCategory].length > 0) {
        const priceRange = getPriceRange(filters[filterCategory][0]);
        return (
          (item.price ?? 0) >= priceRange.min &&
          (item.price ?? 0) <= priceRange.max
        );
      }

      return (
        filters[filterCategory].length === 0 ||
        filters[filterCategory].includes(
          String(item[filterCategory as keyof typeof item] ?? "")
        )
      );
    });

    return matchesSearchQuery && matchesFilters;
  });

  const sortProducts = (products: Product[]) => {
    switch (sortOrder) {
      case "highToLow":
        return products.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
      case "LowToHight":
        return products.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
      case "ascendant":
        return products.sort((a, b) => a.name.localeCompare(b.name));
      case "Descendant":
        return products.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(filteredProducts);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products in this collection"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div>
          <IconSearch />
        </div>
      </div>
      <div className="seeking-filter">
        <p className="seeking-filter-count">{sortedProducts.length} Products</p>
        <div className="seeking-filter-control">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={sortOrder}
              onChange={handleChange}
            >
              <MenuItem value="manual">Manual</MenuItem>
              <MenuItem value="highToLow">Price (high to low)</MenuItem>
              <MenuItem value="LowToHight">Price (low to high)</MenuItem>
              <MenuItem value="ascendant">Title ascending</MenuItem>
              <MenuItem value="Descendant">Title descending</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="seeking-listProduct">
        {sortedProducts.map((item) => (
          <BrandItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default SeekingProduct;
