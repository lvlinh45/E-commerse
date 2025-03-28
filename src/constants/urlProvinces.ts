import { useState } from "react";

export const useProvince = () => {
  const [ProvinceName, SetProvinceName] = useState([]);
  fetch("https://provinces.open-api.vn/api/p/")
    .then((response) => response.json())
    .then((data) => {
      const names = data.map((item: { name: string }) => item.name);

      SetProvinceName(names);
    })
    .catch((error) => console.error("Error:", error));

  return ProvinceName;
};
