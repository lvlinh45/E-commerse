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
import { FilterCategory, filterData } from "../../constants/filter";
import { Filters } from "../../assets/types/Filters";
import { useTranslation } from "react-i18next";

const SidebarSeeking: React.FC<{
  onFilterChange: (filters: Filters) => void;
}> = ({ onFilterChange }) => {
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

  const handleFilterChange = (category: FilterCategory, option: string) => {
    setSelectedFilters((prev) => {
      const updatedCategory = prev[category].includes(option)
        ? prev[category].filter((item) => item !== option)
        : [...prev[category], option];
      const newFilters = { ...prev, [category]: updatedCategory };
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const handleSearchChange = (
    category: FilterCategory,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const query = e.target.value;
    setSearchQueries((prev) => {
      const updatedQueries = { ...prev, [category]: query };
      onFilterChange({
        ...selectedFilters,
        [category]: query ? [query] : [],
      });
      return updatedQueries;
    });
  };

  const filterOptions = (category: FilterCategory, options: string[]) => {
    const searchQuery = searchQueries[category].toLowerCase();
    return options.filter((option) =>
      option.toLowerCase().includes(searchQuery)
    );
  };

  const clearFilter = (category: FilterCategory) => {
    setSelectedFilters((prev) => {
      const newFilters = { ...prev, [category]: [] };
      onFilterChange(newFilters);
      return newFilters;
    });
    setSearchQueries((prev) => ({ ...prev, [category]: "" }));
  };

  const isFilterSelected = (category: FilterCategory) =>
    selectedFilters[category].length > 0;

  const { t } = useTranslation("seekingPage");

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
                <p
                  onClick={(e) => {
                    e.stopPropagation();
                    clearFilter(category);
                  }}
                >
                  {t("CLEAR")}
                </p>
              )}
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {category === "brand" || category === "price" ? (
              <TextField
                variant="outlined"
                placeholder={t("Search options")}
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
