import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Define types for the state
type FilterCategory = "gender" | "brand" | "price";

type Filters = {
  gender: string[];
  brand: string[];
  price: string[];
};

const SidebarSeeking: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    gender: [],
    brand: [],
    price: [],
  });

  const [searchQueries, setSearchQueries] = useState({
    gender: "",
    brand: "",
    price: "",
  });

  const filterData = [
    {
      category: "gender" as FilterCategory,
      options: ["MEN", "WOMEN", "BOYS", "GIRLS"],
    },
    {
      category: "brand" as FilterCategory,
      options: [
        "SKECHERS",
        "SOFSOLE",
        "SPEEDO",
        "TEVA",
        "TRIGGERPOINT",
        "UNDER ARMOUR",
        "WABOBA",
      ],
    },
    {
      category: "price" as FilterCategory,
      options: [
        "UNDER 500.000đ",
        "500.000đ - 1.000.000đ",
        "1.000.000đ - 2.000.000đ",
        "2.000.000đ - 3.000.000đ",
        "3.000.000đ - 4.000.000đ",
        "4.000.000đ - 5.000.000đ",
        "ABOVE 5.000.000đ",
      ],
    },
  ];

  const handleFilterChange = (category: FilterCategory, option: string) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[category].includes(option)
        ? prev[category].filter((item) => item !== option)
        : [...prev[category], option];
      return {
        ...prev,
        [category]: updatedCategory,
      };
    });
  };

  const handleSearchChange = (
    category: FilterCategory,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQueries((prev) => ({
      ...prev,
      [category]: (e.target as HTMLInputElement).value,
    }));
  };

  const filterOptions = (category: FilterCategory, options: string[]) => {
    const searchQuery = searchQueries[category].toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery)
    );
  };

  const clearFilter = (category: FilterCategory) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: [],
    }));
    setSearchQueries((prev) => ({
      ...prev,
      [category]: "",
    }));
  };

  const isFilterSelected = (category: FilterCategory) =>
    selectedFilters[category].length > 0;

  return (
    <div className="sidebar-seeking">
      {filterData.map(({ category, options }) => (
        <Accordion
          defaultExpanded
          className="sidebarSeeking-main"
          key={category}
        >
          <AccordionSummary
            className="sidebarSeeking-wrapper"
            expandIcon={<ExpandMoreIcon />}
          >
            <div className="sidebarSeeking-text">
              <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
              {isFilterSelected(category) && (
                <p onClick={() => clearFilter(category)}>CLEAR</p>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {category === "brand" || category === "price" ? (
              <TextField
                variant="outlined"
                placeholder="Search options"
                className="sidebarSeeking-input"
                fullWidth
                value={searchQueries[category]}
                onChange={(e) => handleSearchChange(category, e)}
                margin="normal"
              />
            ) : null}

            {filterOptions(category, options).map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={selectedFilters[category].includes(option)}
                    onChange={() => handleFilterChange(category, option)}
                    name={option}
                  />
                }
                label={`${option}`}
              />
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default SidebarSeeking;
