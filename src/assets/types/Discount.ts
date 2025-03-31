export interface IDiscountCode {
  code: string;
  discountAmount: number;
  description: string;
  minOrder: number;
  expiry: string;
}
