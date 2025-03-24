import { useState } from "react";
import { imgProduct } from "../../constants/urlProduct";
import BrandItem from "../brand/BrandItem";
import { IconSearch } from "../../assets/icons/Icons";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SeekingProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const productsCount = 1646;
  const [filter, setFilter] = useState("manual");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
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
            <IconSearch></IconSearch>
          </div>
        </div>
        <div className="seeking-filter">
          <p className="seeking-filter-count">{productsCount} Products</p>
          <div className="seeking-filter-control">
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={filter}
                onChange={handleChange}
                label="Age"
              >
                <MenuItem value="manual">Manual</MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="seeking-listProduct">
          {imgProduct.map((item) => (
            <div key={item.id}>
              <BrandItem
                id={item.id}
                name={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                discount={item.discount}
                numberOfReviews={item.numberOfReviews}
                rating={item.rating}
                status={item.status}
                vendor={item.vendor}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SeekingProduct;
