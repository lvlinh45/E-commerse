import { ILocation } from "../../assets/types/Location";

export const loadProvinces = (inputValue: string) =>
  new Promise<ILocation[]>((resolve) => {
    fetch("https://provinces.open-api.vn/api/p/")
      .then((response) => response.json())
      .then((data) => {
        const provinces: ILocation[] = data.map(
          (province: { code: string; name: string }) => ({
            value: parseInt(province.code), // Ensure value is a number
            label: province.name,
          })
        );
        resolve(
          provinces.filter((province) =>
            province.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      })
      .catch((error) => console.error("Error fetching provinces:", error));
  });

export const loadDistricts = (provinceCode: string) => (inputValue: string) =>
  new Promise<ILocation[]>((resolve) => {
    if (!provinceCode) return;
    fetch(`https://provinces.open-api.vn/api/p/${provinceCode}/?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        const districts: ILocation[] = data.districts.map(
          (district: { code: string; name: string }) => ({
            value: parseInt(district.code), // Ensure value is a number
            label: district.name,
          })
        );
        resolve(
          districts.filter((district) =>
            district.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      })
      .catch((error) => console.error("Error fetching districts:", error));
  });

export const loadWards = (districtCode: string) => (inputValue: string) =>
  new Promise<ILocation[]>((resolve) => {
    if (!districtCode) return;
    fetch(`https://provinces.open-api.vn/api/d/${districtCode}/?depth=2`)
      .then((response) => response.json())
      .then((data) => {
        const wards: ILocation[] = data.wards.map(
          (ward: { code: string; name: string }) => ({
            value: parseInt(ward.code), // Ensure value is a number
            label: ward.name,
          })
        );
        resolve(
          wards.filter((ward) =>
            ward.label.toLowerCase().includes(inputValue.toLowerCase())
          )
        );
      })
      .catch((error) => console.error("Error fetching wards:", error));
  });
