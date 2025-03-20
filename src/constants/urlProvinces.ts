import { useState } from "react";

export const useProvince = () => {
  const [ProvinceName, SetProvinceName] = useState([]);
  // Fetch data from the API
  fetch("https://provinces.open-api.vn/api/p/")
    .then((response) => response.json())
    .then((data) => {
      // Assuming the data is an array of provinces, get the names
      const names = data.map((item: { name: string }) => item.name);

      SetProvinceName(names);
    })
    .catch((error) => console.error("Error:", error));

  return ProvinceName;
};
