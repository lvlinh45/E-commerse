import { IDiscountCode } from "../assets/types/Discount";

export const discountCodes: IDiscountCode[] = [
  {
    code: "SALE10",
    discountAmount: 50000,
    description: "Giảm 50,000đ cho đơn hàng từ 500,000đ trở lên",
    minOrder: 500000,
    expiry: "2025-12-31",
  },
  {
    code: "SALE15",
    discountAmount: 75000,
    description: "Giảm 75,000đ cho đơn hàng từ 1,000,000đ trở lên",
    minOrder: 1000000,
    expiry: "2025-11-30",
  },
  {
    code: "SAVE20",
    discountAmount: 100000,
    description: "Giảm 100,000đ cho đơn hàng từ 2,000,000đ trở lên",
    minOrder: 2000000,
    expiry: "2025-10-31",
  },
  {
    code: "OFF5",
    discountAmount: 25000,
    description: "Giảm 25,000đ cho mọi đơn hàng",
    minOrder: 0,
    expiry: "2025-12-31",
  },
  {
    code: "VIP30",
    discountAmount: 150000,
    description: "Giảm 150,000đ cho khách hàng VIP",
    minOrder: 0,
    expiry: "2025-09-30",
  },
  {
    code: "FRIEND",
    discountAmount: 1_000_000,
    description: "Giảm 1,000,000đ cho khách hàng Friend",
    minOrder: 0,
    expiry: "2025-09-30",
  },
];
