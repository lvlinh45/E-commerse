import { useState } from "react";
import SeekingProduct from "../../components/sidebar/seekingProduct";
import SidebarSeeking from "../../components/sidebar/sidebarSeeking";
import Breadcrumb from "../../components/Universal/Breadscrumb";
import { Filters } from "../../assets/types/Filters";

const SeekingPage = () => {
  const [filters, setFilters] = useState<Filters>({
    gender: [],
    brand: [],
    price: [],
  });

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Breadcrumb page={"Home"} destination={"Search Page"} />
      <div className="seekingPage-container">
        <SidebarSeeking onFilterChange={handleFilterChange} />
        <SeekingProduct filters={filters} />
      </div>
    </>
  );
};

export default SeekingPage;
