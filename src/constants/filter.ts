export type FilterCategory = "gender" | "brand" | "price";
export const filterData = [
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
